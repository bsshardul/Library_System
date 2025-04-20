
import React, { useState, useEffect } from "react";
import { Input } from "../components/input";

const CheckIn = () => {
  const [rfid, setRfid] = useState("");
  const [patron, setPatron] = useState(null);
  const [history, setHistory] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rfid");
        if (!res.ok) throw new Error("RFID endpoint not found");
        const data = await res.json();

        if (data.rfid && data.rfid !== rfid) {
          setRfid(data.rfid);
          fetchPatronData(data.rfid);
          fetchAvailableBooks();
        }
      } catch (err) {
        console.error("RFID Poll Error:", err.message);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [rfid]);

  const fetchPatronData = async (rfidTag) => {
    try {
      const res = await fetch(`http://localhost:3000/api/patron-info/${rfidTag}`);
      if (!res.ok) throw new Error("Patron not found");
      const data = await res.json();
      setPatron(data.patron);
      setHistory(data.history);
    } catch (err) {
      console.error("Fetch Patron Info Error:", err.message);
      setPatron(null);
      setHistory([]);
    }
  };

  const fetchAvailableBooks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/available-books");
      const data = await res.json();
      setAvailableBooks(data.books || []);
    } catch (err) {
      console.error("Fetch Books Error:", err.message);
      setAvailableBooks([]);
    }
  };

  const handleIssueBook = async () => {
    if (!selectedBook) {
      setMessage("Please select a book to issue.");
      return;
    }
  
    try {
      // Log the data that is about to be sent to the backend
      console.log("Issuing book with data:", { rfid, bookId: selectedBook });
  
      const res = await fetch("http://localhost:3000/api/issue-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfid, bookId: selectedBook }),
      });
  
      // If the response is not OK, throw an error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to issue book");
      }
  
      const data = await res.json();
      setMessage(data.message);
  
      // Fetch patron data and available books after the issue
      fetchPatronData(rfid);
      fetchAvailableBooks();
      setSelectedBook(null);
    } catch (err) {
      console.error("Error during book issue:", err.message);
      setMessage(err.message);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-black">📚 RFID Book Issue</h2>

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="rfid" className="text-gray-700">RFID Tag:</label>
        <Input
          type="text"
          id="rfid"
          value={rfid}
          readOnly
          className="text-blue-600 w-1/3"
        />
      </div>

      {patron && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-black mb-2">👤 Patron Details</h3>
          <table className="min-w-full border text-sm text-left text-gray-800">
            <tbody>
              <tr><td className="border px-4 py-2 font-medium">Name</td><td className="border px-4 py-2">{patron.first_name} {patron.middle_name} {patron.last_name}</td></tr>
              <tr><td className="border px-4 py-2 font-medium">Category</td><td className="border px-4 py-2">{patron.category}</td></tr>
              <tr><td className="border px-4 py-2 font-medium">Contact</td><td className="border px-4 py-2">{patron.contact_info}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📖 Issue History</h3>
          <table className="min-w-full text-sm border text-left">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="py-2 px-4 border">Book Title</th>
                <th className="py-2 px-4 border">Issued On</th>
                <th className="py-2 px-4 border">Return Date</th>
                <th className="py-2 px-4 border">Returned</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 text-black px-4">{record.title}</td>
                  <td className="py-2  text-black px-4">{new Date(record.issue_date).toLocaleDateString()}</td>
                  <td className="py-2  text-black px-4">{new Date(record.return_date).toLocaleDateString()}</td>
                  <td className="py-2 text-black px-4">{record.returned ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{patron && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-black mb-2">📗 Issue a Book</h3>

    <Input
      type="text"
      placeholder="Search by book title..."
      className="text-black mb-2"
      value={
        selectedBook
          ? availableBooks.find((b) => b.id === selectedBook)?.title || ""
          : ""
      }
      onChange={(e) => {
        const input = e.target.value.toLowerCase();
        const match = availableBooks.find((book) =>
          book.title.toLowerCase().includes(input)
        );
        setSelectedBook(match?.id || null);
      }}
    />

    {/* Optional: Show matching suggestions */}
    {!selectedBook && (
      <ul className="border border-gray-300 rounded max-h-40 overflow-y-auto bg-white text-black text-sm">
        {availableBooks
          .filter((book) =>
            book.title.toLowerCase().includes(
              availableBooks.find((b) => b.id === selectedBook)?.title?.toLowerCase() || ""
            )
          )
          .slice(0, 5) // Limit suggestions
          .map((book) => (
            <li
              key={book.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => setSelectedBook(book.id)}
            >
              {book.title}
            </li>
          ))}
      </ul>
    )}

    {selectedBook && (
      <div className="text-sm text-green-700 mb-2">
        Selected: {availableBooks.find((b) => b.id === selectedBook)?.title}
      </div>
    )}

    <button
      onClick={handleIssueBook}
      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
    >
      Issue Book
    </button>
  </div>
)}

      {message && <div className="mt-4 text-gray-800">{message}</div>}
    </div>
  );
};

export default CheckIn;
