import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import waltImage from '../assets/walt.png';
import Footer from './Footer';

const MetWaltPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in both fields!' });
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
          phone: formData.phone.trim(),
          source: 'met-walt'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: `You're on the list, ${formData.firstName}! 🎉` 
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
      <div className="min-h-screen bg-white pt-24 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-20 w-32 h-32 bg-[#34d399]/6 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#34d399]/8 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#34d399]/4 rounded-full"></div>
        </div>

        <div className="max-w-md w-full text-center relative z-10 mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
                alt="HouseTabz logo"
                className="h-20 w-auto"
              />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              You're in, {formData.firstName}! 
            </h2>
            <p className="text-lg text-gray-600 font-medium mb-8">
              We'll text you how to get setup! Thank you so much!!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-black text-[#34d399] mb-1">$25,000+</div>
              <div className="text-sm text-gray-600 font-medium">Bills paid using HouseTabz</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-[#34d399] mb-1">0</div>
              <div className="text-sm text-gray-600 font-medium">Venmo requests needed</div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-[#34d399] text-white px-4 py-2 rounded-full text-sm font-semibold">
              #nomorefrontingbills
            </span>
            <span className="bg-[#34d399] text-white px-4 py-2 rounded-full text-sm font-semibold">
              #nomorevenmorequests
            </span>
          </div>

          {/* Back to site */}
       
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#34d399]/6 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#34d399]/8 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#34d399]/4 rounded-full"></div>
      </div>

      <div className="max-w-md w-full relative z-10 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
              alt="HouseTabz logo"
              className="h-20 w-auto"
            />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Hey! Meet Walt
          </h2>
          <p className="text-lg text-gray-600 font-medium mb-6">
            Enter your info so you can use HouseTabz!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Questions? Text or call me: (806) 316-1686
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="What's your first name?"
              value={formData.firstName}
              onChange={handleChange}
              maxLength={50}
              className="w-full py-4 px-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-300 font-medium placeholder-gray-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-4 px-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-300 font-medium placeholder-gray-500"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#34d399] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#10b981] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding you...
              </span>
            ) : (
              "Join Walt's List"
            )}
          </button>
        </form>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-xl text-center font-medium ${
            submitStatus.type === 'success' 
              ? 'bg-[#34d399]/10 text-[#34d399]' 
              : submitStatus.type === 'duplicate'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-red-50 text-red-600'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Walt's social links - icons above the photo */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <a 
            href="https://www.linkedin.com/in/walt-boxwell-04996919b/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#34d399] hover:text-[#0077B5] transition-colors duration-300"
            aria-label="Walt's LinkedIn"
          >
            <FaLinkedin className="text-3xl" />
          </a>
          <a 
            href="https://instagram.com/walt_boxwell" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#34d399] hover:text-[#E4405F] transition-colors duration-300"
            aria-label="Walt's Instagram"
          >
            <FaInstagram className="text-3xl" />
          </a>
        </div>

        {/* Walt's animated photo - bigger and more prominent */}
        <div className="mb-12">
          <img
            src={waltImage}
            alt="Walt waving with both hands"
            className="w-64 h-64 mx-auto object-contain"
          />
        </div>

        {/* Walt's Personal Message */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Hi! I'm Walt, the founder of HouseTabz.
          </h3>
          
          <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
            <p>
              My vision for HouseTabz is to bring shared financial responsibility to all shared household expenses.
            </p>
            
            <p>
              I believe many people choose to live alone because they crave independence. However, living alone is a net negative and leads to isolation and loneliness. With HouseTabz, my mission is to bring the same sense of personal responsibility, while making it easier and more rewarding to live together.
            </p>
            
            <p className="font-semibold text-[#34d399] text-center pt-4 border-t border-gray-100">
              Soon, sharing expenses will not contribute to a negative perception of shared living.
            </p>
          </div>
        </div>

    
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MetWaltPage;
