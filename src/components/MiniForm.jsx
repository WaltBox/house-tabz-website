import React, { useState } from 'react';
import axios from 'axios';

const MiniForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'https://api.housetabz.com/api/waitlist',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setFeedbackMessage('You are officially on the VIP list!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
      });
    } catch (error) {
      setFeedbackMessage('Failed to join. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mini-form bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-base" // Changed text-sm to text-base
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-base" // Changed text-sm to text-base
            placeholder="Phone"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-base" // Changed text-sm to text-base
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-base" // Changed text-sm to text-base
            placeholder="City"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md text-base font-semibold hover:bg-green-600 transition duration-300" // Changed text-sm to text-base
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Become a VIP'}
        </button>
      </form>
      {feedbackMessage && (
        <p className="mt-2 text-base text-center text-green-600 font-semibold">
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};

export default MiniForm;
