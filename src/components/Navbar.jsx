import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full top-0 left-0 right-0">
      {/* 🔼 Top Promo Strip */}
      <div className="bg-black text-white text-center py-2 text-sm">
        🔥 Summer Steals! | 50% OFF Women’s Wear 👗
        <span className="underline cursor-pointer font-semibold ml-1">
          ShopNow
        </span>
      </div>

      {/* 🔽 Main Navbar */}
      <div className="w-full px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 🔹 Left - Logo */}
          <div className="text-xl font-bold text-black">iZEL</div>

          {/* 🔹 Center - Desktop Nav Links */}
          <ul className="hidden md:flex gap-8 text-base font-medium text-black">
            {["Home", "Contact", "About", "Signup"].map((text, i) => (
              <li
                key={i}
                className="border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer"
              >
                {text}
              </li>
            ))}
          </ul>

          {/* 🔹 Right - Search & Icons (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Box */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent outline-none w-48 text-sm"
              />
              <FaSearch className="text-gray-500" />
            </div>

            {/* Icons */}
            <FaShoppingCart className="text-black text-lg cursor-pointer" />
            <FaHeart className="text-red-500 text-lg cursor-pointer" />
          </div>

          {/* 🔹 Right - Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <FaSearch className="text-black text-lg cursor-pointer" />
            <FaHeart className="text-red-500 text-lg cursor-pointer" />
            <FaShoppingCart className="text-black text-lg cursor-pointer" />
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-black text-lg" />
              ) : (
                <FaBars className="text-black text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔽 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base font-medium">
          {["Home", "Contact", "About", "Sign Up"].map((text, index) => (
            <div key={index} className="border-b pb-1">
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
