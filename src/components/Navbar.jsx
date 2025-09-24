import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout, Profile } from "../services/authService";
import ProfileIcon from "./ProfileIcon";
import toast from "react-hot-toast";
import { confirmToast } from "../utils/ConfirmToast";

const Navbar = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // separate refs for desktop and mobile dropdowns
  const desktopProfileRef = useRef();
  const mobileProfileRef = useRef();

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Store", path: "/store" },
    { text: "About", path: "/about" },
  ];

  const linkClass = (path) =>
    `border-b-2 ${
      location.pathname === path
        ? "border-black"
        : "border-transparent hover:border-black"
    } transition duration-300`;

  const fetchProfile = async () => {
    try {
      const response = await Profile();
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching Profile:", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await Logout();
      if (response.success) {
        toast.dismiss();
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

  // close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 🔹 Navbar */}
      <div className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
        <div className="w-full px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold text-black">iZEL</div>

            {/* Title (mobile only) */}
            {title && (
              <h1 className="block md:hidden text-lg font-semibold text-gray-800 flex-1 text-center">
                {title}
              </h1>
            )}

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex gap-8 text-base font-medium text-black">
              {navLinks.map(({ text, path }, i) => (
                <li key={i}>
                  <Link to={path} className={linkClass(path)}>
                    {text}
                  </Link>
                </li>
              ))}
              {!user?.name && (
                <li>
                  <Link to="/login" className={linkClass("/login")}>
                    SignIn
                  </Link>
                </li>
              )}
            </ul>

            {/* 🔹 Right Side (Social + Profile) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Social Icons */}
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

              {/* Profile Dropdown (Desktop) */}
              {user?.name && (
                <div className="relative" ref={desktopProfileRef}>
                  <div
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="cursor-pointer"
                  >
                    <ProfileIcon name={user?.name} />
                  </div>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 text-sm font-medium z-20">
                      <button
                        onClick={confirmLogout}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu + Profile */}
            <div className="flex items-center gap-4 md:hidden right-4">
              {/* Hamburger */}
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <FaTimes className="text-black text-lg" />
                ) : (
                  <FaBars className="text-black text-lg" />
                )}
              </button>

              {/* Profile Dropdown (Mobile) */}
              { user?.name && user.role === 'user'  && (
                <div className="relative" ref={mobileProfileRef}>
                  <div
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="cursor-pointer"
                  >
                    <ProfileIcon name={user?.name} />
                  </div>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 text-sm font-medium z-20">
                      <button
                        onClick={confirmLogout}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Dropdown Menu (links only) */}
        {menuOpen && (
          <div className="absolute right-4 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 text-base font-medium z-10">
            {navLinks.map(({ text, path }, index) => (
              <div key={index} className="px-3 py-2">
                <Link
                  to={path}
                  className={linkClass(path)}
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </Link>
              </div>
            ))}

            {!user?.name && (
              <div className="px-3 py-2">
                <Link
                  to="/login"
                  className={linkClass("/login")}
                  onClick={() => setMenuOpen(false)}
                >
                  SignIn
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Push page down */}
      <div className="pt-12"></div>
    </>
  );
};

export default Navbar;
