import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Left: Brand Name with For Business Button */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-3xl font-extrabold text-gray-800 tracking-tight hover:text-green-500 transition duration-300"
        >
          HouseTabz
        </Link>
        <Link
          to="/business"
          className="text-sm font-medium bg-gray-100 text-gray-700 py-1.5 px-5 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition duration-300"
        >
          For Business
        </Link>
      </div>

      {/* Right: Buttons */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Current Users
        </Link>
        <Link
          to="/waitlist"
          className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Waitlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
