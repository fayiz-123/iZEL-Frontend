import React from "react";
import { FaBoxOpen, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmToast } from "../../utils/ConfirmToast";

function AdminNavbar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Logout();
      if (response.success) {
        toast.success("Logout Successfull");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout failed, please try again.");
    }
  };

  const confirmLogout = () => {
    confirmToast("Are you sure you want to logout?", handleLogout);
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-3 shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <h1 className="text-lg font-bold">Admin</h1>

        {/* Navigation */}
        <ul className="flex items-center space-x-6 text-sm">
          <li
            className={`flex items-center gap-1 cursor-pointer hover:text-gray-300 ${
              activeSection === "products" ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveSection("products")}
          >
            <FaBoxOpen className="text-base" />
            <span className="hidden sm:inline">Products</span>
          </li>

          <li
            className={`flex items-center gap-1 cursor-pointer hover:text-gray-300 ${
              activeSection === "users" ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            <FaUsers className="text-base" />
            <span className="hidden sm:inline">Users</span>
          </li>
        </ul>

        {/* Logout */}
        <button
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm"
          onClick={confirmLogout}
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
