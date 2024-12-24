import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-gray-100 py-16 px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left: Company Information */}
        <div className="info md:w-1/3">
          <h3 className="text-2xl font-bold text-green-400">HouseTabz</h3>
          <p className="text-sm mt-4 leading-relaxed">
            Simplifying shared expenses for households. No more fighting over who owes what. Let HouseTabz handle it all!
          </p>
          <p className="text-sm mt-4">
            <span className="font-semibold">Address:</span> Dallas, TX
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Email:</span> support@housetabz.com
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="links md:w-1/3">
          <h3 className="text-xl font-bold text-green-400">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#about" className="text-sm hover:text-green-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="text-sm hover:text-green-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#waitlist" className="text-sm hover:text-green-400 transition">
                Join Waitlist
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm hover:text-green-400 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Contact Form */}
        <div className="contact md:w-1/3">
          <h3 className="text-xl font-bold text-green-400">Contact Us</h3>
          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              placeholder="Your Message"
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} HouseTabz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
