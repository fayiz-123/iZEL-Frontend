import React, { useState } from "react";
import { FaBars, FaTimes, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Gallery", path: "/gallery" },
    { text: "About", path: "/about" },
    { text: "Signup", path: "/login" },
  ];

  return (
    <>
      {/* 🔹 Navbar */}
      <div className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
        <div className="w-full px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold text-black">iZEL</div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-8 text-base font-medium text-black">
              {navLinks.map(({ text, path }, i) => (
                <li
                  key={i}
                  className="border-b-2 border-transparent hover:border-black transition duration-300"
                >
                  <Link to={path}>{text}</Link>
                </li>
              ))}
            </ul>

            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.instagram.com/izel_design_studio?igsh=eWF0cW9qa3A0MHpm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-red-500 text-lg cursor-pointer" />
              </a>
              <a
                href="https://wa.me/+919400647077?text=Hello"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-lg cursor-pointer" />
              </a>
            </div>

            {/* Mobile Menu + Icons */}
            <div className="flex items-center gap-4 md:hidden right-4">
              <a
                href="https://www.instagram.com/izel_design_studio?igsh=eWF0cW9qa3A0MHpm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-red-500 text-lg cursor-pointer" />
              </a>
              <a
                href="https://wa.me/+919400647077?text=Hello"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-lg cursor-pointer" />
              </a>
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

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 text-base font-medium z-10">
            {navLinks.map(({ text, path }, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
              >
                <Link to={path}>{text}</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Push page content down so it's not hidden */}
      <div className="pt-13">{children}</div>
    </>
  );
};

export default Navbar;
