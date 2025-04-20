import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login.jsx";
import Dashboard from "./routes/dashboard.jsx";
import AddPatron from "./routes/addpatron.jsx";
import AddBook from "./routes/addbook.jsx";
import CheckIn from "./routes/checkin.jsx";
import CheckOut from "./routes/checkout.jsx";
import Analytics from "./routes/analytics.jsx";

const App = () => {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard with nested routes */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="addpatron" element={<AddPatron />} />
        <Route path="addbook" element={<AddBook />} />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
