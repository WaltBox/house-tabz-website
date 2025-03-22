import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phoneNumber: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://api.housetabz.com/api/partner-forms', formData);
      setSuccessMessage('Thanks! We will be in touch soon.');
      setFormData({
        businessName: '',
        contactName: '',
        phoneNumber: '',
        email: '',
      });
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="partner-form py-12 px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold text-gray-800">
            Interested in <span className="text-green-500">Learning More</span>?
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Tell us how to contact you and we will reach out soon!
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your business name"
                  className="w-full p-3 border border-gray-300 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full p-3 border border-gray-300 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full p-3 border border-gray-300 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </motion.button>

            {successMessage && (
              <motion.div 
                className="mt-4 p-3 bg-green-50 border border-green-100 rounded-xl text-center text-green-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {successMessage}
              </motion.div>
            )}
            
            {errorMessage && (
              <motion.div 
                className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-center text-red-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerForm;