import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".navbar")) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Left: Brand Name */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight hover:text-green-500 transition duration-300"
        >
          HouseTabz
        </Link>
        {/* "For Business" visible only on desktop */}
        <div className="hidden md:block">
          <Link
            to="/business"
            className="text-sm font-medium bg-gray-100 text-gray-700 py-1.5 px-5 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition duration-300"
          >
            For Business
          </Link>
        </div>
      </div>

      {/* Right: Desktop Buttons */}
      <div className="hidden md:flex gap-4 items-center">
        <Link
          to="/waitlist"
          className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Join Waitlist
        </Link>
        <Link
          to="/"
          className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Current Users
        </Link>
      </div>

      {/* Right: Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Link
          to="/waitlist"
          className="bg-green-500 text-white py-2 px-4 rounded-full font-semibold mr-4 hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Join Waitlist
        </Link>
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none hover:text-green-500 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg py-4 px-6 flex flex-col gap-4 md:hidden">
          <Link
            to="/business"
            onClick={closeMenu}
            className="text-sm font-medium text-gray-700 hover:text-green-500 transition duration-300"
          >
            For Business
          </Link>
          <Link
            to="/"
            onClick={closeMenu}
            className="bg-green-500 text-white py-2 px-4 rounded-full font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition duration-300"
          >
            Current Users
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
