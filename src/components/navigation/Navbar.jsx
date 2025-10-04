import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if we're on a non-home page to turn HouseTabz black
  const isOnHomePage = location.pathname === '/';
  const logoColor = isOnHomePage ? '#34d399' : '#000000';
  const logoSrc = isOnHomePage 
    ? "https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
    : require("../../assets/black-logo-wink.png");

  // Import Montserrat font
  useEffect(() => {
    // Create a new link element
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

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
    <>
      <div className="fixed top-0 left-0 w-full h-24 bg-[#34d399] z-40"></div>
      <nav className="navbar bg-white rounded-full py-4 px-8 flex justify-between items-center fixed top-4 left-4 right-4 z-50 shadow-lg">
      {/* Left: Brand Name with Logo - Keep original HouseTabz branding */}
      <Link
        to="/"
        className="flex items-center gap-3 hover:opacity-80 transition duration-300"
      >
        <img
          src={logoSrc}
          alt="HouseTabz logo"
          className="h-8 w-auto"
        />
        <span
          className="text-xl font-bold tracking-tight transition-colors duration-300"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            color: logoColor
          }}
        >
          HouseTabz
        </span>
      </Link>

      {/* Right: Navigation Links - Keep original navigation */}
      <div className="hidden md:flex gap-6 items-center">
        <Link
          to="/business"
          className={`text-sm font-medium transition-colors duration-300 ${
            location.pathname === '/business'
              ? 'text-[#34d399]'
              : 'text-gray-700 hover:text-[#34d399]'
          }`}
        >
          For Business
        </Link>
        <Link
          to="/landlords"
          className={`text-sm font-medium transition-colors duration-300 ${
            location.pathname === '/landlords'
              ? 'text-[#34d399]'
              : 'text-gray-700 hover:text-[#34d399]'
          }`}
        >
          For Landlords
        </Link>
      </div>

      {/* Right: Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none hover:text-[#34d399] transition duration-300"
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
            className={`text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
              location.pathname === '/business'
                ? 'bg-[#34d399] text-white'
                : 'text-gray-700 hover:text-[#34d399] hover:bg-gray-50'
            }`}
          >
            For Business
          </Link>
          <Link
            to="/landlords"
            onClick={closeMenu}
            className={`text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
              location.pathname === '/landlords'
                ? 'bg-[#34d399] text-white'
                : 'text-gray-700 hover:text-[#34d399] hover:bg-gray-50'
            }`}
          >
            For Landlords
          </Link>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;