import React from "react";

import Footer from "../components/common/footer";
const AddPatron = () => {
  return (
  
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg  text-black">
    
      <h2 className="text-2xl font-bold mb-4  text-black">Add Patron</h2>
      <form>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Middle Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Middle Name</label>
          <input
            type="text"
            placeholder="Middle Name"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg "
          />
        </div>

        {/* Pronouns */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Pronouns</label>
          <select className="w-full border border-gray-300 p-2 rounded-lg ">
            <option value="">Select Pronouns</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            placeholder="Address"
            className="w-full border border-gray-300 p-2 rounded-lg"
            rows="3"
          />
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contact Information</label>
          <input
            type="text"
            placeholder="Phone Number or Email"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select className="w-full border border-gray-300 p-2 rounded-lg  text-gray">
            <option value="">Select Category</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add Patron
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddPatron;
