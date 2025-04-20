import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Card } from "../components/card";
import { Button } from "../components/button.jsx";

import {
  FiUsers,
  FiBook,
  FiLogOut,
  FiHome,
  FiCheckSquare,
  FiBarChart,
} from "react-icons/fi";

import AddPatron from "../routes/addpatron.jsx";
import AddBook from "../routes/addbook.jsx";
import CheckIn from "../routes/checkin.jsx";
import CheckOut from "../routes/checkout.jsx";
import Analytics from "../routes/analytics.jsx";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [date, setDate] = useState(new Date());

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
        return (
          <div className="text-gray-800 space-y-6">
            <h2 className="text-2xl font-bold">Welcome to the Library Dashboard</h2>
            <p className="text-md">
              Use the side navigation to manage patrons, books, check-ins/outs, and view analytics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white shadow p-4">
                <h3 className="text-lg font-semibold">📚 Total Books</h3>
                <p className="text-2xl font-bold">120</p>
              </Card>
              <Card className="bg-white shadow p-4">
                <h3 className="text-lg font-semibold">👥 Patrons</h3>
                <p className="text-2xl font-bold">85</p>
              </Card>
              <Card className="bg-white shadow p-4">
                <h3 className="text-lg font-semibold">📈 Active Checkouts</h3>
                <p className="text-2xl font-bold">37</p>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="bg-white shadow p-5">
                <h3 className="text-lg font-semibold mb-4">🗓️ Calendar</h3>
                <Calendar onChange={setDate} value={date} />
                <p className="mt-4 text-sm text-gray-600">
                  Selected Date: <strong>{date.toDateString()}</strong>
                </p>
              </Card>
            </div>
          </div>
        );
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
            <FiCheckSquare /> Check Out
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setActiveTab("checkout")}>
            <FiCheckSquare /> Check In
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
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Card className="p-5">{renderContent()}</Card>
      </div>
    </div>
  );
};

export default Dashboard;
