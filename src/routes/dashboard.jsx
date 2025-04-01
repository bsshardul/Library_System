
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card"; // Relative path

import { Button } from "../components/button.jsx"; // Relative path

import { FiUsers, FiBook, FiLogOut, FiHome, FiCheckSquare, FiBarChart } from "react-icons/fi";
import AddPatron from "../routes/addpatron.jsx";
import AddBook from "../routes/addbook.jsx";
import CheckIn from "../routes/checkin.jsx";
import CheckOut from "../routes/checkout.jsx";
import Analytics from "../routes/analytics.jsx";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "addpatron":
        return <AddPatron />;
      case "addbook":
        return <AddBook />;
      case "checkin":
        return <CheckIn />;
      case "checkout":
        return <CheckOut />;
      case "analytics":
        return <Analytics />;
      default:
        return <h2 className="text-xl font-semibold">Welcome to the Library Dashboard</h2>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-5">Library System</h1>
        <nav className="flex flex-col space-y-3">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("home")}>
            <FiHome /> Home
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("addpatron")}>
            <FiUsers /> Add Patron
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("addbook")}>
            <FiBook /> Add Book
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("checkin")}>
            <FiCheckSquare /> Check In
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("checkout")}>
            <FiCheckSquare /> Check Out
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("analytics")}>
            <FiBarChart /> Analytics
          </Button>
          <Link to="/login">
            <Button variant="ghost" className="flex items-center gap-2 mt-5">
              <FiLogOut /> Logout
            </Button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Card className="p-5">{renderContent()}</Card>
      </div>
    </div>
  );
};

export default Dashboard;