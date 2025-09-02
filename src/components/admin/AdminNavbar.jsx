import React from "react";

function AdminNavbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <ul className="flex space-x-6">
        <li className="hover:text-gray-300 cursor-pointer">Products</li>
        <li className="hover:text-gray-300 cursor-pointer">Users</li>
      </ul>
      <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
