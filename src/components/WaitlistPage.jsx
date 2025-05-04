import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from './Footer';
import Confetti from 'react-confetti';

const WaitlistPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    referrerId: '',
    qrId: ''  // New field for meme QR codes
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isQRCodeVersion, setIsQRCodeVersion] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Extract parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check for either referrerId or qrId (meme QR code)
    const referrerId = params.get('referrerId');
    const qrId = params.get('qrId');
    const city = params.get('city');
    
    // Update form data with URL parameters
    const updates = {};
    
    if (referrerId) {
      console.log('Found referrerId:', referrerId);
      updates.referrerId = referrerId;
    }
    
    if (qrId) {
      console.log('Found qrId:', qrId);
      updates.qrId = qrId;
    }
    
    if (city) {
      console.log('Found city:', city);
      updates.city = city;
      setIsQRCodeVersion(true); // If city is provided, we're in QR code mode
    }
    
    if (Object.keys(updates).length > 0) {
      setFormData(prevData => ({
        ...prevData,
        ...updates
      }));
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    setIsSubmitting(true);
  
    console.log('Form data before submission:', formData);
  
    try {
      const response = await axios.post('http://api.housetabz.com/api/waitlist', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setFeedbackMessage('Yay!! You are officially on the HouseTabz VIP list. Thank you for the support!');
      setShowConfetti(true);
      
      // Reset form but preserve referral data and city if from QR code
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: isQRCodeVersion ? formData.city : '',
        referrerId: formData.referrerId,
        qrId: formData.qrId
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        setFeedbackMessage(error.response.data.message || 'Failed to join the VIP list.');
      } else {
        setFeedbackMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="waitlist-page min-h-screen w-screen bg-[#dff6f0] flex flex-col justify-between pt-20">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#9b5de5', '#ff99c8']}
        />
      )}
      
      <div className="absolute top-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#b2f1dc"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,149.3C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Join the <span className="text-green-500">VIP list</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            HouseTabz is coming soon! Sign up to be the first to know about our launch and exclusive offers.
          </p>
          {isQRCodeVersion && formData.city && (
            <p className="text-md text-green-600 mt-2">
              Thanks for scanning the QR code!
            </p>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 mt-10">
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          {/* Only show the city field if not provided via QR code URL */}
          {!isQRCodeVersion && (
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your city"
                required
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Become VIP'}
          </button>
        </form>

        {feedbackMessage && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold">{feedbackMessage}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WaitlistPage;