import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaWallet, FaCheckCircle, FaHeart } from 'react-icons/fa';
import waltImage from '../assets/walt.png';
import Footer from './Footer';

const MetWaltPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load DM Sans and Montserrat fonts
    const existingDMSans = document.querySelector('link[href*="DM+Sans"]');
    if (!existingDMSans) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'dm-sans-font-link';
      document.head.appendChild(fontLink);
    }
    
    const existingMontserrat = document.querySelector('link[href*="Montserrat"]');
    if (!existingMontserrat) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'montserrat-font-link';
      document.head.appendChild(fontLink);
    }
  }, []);

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply phone formatting if it's the phone field
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields!' });
      return;
    }

    // Validate phone number has 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number!' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.housetabz.com/api/waitlist2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          email: formData.email.trim(),
          phone: phoneDigits, // Send only digits
          source: 'met-walt'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: `Check your email for your Dawg Mode Code, ${formData.firstName}! 🎉` 
        });
        setShowSuccess(true);
      } else if (response.status === 409) {
        setSubmitStatus({ 
          type: 'duplicate', 
          message: "This phone number is already on the waitlist! 📱" 
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.message || 'Something went wrong. Please try again!' 
        });
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please try again later!' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#34d399]/5 via-white to-[#34d399]/10 pt-40 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-lg w-full text-center relative z-10 mx-auto">
          
          {/* Success checkmark animation */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#34d399] to-[#10b981] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#34d399]/30">
              <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              You're In
            </h1>
            
            <p className="text-xl text-gray-600 mb-2">
              Check your email for your Dawg Mode code:
            </p>
            <p className="text-lg font-bold text-[#34d399] mb-8 bg-gray-50 py-3 px-4 rounded-xl">
              {formData.email}
            </p>
            
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-[#34d399]/20">
              <p className="text-gray-700 font-semibold mb-3 text-lg">
                Your Dawg Mode code is on the way
              </p>
              <p className="text-gray-600 mb-6">
                Start using HouseTabz now with all your roommates for free.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Check your email (including spam folder)</p>
                <p>Download the app</p>
                <p>Enter your Dawg Mode code</p>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-4">
              Questions?
            </p>
            <a 
              href="tel:8063161686" 
              className="inline-block bg-[#34d399] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#10b981] hover:shadow-lg hover:shadow-[#34d399]/30 transition-all duration-300"
            >
              Text Walt: (806) 316-1686
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#34d399]/3 to-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#34d399]/20 to-[#34d399]/0 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-[#34d399]/15 to-[#34d399]/0 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 md:pt-32">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Walt's Image & Social */}
          <div className="flex flex-col items-center md:items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#34d399]/40 to-[#34d399]/10 rounded-3xl blur-2xl"></div>
              <img
                src={waltImage}
                alt="Walt Boxwell, Founder"
                className="relative w-80 md:w-full md:max-w-md h-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-8 mt-6 justify-center">
              <a 
                href="https://www.linkedin.com/in/walt-boxwell-04996919b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#34d399] text-[#34d399] hover:bg-[#34d399] hover:text-white transition-all duration-300 shadow-lg"
                aria-label="Walt's LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://instagram.com/walt_boxwell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#34d399] text-[#34d399] hover:bg-[#34d399] hover:text-white transition-all duration-300 shadow-lg"
                aria-label="Walt's Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Right: Header & Form */}
          <div>
            <div className="mb-12">
              <span className="inline-block bg-[#34d399]/10 text-[#34d399] font-bold py-2 px-4 rounded-full text-sm mb-4">
                👋 Meet the Founder
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-[#34d399] to-[#10b981] bg-clip-text text-transparent">Walt</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                I built HouseTabz to solve a real problem: unfair shared expenses and endless reimbursement chasing.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-[#34d399] font-bold">→</span>
                  <p className="text-gray-700">No more one person fronting bills and chasing payments</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#34d399] font-bold">→</span>
                  <p className="text-gray-700">Everyone has self-responsibility over their portion of shared expenses</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#34d399] font-bold">→</span>
                  <p className="text-gray-700">Fair distribution means healthier relationships</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#34d399]/20">
              {/* Value Proposition */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Dawg Mode — Free Forever
                </h2>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="text-[#34d399] font-bold mt-0.5">✓</span>
                    <p className="text-gray-700 font-medium">Free access for you and your entire house</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#34d399] font-bold mt-0.5">✓</span>
                    <p className="text-gray-700 font-medium">Stop fronting bills and chasing payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#34d399] font-bold mt-0.5">✓</span>
                    <p className="text-gray-700 font-medium">Fair splits. Real ownership. Healthier house.</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6 font-medium">
                Join hundreds of houses already using HouseTabz
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full py-3.5 px-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#34d399] focus:bg-white transition-all duration-300 font-medium placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-3.5 px-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#34d399] focus:bg-white transition-all duration-300 font-medium placeholder-gray-400"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={14}
                    inputMode="numeric"
                    className="w-full py-3.5 px-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#34d399] focus:bg-white transition-all duration-300 font-medium placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#34d399] to-[#10b981] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#34d399]/40 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    "Get My Code Now"
                  )}
                </button>
              </form>

              {/* Trust Signals & Micro-copy */}
              <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed">
                We respect your privacy. Your info stays between us. Code arrives in seconds.
              </p>

              {/* Status Messages */}
              {submitStatus && (
                <div className={`mt-6 p-4 rounded-2xl text-center font-medium text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30' 
                    : submitStatus.type === 'duplicate'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-[#34d399]/20 mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">
            Our Mission
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              HouseTabz exists to make shared living <span className="text-[#34d399]">financially effortless</span>, <span className="text-[#34d399]">socially rewarding</span>, and <span className="text-[#34d399]">emotionally healthier</span>.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We remove the friction of shared expenses by giving every housemate true ownership over their portion of the shared expense — no chasing, no fronting, no awkwardness.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              When financial trust is solved, shared living becomes not just cheaper… but more meaningful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#34d399]/10 rounded-full blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-[#34d399]/5 to-transparent rounded-2xl p-8 border border-[#34d399]/20">
                <div className="text-4xl mb-4 text-[#34d399]">
                  <FaWallet />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Finances</h3>
                <p className="text-gray-600">
                  Complete transparency. No fronting, no chasing. Everyone knows exactly what they owe.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#34d399]/10 rounded-full blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-[#34d399]/5 to-transparent rounded-2xl p-8 border border-[#34d399]/20">
                <div className="text-4xl mb-4 text-[#34d399]">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">True Ownership</h3>
                <p className="text-gray-600">
                  Real responsibility over their portion of shared expenses. That's where trust gets built.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#34d399]/10 rounded-full blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-[#34d399]/5 to-transparent rounded-2xl p-8 border border-[#34d399]/20">
                <div className="text-4xl mb-4 text-[#34d399]">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Healthier Living</h3>
                <p className="text-gray-600">
                  When money stops being awkward, shared living becomes meaningful and genuinely better.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg font-semibold text-[#34d399] mt-12 pt-12 border-t border-gray-200">
            "Shared expenses should not contribute to a negative perception of shared living."
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#34d399] to-[#10b981] rounded-3xl p-12 text-white text-center mb-20">
          <h2 className="text-4xl font-black mb-4">Ready to Change How You Live?</h2>
          <p className="text-lg opacity-95 mb-8 max-w-2xl mx-auto">
            Get your Dawg Mode code above and start using HouseTabz for free with your entire house.
          </p>
          <p className="text-lg opacity-90 mb-4">Questions? Reach Walt directly:</p>
          <a 
            href="tel:8063161686" 
            className="inline-block text-white font-bold py-4 px-8 rounded-xl text-2xl hover:opacity-90 transition-all duration-300"
          >
            (806) 316-1686
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MetWaltPage;
