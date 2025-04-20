
// import React, { useState } from "react";
// import axios from "axios";
// import Footer from "../components/common/footer";

// const AddBook = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     title: "",
//     isbn: "",
//     category_id: "",
//     author_id: "",
//     total_copies: "",
//     available_copies: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Ensure category_id and author_id are valid integers
//     if (formData.category_id === '') {
//       formData.category_id = null; // Or handle with a default valid value
//     }
  
//     if (formData.author_id === '') {
//       formData.author_id = null; // Or handle with a default valid value
//     }
  
//     try {
//       const res = await axios.post("http://localhost:3000/api/books/add", formData);
//       alert(res.data.message);
//       setFormData({
//         id: "",
//         title: "",
//         isbn: "",
//         category_id: "",
//         author_id: "",
//         total_copies: "",
//         available_copies: "",
//       });
//     } catch (err) {
//       console.error("Error adding book:", err);
//       alert("Failed to add book.");
//     }
//   };
  


//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
//       <h2 className="text-2xl font-bold mb-4 text-black">Add Book</h2>
//       <form onSubmit={handleSubmit}>
//         {[
//           { name: "id", type: "text", placeholder: "ID" },
//           { name: "title", type: "text", placeholder: "Title" },
//           { name: "isbn", type: "text", placeholder: "ISBN" },
//           { name: "category_id", type: "text", placeholder: "Category ID" },
//           { name: "author_id", type: "text", placeholder: "Author ID" },
//           { name: "total_copies", type: "number", placeholder: "Total Copies" },
//           { name: "available_copies", type: "number", placeholder: "Available Copies" },
//         ].map((field) => (
//           <div className="mb-4" key={field.name}>
//             <label className="block text-gray-700 font-medium mb-2">
//               {field.placeholder}
//             </label>
//             <input
//               type={field.type}
//               name={field.name}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg"
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
//         >
//           Add Book
//         </button>
//       </form>
//       <Footer />
//     </div>
//   );
// };

// export default AddBook;
import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/common/footer";

const AddBook = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    isbn: "",
    category_id: "",
    author_id: "",
    total_copies: "",
    available_copies: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // New state for success/error message

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure category_id and author_id are valid integers
    if (formData.category_id === "") {
      formData.category_id = null; // Or handle with a default valid value
    }

    if (formData.author_id === "") {
      formData.author_id = null; // Or handle with a default valid value
    }

    try {
      const res = await axios.post("http://localhost:3000/api/books/add", formData);
      
      // Set status message based on the response
      setStatusMessage({
        type: "success",
        message: res.data.message || "Book added successfully!", // Display success message
      });

      // Reset form
      setFormData({
        id: "",
        title: "",
        isbn: "",
        category_id: "",
        author_id: "",
        total_copies: "",
        available_copies: "",
      });
    } catch (err) {
      console.error("Error adding book:", err);

      // Set error message if something goes wrong
      setStatusMessage({
        type: "error",
        message: "Failed to add book. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Book</h2>

      {/* Displaying the status message */}
      {statusMessage && (
        <div
          className={`mb-4 p-2 rounded-lg ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {statusMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {[
          { name: "id", type: "text", placeholder: "ID" },
          { name: "title", type: "text", placeholder: "Title" },
          { name: "isbn", type: "text", placeholder: "ISBN" },
          { name: "category_id", type: "text", placeholder: "Category ID" },
          { name: "author_id", type: "text", placeholder: "Author ID" },
          { name: "total_copies", type: "number", placeholder: "Total Copies" },
          { name: "available_copies", type: "number", placeholder: "Available Copies" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-gray-700 font-medium mb-2">
              {field.placeholder}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add Book
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddBook;
