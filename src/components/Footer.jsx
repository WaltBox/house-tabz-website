import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  useEffect(() => {
    // Load DM Sans font
    const existingLink = document.querySelector('link[href*="DM+Sans"]');
    if (!existingLink) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'dm-sans-font-link';
      document.head.appendChild(fontLink);
    }
  }, []);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = React.useState('');

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
    <footer className="relative bg-white text-gray-900 py-20 px-6 overflow-hidden border-t border-gray-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 right-16 w-32 h-32 bg-[#34d399]/6 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#34d399]/8 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#34d399]/4 rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 z-10">
        {/* Left: Company Information */}
        <div className="info md:w-1/3">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
              alt="HouseTabz logo"
              className="h-8 w-auto"
            />
            <h3 className="text-2xl font-black text-[#34d399]" style={{ letterSpacing: '-0.02em' }}>
              HouseTabz
            </h3>
          </div>
          <p className="text-base leading-relaxed text-gray-700 mb-6 font-medium">
            The payment method for shared household expenses. No more fronting bills or chasing reimbursements.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Location:</span> Dallas, TX
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Email:</span>{" "}
              <a href="mailto:support@housetabz.com" className="text-[#34d399] hover:text-[#10b981] transition-colors duration-300 font-medium">
                walt@housetabz.com
              </a>
            </p>
          </div>
        </div>

        {/* Center: Quick Links & Social */}
        <div className="links md:w-1/3">
          <h3 className="text-xl font-black text-[#34d399] mb-6" style={{ letterSpacing: '-0.02em' }}>
            Quick Links
          </h3>
          <ul className="space-y-4 mb-8">
            {/* <li>
              <Link to="/waitlist" className="text-base text-gray-700 hover:text-[#34d399] transition-colors duration-300 font-medium">
                Become a Homie
              </Link>
            </li> */}
            <li>
              <Link to="/met-walt" className="text-base text-gray-700 hover:text-[#34d399] transition-colors duration-300 font-medium">
                Meet Walt!
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-base text-gray-700 hover:text-[#34d399] transition-colors duration-300 font-medium">
                Terms of Service
              </Link>
            </li>
          </ul>
          
          <h3 className="text-xl font-black text-[#34d399] mb-6" style={{ letterSpacing: '-0.02em' }}>
            Follow Us
          </h3>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/housetabz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
              <FaInstagram className="text-2xl text-gray-500 group-hover:text-[#34d399] transition-colors duration-300" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61571984092500" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
              <FaFacebook className="text-2xl text-gray-500 group-hover:text-[#34d399] transition-colors duration-300" />
            </a>
            <a href="https://x.com/housetabz?s=11" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group">
              <FaTwitter className="text-2xl text-gray-500 group-hover:text-[#34d399] transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/company/104392401/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
              <FaLinkedin className="text-2xl text-gray-500 group-hover:text-[#34d399] transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact md:w-1/3">
          <h3 className="text-xl font-black text-[#34d399] mb-6" style={{ letterSpacing: '-0.02em' }}>
            Contact Us
          </h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-300 font-medium placeholder-gray-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-300 font-medium placeholder-gray-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-300 font-medium h-28 resize-none placeholder-gray-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#34d399] to-[#10b981] text-white py-3 px-6 rounded-xl font-bold hover:from-[#10b981] hover:to-[#059669] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
          {statusMessage && (
            <p className="mt-6 text-sm text-center font-medium">
              {statusMessage.includes('Failed') ? (
                <span className="text-red-500">{statusMessage}</span>
              ) : (
                <span className="text-[#34d399]">{statusMessage}</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 font-medium">
          © {new Date().getFullYear()} HouseTabz. All rights reserved.
        </p>
        <div className="mt-4 sm:mt-0 flex items-center gap-6">
          <Link to="/terms" className="text-sm text-gray-600 hover:text-[#34d399] transition-colors duration-300 font-medium">
            Terms of Service
          </Link>
          <a 
            href="https://testflight.apple.com/join/QAMFMXVJ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm bg-[#34d399] text-white px-4 py-2 rounded-lg hover:bg-[#10b981] transition-colors duration-300 font-semibold"
          >
            Join Beta
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;