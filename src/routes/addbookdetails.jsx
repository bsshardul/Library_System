import react from "react";
// import {navigate} from "react-router-dom";

const AddBookdetails = () => {
    return (
        
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg  text-black">
        <h2 className="text-2xl font-bold mb-4  text-black"> Add Book Details </h2>

        <form>

        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">MetaID</label>
        <input
            type="text"
            placeholder="Enter Meta ID"
            className="w-full border border-gray-300 p-2 rounded-lg"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
            type="text"
            placeholder="Enter title"
            className="w-full border border-gray-300 p-2 rounded-lg"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">ISBN</label>
        <input
            type="text"
            placeholder="Enter ISBN"
            className="w-full border border-gray-300 p-2 rounded-lg"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Author ID</label>
        <input
            type="text"
            placeholder="Enter Author ID"
            className="w-full border border-gray-300 p-2 rounded-lg"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Publication ID</label>
        <input
            type="text"
            placeholder="Enter Publication Id"
            className="w-full border border-gray-300 p-2 rounded-lg"
        />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select className="w-full border border-gray-300 p-2 rounded-lg ">
            <option value="">Select Category</option>
            <option value="book">Engineering Book</option>
            <option value="magazine">Magazine</option>
            <option value="novel">Novel</option>
          </select>
        </div>

        <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
            Add Book
        </button>

        </form>
        </div>
    );
};

export default AddBookdetails;