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
    <nav className="navbar bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Left: Brand Name */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition duration-300"
        >
          <img
            src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
            alt="HouseTabz logo"
            className="h-10 md:h-12 w-auto"
          />
          <span
            className="text-2xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: logoColor
            }}
          >
            HouseTabz
          </span>
        </Link>
        {/* Navigation buttons visible only on desktop */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/business"
            className={`text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
              location.pathname === '/business'
                ? 'bg-[#34d399] text-white shadow-lg'
                : 'text-gray-700 hover:text-[#34d399] hover:bg-gray-50'
            }`}
          >
            For Business
          </Link>
          <Link
            to="/landlords"
            className={`text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
              location.pathname === '/landlords'
                ? 'bg-[#34d399] text-white shadow-lg'
                : 'text-gray-700 hover:text-[#34d399] hover:bg-gray-50'
            }`}
          >
            For Landlords
          </Link>
        </div>
      </div>

      {/* Right: Desktop Buttons - Removed for minimal design */}
      <div className="hidden md:flex gap-4 items-center">
        {/* Buttons removed for cleaner design */}
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
  );
};

export default Navbar;