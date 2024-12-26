import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    businessEmail: '',
    phoneNumber: '',
    businessWebsite: '',
    city: '',
    state: '',
    country: '',
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
      // Replace with your backend API endpoint
      const response = await axios.post('http://housetabz-back-env.eba-k7z4g8fa.us-east-1.elasticbeanstalk.com/api/partner-forms', formData);
      setSuccessMessage('Thank you! A member of the HouseTabz team will reach out to you shortly.');
      setFormData({
        businessEmail: '',
        phoneNumber: '',
        businessWebsite: '',
        city: '',
        state: '',
        country: '',
      });
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="partner-form bg-white py-16 px-8 relative overflow-hidden">
      {/* Mint Wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#dff6f0"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,149.3C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Partner with <span className="text-green-500">HouseTabz</span>
        </h2>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          Fill out this form to learn more about our seamless integration process and how we can work together.
        </p>
      </motion.div>

      {/* Form Section */}
      <form
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6 relative z-10"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'businessEmail', label: 'Business Email', type: 'email', placeholder: 'example@business.com' },
            { id: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: '+1 234 567 890' },
            { id: 'businessWebsite', label: 'Business Website', type: 'url', placeholder: 'https://yourbusiness.com' },
            { id: 'city', label: 'City', type: 'text', placeholder: 'City' },
            { id: 'state', label: 'State', type: 'text', placeholder: 'State' },
            { id: 'country', label: 'Country', type: 'text', placeholder: 'Country' },
          ].map(({ id, label, type, placeholder }) => (
            <div className="flex flex-col" key={id}>
              <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 hover:shadow-md'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {successMessage && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            {errorMessage}
          </div>
        )}
      </form>

      {/* Subtle Background Element */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            fill="#34d399"
            fillOpacity="0.4"
            d="M0,256L48,224C96,192,192,128,288,96C384,64,480,64,576,96C672,128,768,192,864,224C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PartnerForm;
