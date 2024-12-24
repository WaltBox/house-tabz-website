// HowToPartner.js
import React from 'react';
import { motion } from 'framer-motion';

const HowToPartner = () => {
  return (
    <section className="how-to-partner relative w-screen bg-white overflow-hidden pt-10 pb-20">
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

      {/* Rest of HowToPartner content remains the same */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          How to Partner with <span className="text-green-500">HouseTabz</span>
        </h2>
        <p className="text-lg text-gray-600 mt-3 leading-relaxed">
          HouseTabz offers a seamless integration process, enabling your customers to connect with HouseTabz at checkout and manage their shared expenses effortlessly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-16 relative z-10">
        {/* Steps remain the same */}
        {/* Step 1 */}
        <motion.div
          className="flex flex-col items-center text-center bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-3xl text-green-500 mb-4">1️⃣</div>
          <h3 className="text-xl font-bold text-gray-800">Integration</h3>
          <p className="text-gray-600 mt-2">
            With a simple API or plugin, add the 'Pay with HouseTabz' or 'Connect to HouseTabz' option to your checkout process.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="flex flex-col items-center text-center bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-3xl text-green-500 mb-4">2️⃣</div>
          <h3 className="text-xl font-bold text-gray-800">Shop Normally</h3>
          <p className="text-gray-600 mt-2">
            Customers browse and shop your site as they always have—no changes to their experience.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="flex flex-col items-center text-center bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-3xl text-green-500 mb-4">3️⃣</div>
          <h3 className="text-xl font-bold text-gray-800">Connect and Pay</h3>
          <p className="text-gray-600 mt-2">
            If they come from HouseTabz, they simply click 'Pay with HouseTabz' or 'Connect to HouseTabz' at checkout to manage shared expenses seamlessly.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToPartner;