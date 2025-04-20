import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const borrowData = [
  { name: "Mon", borrows: 24 },
  { name: "Tue", borrows: 45 },
  { name: "Wed", borrows: 38 },
  { name: "Thu", borrows: 55 },
  { name: "Fri", borrows: 32 },
  { name: "Sat", borrows: 18 },
];

const categoryData = [
  { name: "Fiction", value: 400 },
  { name: "Non-Fiction", value: 300 },
  { name: "Reference", value: 300 },
  { name: "Magazines", value: 200 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Analytics = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-black">📊 Library Analytics</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Book Borrowing Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={borrowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrows" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Books by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap Simulation */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Heatmap: Library Usage (Simulated)</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-gray-600">{day}</div>
          ))}
          {[...Array(35)].map((_, i) => {
            const heat = Math.floor(Math.random() * 5);
            const colors = ["bg-gray-200", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"];
            return (
              <div
                key={i}
                className={`w-6 h-6 ${colors[heat]} rounded`}
                title={`Activity level ${heat}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
