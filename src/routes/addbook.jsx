// import React from "react";

// const AddBook = () => {
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-xl font-bold  mb-4 text-black">Add Book</h2>
//       <p className="text-gray-800">This is the Add Book page. Use this section to add new books to the library catalog.</p>
//     </div>
//   );
// };

// export default AddBook;
import React from "react";
import { useNavigate } from "react-router-dom";


function AddBook(){

  const navigate = useNavigate();

  const AddBookdetails = () => {
    console.log("Navigating to AddBookDetails...");
    navigate("/dashboard/addbook/details");
  };
  return (

    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg  text-black">
      <h2 className="text-2xl font-bold mb-4  text-black">Add Book</h2>
      <form>
        {/* Book Id */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">BookID</label>
          <input
            type="text"
            placeholder="BookID"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Meta ID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">MetaID</label>
          <input
            type="text"
            placeholder="Enter MetaID"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* RFID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">RFID</label>
          <input
            type="text"
            placeholder="Scanned RFID"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Date of Arrival */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date of arrival</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick= {AddBookdetails}
        >
          Next
        </button>
      </form>
    </div>

  );
};

export default AddBook;