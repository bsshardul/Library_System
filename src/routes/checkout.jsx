import React, { useState } from "react";
import { Card } from "../components/card"; // Relative path
import { Input } from "../components/input.jsx";
import { Button } from "../components/button.jsx";

const CheckoutPage = () => {
  const [patronName, setPatronName] = useState("");
  const [patronEmail, setPatronEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    { id: 3, title: "Book 3" },
  ]);
  const [checkoutStatus, setCheckoutStatus] = useState("");
  const [history, setHistory] = useState([]);

  const handleCheckout = () => {
    if (!patronName || !patronEmail || !selectedBook) {
      setCheckoutStatus("Please fill in all fields and select a book.");
      return;
    }

    // Update the history with the latest checkout
    const newHistory = [
      ...history,
      {
        patronName,
        patronEmail,
        bookTitle: selectedBook,
        checkoutDate: new Date().toLocaleDateString(),
      },
    ];

    setHistory(newHistory);
    setCheckoutStatus(`Checkout successful for ${patronName}!`);

    // Clear the form after checkout
    setPatronName("");
    setPatronEmail("");
    setSelectedBook("");
  };

  // Inline styles with text color adjustments
  const styles = {
    checkoutContainer: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      color: "#333", // Set text color for all text
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333", // Heading text color
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#333", // Label text color
    },
    input: {
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      color: "#333", // Input text color
    },
    select: {
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      color: "#333", // Select text color
    },
    checkoutStatus: {
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "bold",
      color: "#d9534f", // Error text color (red)
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    table: {
      width: "100%",
      marginTop: "30px",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    tableRow: {
      borderBottom: "1px solid #ccc",
    },
    tableCell: {
      padding: "8px",
      textAlign: "left",
    },
  };

  return (
    <div style={styles.checkoutContainer}>
      <h2 style={styles.heading}>Checkout Book</h2>
      <Card>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="patronName">Patron Name</label>
          <Input
            style={styles.input}
            type="text"
            id="patronName"
            placeholder="Enter Patron Name"
            value={patronName}
            onChange={(e) => setPatronName(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="patronEmail">Patron Email</label>
          <Input
            style={styles.input}
            type="email"
            id="patronEmail"
            placeholder="Enter Patron Email"
            value={patronEmail}
            onChange={(e) => setPatronEmail(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="selectedBook">Select a Book</label>
          <select
            style={styles.select}
            id="selectedBook"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">--Select Book--</option>
            {books.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <Button
          style={styles.button}
          onClick={handleCheckout}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Checkout
        </Button>
      </Card>

      {checkoutStatus && <div style={styles.checkoutStatus}>{checkoutStatus}</div>}

      {/* Displaying Checkout History */}
      {history.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>Past Checkout History</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Patron Name</th>
                <th style={styles.tableHeader}>Patron Email</th>
                <th style={styles.tableHeader}>Book Title</th>
                <th style={styles.tableHeader}>Checkout Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{entry.patronName}</td>
                  <td style={styles.tableCell}>{entry.patronEmail}</td>
                  <td style={styles.tableCell}>{entry.bookTitle}</td>
                  <td style={styles.tableCell}>{entry.checkoutDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
