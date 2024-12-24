import React from 'react';
import { motion } from 'framer-motion';

const PartnerForm = () => {
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
        onSubmit={(e) => e.preventDefault()} // Prevent actual form submission for now
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="businessEmail"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              placeholder="example@business.com"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="+1 234 567 890"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="businessWebsite"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Business Website
            </label>
            <input
              type="url"
              id="businessWebsite"
              placeholder="https://yourbusiness.com"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="State"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 hover:shadow-md transition duration-300"
        >
          Submit
        </button>
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
