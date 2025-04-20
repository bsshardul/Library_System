import React from 'react';
import { Link, Outlet } from "react-router-dom";
const Sidebar = () => {
    return (
      <nav className="bg-black-200 w-60 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard/addpatron"
              className="block py-2 px-4 text-white-600 hover:bg-blue-100 rounded"
            >
              Add Patron
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/addbook"
              className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded"
            >
              Add Book
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/checkin"
              className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded"
            >
              Check Out
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/checkout"
              className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded"
            >
             Check In
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/analytics"
              className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded"
            >
              Analytics
            </Link>
          </li>
        </ul>
      </nav>
    );
  };
export default Sidebar;