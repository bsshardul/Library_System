import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/common/footer";

const AddPatron = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    pronouns: "",
    address: "",
    contact: "",
    category: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/add-patron", formData);
      alert(res.data.message);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        pronouns: "",
        address: "",
        contact: "",
        category: "",
         rfid: ""
      });
    } catch (err) {
      console.error("Error adding patron:", err);
      alert("Failed to add patron.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Patron</h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "middleName", "lastName", "dob", "address", "contact"].map(field => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 font-medium mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === "dob" ? "date" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Pronouns</label>
          <select name="pronouns" value={formData.pronouns} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg">
            <option value="">Select Pronouns</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg">
            <option value="">Select Category</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-2">RFID Tag</label>
  <input
    type="text"
    name="rfid"
    placeholder="Enter RFID Tag"
    value={formData.rfid}
    onChange={handleChange}
    className="w-full border border-gray-300 p-2 rounded-lg"
  />
</div>

        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Add Patron
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddPatron;
