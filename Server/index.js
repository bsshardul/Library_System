import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());

let latestRfid = "";
let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Mysql@2025",
      database: "library_system",
    });
    console.log("✅ Connected to MySQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
})();

// 🟢 Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM staff WHERE username = ? AND password = ?',
      [username, password]
    );
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🟢 Add Patron
app.post('/add-patron', async (req, res) => {
  const {
    firstName, middleName, lastName, dob,
    pronouns, address, contact, category, rfid
  } = req.body;

  // Replace undefined with null
  const sanitizedData = {
    firstName: firstName ?? null,
    middleName: middleName ?? null,
    lastName: lastName ?? null,
    dob: dob ?? null,
    pronouns: pronouns ?? null,
    address: address ?? null,
    contact: contact ?? null,
    category: category ?? null,
    rfid: rfid ?? null,
  };

  try {
    await db.execute(
      `INSERT INTO patron (first_name, middle_name, last_name, dob, pronouns, address, contact_info, category, rfid_tag)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedData.firstName,
        sanitizedData.middleName,
        sanitizedData.lastName,
        sanitizedData.dob,
        sanitizedData.pronouns,
        sanitizedData.address,
        sanitizedData.contact,
        sanitizedData.category,
        sanitizedData.rfid,
      ]
    );
    res.json({ success: true, message: 'Patron added successfully!' });
  } catch (err) {
    console.error('Insert Patron Error:', err);
    res.status(500).json({ success: false, message: 'Error adding patron' });
  }
});

// 🟢 Patron History
app.get('/patron-history/:rfid', async (req, res) => {
  const { rfid } = req.params;
  try {
    const [patron] = await db.execute(
      'SELECT * FROM patron WHERE rfid_tag = ?',
      [rfid]
    );

    if (patron.length === 0) {
      return res.status(404).json({ message: "No patron found with this RFID" });
    }

    const patronId = patron[0].id;
    const [history] = await db.execute(
      `SELECT b.title, ir.issue_date, ir.return_date, ir.returned
       FROM issuerecord ir
       JOIN book b ON ir.book_id = b.id
       WHERE ir.patron_id = ?`,
      [patronId]
    );

    res.json({ patron: patron[0], history });
  } catch (err) {
    console.error('Fetch History Error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 ESP32 posts RFID
app.post("/api/rfid", (req, res) => {
  latestRfid = req.body.rfid;
  console.log("Received RFID:", latestRfid);
  res.json({ success: true });
});

// 🟢 React frontend polls RFID
app.get("/api/rfid", (req, res) => {
  res.json({ rfid: latestRfid });
});

app.get("/api/patron-info/:rfid", async (req, res) => {
  const { rfid } = req.params;
  try {
    const [patron] = await db.execute(
      "SELECT * FROM patron WHERE rfid_tag = ?",
      [rfid]
    );

    if (patron.length === 0) {
      return res.status(404).json({ message: "No patron found with this RFID" });
    }

    const patronId = patron[0].id;

    const [history] = await db.execute(
      `SELECT b.title, ir.issue_date, ir.return_date, ir.returned
       FROM issuerecord ir
       JOIN book b ON ir.book_id = b.id
       WHERE ir.patron_id = ?`,
      [patronId]
    );

    res.json({ patron: patron[0], history });
  } catch (err) {
    console.error("Fetch Patron Info Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Endpoint to handle book issue
app.post('/api/issue-book', async (req, res) => {
  const { rfid, bookId } = req.body;

  console.log("📦 Received book issue request with data:", req.body);

  try {
    // 1. Validate input
    if (!rfid || !bookId) {
      console.log("⚠️ Missing rfid or bookId");
      return res.status(400).json({ message: "Missing RFID or Book ID" });
    }

    // 2. Get Patron
    const [patronRows] = await db.execute(
      'SELECT * FROM Patron WHERE rfid_tag = ?',
      [rfid]
    );

    if (patronRows.length === 0) {
      console.log("❌ Patron not found for RFID:", rfid);
      return res.status(404).json({ message: 'Patron not found' });
    }

    const patron = patronRows[0];

    // 3. Get Book
    const [bookRows] = await db.execute(
      'SELECT * FROM Book WHERE id = ? AND available_copies > 0',
      [bookId]
    );

    if (bookRows.length === 0) {
      console.log("❌ Book not available for ID:", bookId);
      return res.status(404).json({ message: 'Book not available' });
    }

    const book = bookRows[0];

    // 4. Check existing issue
    const [existingIssue] = await db.execute(
      `SELECT * FROM IssueRecord
       WHERE patron_id = ? AND book_id = ? AND returned = false`,
      [patron.id, book.id]
    );

    if (existingIssue.length > 0) {
      console.log("⚠️ Book already issued and not returned");
      return res.status(400).json({ message: 'Book already issued and not yet returned' });
    }

    // 5. Insert issue record
    const issueDate = new Date().toISOString().split('T')[0];

    await db.execute(
      `INSERT INTO IssueRecord (patron_id, book_id, issue_date, return_date, returned)
       VALUES (?, ?, ?, ?, ?)`,

      [patron.id, book.id, issueDate, null, false]
    );

    // 6. Update available copies
    await db.execute(
      `UPDATE Book SET available_copies = available_copies - 1 WHERE id = ?`,
      [book.id]
    );

    console.log("✅ Book issued successfully!");
    res.status(200).json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error("❌ Issue Book Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🟢 Get Available Books
app.get("/api/available-books", async (req, res) => {
  try {
    const [books] = await db.query("SELECT id, title FROM book WHERE available_copies > 0");
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


// app.post('/return', async (req, res) => {
//   const { bookTitle } = req.body;

//   try {
//     // Find book by title
//     const [results] = await db.execute('SELECT * FROM books WHERE title = ?', [bookTitle]);
//     const book = results[0];

//     if (book && book.status === 1) {
//       const returnDate = new Date().toISOString().split('T')[0];

//       // Update book status to returned
//       await db.execute(
//         'UPDATE books SET return_date = ?, status = 0 WHERE id = ?',
//         [returnDate, book.id]
//       );

//       res.status(200).send('Book returned successfully');
//     } else {
//       res.status(400).send('Book not found or already returned');
//     }
//   } catch (err) {
//     console.error('Error during return:', err);
//     res.status(500).send('Server error');
//   }
// });

// // 🟢 Book Checkout API
// app.post('/checkout', async (req, res) => {
//   const { patronName, patronEmail, bookTitle } = req.body;

//   try {
//     // Find book by title
//     const [results] = await db.execute('SELECT * FROM books WHERE title = ?', [bookTitle]);
//     const book = results[0];

//     if (book && book.status === 0) {
//       const checkoutDate = new Date().toISOString().split('T')[0];

//       // Update book status to checked out
//       await db.execute(
//         'UPDATE books SET checkout_date = ?, status = 1 WHERE id = ?',
//         [checkoutDate, book.id]
//       );

//       res.status(200).send('Checkout successful');
//     } else {
//       res.status(400).send('Book is already checked out or not found');
//     }
//   } catch (err) {
//     console.error('Error during checkout:', err);
//     res.status(500).send('Server error');
//   }
// });

app.post('/return-book', async (req, res) => {
  
  console.log('Request received:', req.body); // Debugging
  const { identifier } = req.body; // Identifier can be Book ID or ISBN
  try {
    // Step 1: Find the book by either ID or ISBN
    const findBookQuery = isNaN(identifier)
      ? 'SELECT id FROM Book WHERE isbn = ?'
      : 'SELECT id FROM Book WHERE id = ?';

    const [bookRows] = await db.query(findBookQuery, [identifier]);

    if (bookRows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const bookId = bookRows[0].id;

    // Step 2: Find the latest unreturned issue record for this book
    const [issueRows] = await db.query(
      'SELECT * FROM IssueRecord WHERE book_id = ? AND returned = FALSE ORDER BY issue_date DESC LIMIT 1',
      [bookId]
    );

    if (issueRows.length === 0) {
      return res.status(404).json({ error: 'No unreturned issue record found for this book' });
    }

    const issueId = issueRows[0].id;

    // Step 3: Update the issue record as returned
    await db.query(
      'UPDATE IssueRecord SET returned = TRUE, return_date = CURDATE() WHERE id = ?',
      [issueId]
    );

    // Step 4: Update the available copies of the book
    await db.query(
      'UPDATE Book SET available_copies = available_copies + 1 WHERE id = ?',
      [bookId]
    );

    // Step 5: Respond with success
    res.json({ success: true, message: 'Book successfully returned and updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to return book' });
  }
});

// app.get('/fetch-issue-records', async (req, res) => {
//   try {
//     const [issueRows] = await db.query(
//       `SELECT IssueRecord.id, Book.title, Patron.first_name, Patron.last_name, IssueRecord.issue_date, IssueRecord.return_date, IssueRecord.returned
//        FROM IssueRecord
//        JOIN Book ON IssueRecord.book_id = Book.id
//        JOIN Patron ON IssueRecord.patron_id = Patron.id
//        ORDER BY IssueRecord.issue_date DESC`
//     );

//     if (issueRows.length === 0) {
//       return res.status(404).json({ error: 'No issue records found' });
//     }

//     res.json({ success: true, records: issueRows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch issue records' });
//   }
// });
app.get('/fetch-issue-records', async (req, res) => {
  const { patron, patron_id } = req.query;

  let sql = `
    SELECT IssueRecord.id, Book.title, Patron.first_name, Patron.last_name,
           IssueRecord.issue_date, IssueRecord.return_date, IssueRecord.returned
    FROM IssueRecord
    JOIN Book ON IssueRecord.book_id = Book.id
    JOIN Patron ON IssueRecord.patron_id = Patron.id
  `;

  const params = [];

  if (patron_id) {
    sql += ` WHERE Patron.id = ?`;
    params.push(patron_id);
  } else if (patron) {
    sql += ` WHERE CONCAT(Patron.first_name, ' ', Patron.last_name) LIKE ?`;
    params.push(`%${patron}%`);
  }

  sql += ` ORDER BY IssueRecord.issue_date DESC`;

  try {
    const [rows] = await db.query(sql, params);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No matching issue records found' });
    }

    res.json({ success: true, records: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch issue records' });
  }
});

app.post("/api/books/add", (req, res) => {
  const { id, title, isbn, category_id, author_id, total_copies, available_copies } = req.body;

  // Validate and sanitize inputs (ensure category_id and author_id are valid integers)
  const sanitizedCategoryId = category_id === '' ? null : parseInt(category_id);
  const sanitizedAuthorId = author_id === '' ? null : parseInt(author_id);

  // Ensure total_copies and available_copies are valid integers
  const sanitizedTotalCopies = parseInt(total_copies);
  const sanitizedAvailableCopies = parseInt(available_copies);

  const query = `
    INSERT INTO book (id, title, isbn, category_id, author_id, total_copies, available_copies)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    id,
    title,
    isbn,
    sanitizedCategoryId,
    sanitizedAuthorId,
    sanitizedTotalCopies,
    sanitizedAvailableCopies
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Error inserting book" });
    }

    res.status(201).json({ message: "Book added successfully" });
  });
});


// 404 Route Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
