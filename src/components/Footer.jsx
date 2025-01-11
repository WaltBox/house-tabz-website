import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Import social icons

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const response = await axios.post(
        'https://api.housetabz.com/api/contact',
        formData
      );
      setStatusMessage(response.data.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatusMessage('Failed to send your message. Please try again later.');
    }
  };

  return (
    <footer className="footer bg-gray-800 text-gray-100 py-16 px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left: Company Information */}
        <div className="info md:w-1/3">
          <h3 className="text-2xl font-bold text-green-400">HouseTabz</h3>
          <p className="text-sm mt-4 leading-relaxed">
            Simplifying shared expenses for households. No more fighting over who owes what. Let HouseTabz handle it
            all!
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
              <Link to="/about" className="text-sm hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-sm hover:text-green-400 transition">
                How It Works
              </Link>
            </li>
          </ul>
          {/* Socials */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-green-400">Follow Our Socials</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/housetabz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-green-400 transition" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61571984092500" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-green-400 transition" />
              </a>
              <a href="https://x.com/housetabz?s=11" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-green-400 transition" />
              </a>
              <a href="https://www.linkedin.com/company/104392401/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-green-400 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact md:w-1/3">
          <h3 className="text-xl font-bold text-green-400">Contact Us</h3>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-gray-700 text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-24"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {statusMessage && (
            <p className="mt-4 text-sm text-center">
              {statusMessage.includes('Failed') ? (
                <span className="text-red-500">{statusMessage}</span>
              ) : (
                <span className="text-green-400">{statusMessage}</span>
              )}
            </p>
          )}
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
