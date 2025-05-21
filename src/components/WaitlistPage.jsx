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

  // Dynamic spots counter - between 20-40 spots
  const [spotsLeft, setSpotsLeft] = useState(Math.floor(Math.random() * 21) + 20);
  const [timerStarted, setTimerStarted] = useState(false);

  // Start dynamic counter animation once page loads
  useEffect(() => {
    if (!timerStarted) {
      setTimerStarted(true);
      const timer = setInterval(() => {
        // 20% chance to decrease spots (less frequent for larger numbers)
        if (Math.random() < 0.2 && spotsLeft > 1) {
          setSpotsLeft(prev => prev - 1);
        }
      }, 10000); // Check every 10 seconds
      
      return () => clearInterval(timer);
    }
  }, [timerStarted, spotsLeft]);

  // Extract parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const referrerId = params.get('referrerId');
    const qrId = params.get('qrId');
    const city = params.get('city');
    
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
      setIsQRCodeVersion(true);
    }
    
    if (Object.keys(updates).length > 0) {
      setFormData(prevData => ({
        ...prevData,
        ...updates
      }));
    }
    
    // Update window size for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  
      setFeedbackMessage("Congrats! You're on the VIP list. Walt will reach out soon with details to start using Dawg Mode.");
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
            Join the <span className="text-[#34d399]">VIP list</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            HouseTabz is coming soon! Sign up to be the first to know about our launch.
          </p>
          
          {/* Limited Spots Indicator */}
          <motion.div
            className="my-6 inline-flex items-center bg-gray-50 rounded-full px-4 sm:px-6 py-2 sm:py-3 border-2 border-[#34d399] shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500 mr-2 sm:mr-3 flex-shrink-0"
              animate={{ 
                scale: [1, 1.3, 1],
                backgroundColor: ['#ef4444', '#f87171', '#ef4444']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
            <span className="text-gray-800 font-bold text-sm sm:text-lg whitespace-normal text-center">
              <motion.span 
                key={spotsLeft}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-red-500 font-extrabold"
              >
                ONLY {spotsLeft}
              </motion.span> spots left for <span className="text-[#34d399]">Dawg Mode</span>
            </span>
          </motion.div>
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
          
          <motion.button
            type="submit"
            className="w-full bg-[#34d399] text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative flex items-center justify-center">
              {isSubmitting ? 'Submitting...' : 'Join the VIP list'}
              {!isSubmitting && (
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </span>
          </motion.button>
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