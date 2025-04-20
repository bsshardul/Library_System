import { useState, useEffect } from 'react';

export default function Checkout() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [records, setRecords] = useState([]);
  const [patronSearch, setPatronSearch] = useState('');

  // For handling book return
  const handleReturn = async (identifier) => {
    setError(''); // Reset previous error message
    setMessage(''); // Reset previous success message

    try {
      const response = await fetch('http://localhost:3000/return-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set success message
        fetchIssueRecords(); // Fetch updated issue records
      } else {
        setError(response.statusText); // Set error message
      }
    } catch (error) {
      console.error('Request failed', error);
      setError('Failed to return the book. Please try again.');
    }
  };

  // For fetching issue records
  // const fetchIssueRecords = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/fetch-issue-records');
  //     const data = await response.json();
  //     if (data.success) {
  //       setRecords(data.records); // Update state with fetched records
  //     }
  //   } catch (error) {
  //     console.error('Error fetching issue records:', error);
  //   }
  // };
  const fetchIssueRecords = async (searchTerm = '') => {
    try {
      const query = searchTerm ? `?patron=${encodeURIComponent(searchTerm)}` : '';
      const response = await fetch(`http://localhost:3000/fetch-issue-records${query}`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.records);
      }
    } catch (error) {
      console.error('Error fetching issue records:', error);
    }
  };
  
  // Fetch issue records when the component mounts
  useEffect(() => {
    fetchIssueRecords();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-black">Return a Book</h2>

      <label className="block mb-2 text-black">Enter Book ID / ISBN:</label>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        placeholder="e.g. 9788129135513 or 1"
      />

      <button
        onClick={() => handleReturn(identifier)} // Pass identifier to handler
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Mark as Returned
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <h3 className="mt-8 text-xl font-bold">Issue Records</h3>
      <label className="block mt-8 mb-2 text-black">Search by Patron Name:</label>
<input
  type="text"
  value={patronSearch}
  onChange={(e) => setPatronSearch(e.target.value)}
  className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
  placeholder="e.g. Geetesh"
/>
<button
  onClick={() => fetchIssueRecords(patronSearch)}
  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
>
  Search
</button>


      <table className="min-w-full mt-4 border-collapse table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-black">Book Title</th>
            <th className="border px-4 py-2 text-black">Patron</th>
            <th className="border px-4 py-2 text-black">Issue Date</th>
            <th className="border px-4 py-2 text-black ">Return Date</th>
            <th className="border px-4 py-2 text-black">Returned</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2 text-black">{record.title}</td>
              <td className="border px-4 py-2 text-black">{`${record.first_name} ${record.last_name}`}</td>
              <td className="border px-4 py-2 text-black">{record.issue_date}</td>
              <td className="border px-4 py-2 text-black">{record.return_date || 'Not Returned'}</td>
              <td className="border px-4 py-2 text-black">{record.returned ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
