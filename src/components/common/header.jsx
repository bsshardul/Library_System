import React from 'react';

const Header = () => {
  return (
  
 
    <header className="bg-black-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Library System Dashboard</h1>
      {/* Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
        />
        <button className="ml-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;