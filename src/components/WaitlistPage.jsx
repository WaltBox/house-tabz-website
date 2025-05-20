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
    qrId: ''
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isQRCodeVersion, setIsQRCodeVersion] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Dynamic spots counter
  const [spotsLeft, setSpotsLeft] = useState(Math.floor(Math.random() * 10) + 3); // Between 3-12 spots
  const [timerStarted, setTimerStarted] = useState(false);

  // Start dynamic counter animation once page loads
  useEffect(() => {
    if (!timerStarted) {
      setTimerStarted(true);
      const timer = setInterval(() => {
        // 40% chance to decrease spots
        if (Math.random() < 0.4 && spotsLeft > 1) {
          setSpotsLeft(prev => prev - 1);
        }
      }, 7000); // Check every 7 seconds
      
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
  
      setFeedbackMessage('🎉 CONGRATS! You\'ve secured Dawg Mode access! Welcome to the HouseTabz VIP list!');
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="waitlist-page min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#dff6f0] to-white flex flex-col justify-between pt-20 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-green-100 mix-blend-multiply blur-3xl opacity-70"
          animate={{ 
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-100 mix-blend-multiply blur-3xl opacity-70"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          colors={['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#9b5de5', '#ff99c8']}
        />
      )}

      <div className="flex-grow flex flex-col items-center justify-center px-6 pt-10 pb-20 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-2">
            Join the <span className="text-[#34d399]">VIP list</span>
          </h2>
          
          {/* Limited Spots Indicator */}
          <motion.div
            className="my-6 inline-flex items-center bg-gray-50 rounded-full px-6 py-3 border-2 border-[#34d399] shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="h-4 w-4 rounded-full bg-red-500 mr-3"
              animate={{ 
                scale: [1, 1.3, 1],
                backgroundColor: ['#ef4444', '#f87171', '#ef4444']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
            <span className="text-gray-800 font-bold text-lg">
              <motion.span 
                key={spotsLeft}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-red-500 font-extrabold"
              >
                ONLY {spotsLeft}
              </motion.span> spots left for <span className="text-[#34d399]">Dawg Mode</span> access!
            </span>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            First 100 houses get <span className="text-[#34d399] font-bold">completely FREE</span> access 
            to HouseTabz as long as your HSI stays above 42.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Secure Your Spot</h3>
              <motion.div 
                className="flex items-center bg-[#34d399] text-white px-3 py-1 rounded-full text-sm font-bold"
                animate={{ 
                  scale: [1, 1.05, 1],
                  backgroundColor: ['#34d399', '#10b981', '#34d399']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Form
              </motion.div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <motion.div className="mb-5" variants={itemVariants}>
                <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34d399] focus:border-[#34d399] focus:outline-none transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-5" variants={itemVariants}>
                <label className="block text-gray-800 font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34d399] focus:border-[#34d399] focus:outline-none transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-5" variants={itemVariants}>
                <label className="block text-gray-800 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34d399] focus:border-[#34d399] focus:outline-none transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </motion.div>
              
              {/* Only show the city field if not provided via QR code URL */}
              {!isQRCodeVersion && (
                <motion.div className="mb-5" variants={itemVariants}>
                  <label className="block text-gray-800 font-bold mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34d399] focus:border-[#34d399] focus:outline-none transition-all duration-200"
                    placeholder="Enter your city"
                    required
                  />
                </motion.div>
              )}
              
              <motion.button
                type="submit"
                className="w-full mt-2 bg-[#34d399] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#10b981] transition-all duration-300 relative overflow-hidden group"
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? 'Securing Your Spot...' : 'UNLOCK DAWG MODE'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
            </form>
          </motion.div>
          
          {/* Benefits cards */}
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.6 }}
          >
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#34d399]"
              variants={itemVariants}
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-[#34d399] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold text-gray-800">Totally Free</h4>
              </div>
              <p className="text-gray-600 text-sm">No fees as long as your HSI stays above 42</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#34d399]"
              variants={itemVariants}
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-[#34d399] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <h4 className="font-bold text-gray-800">App Priority</h4>
              </div>
              <p className="text-gray-600 text-sm">First access when we launch</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#34d399]"
              variants={itemVariants}
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-[#34d399] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold text-gray-800">VIP Perks</h4>
              </div>
              <p className="text-gray-600 text-sm">Exclusive features & rewards</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {feedbackMessage && (
          <motion.div 
            className="mt-8 py-4 px-6 bg-[#34d399] bg-opacity-20 rounded-xl text-center border border-[#34d399]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
          >
            <p className="text-[#10b981] font-bold text-lg">{feedbackMessage}</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WaitlistPage;