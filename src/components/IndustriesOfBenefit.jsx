import React from 'react';
import { motion } from 'framer-motion';

const IndustriesOfBenefit = () => {
  const industries = [
    "Energy",
    "Internet",
    "Streaming",
    "Furniture",
    "Cleaning",
    "Pest Control",
    "Moving",
    "Groceries",
    "Home Security",
    "Subscription Services",
    "Home Maintenance",
    "Appliance Rentals",
  ];

  return (
    <section className="industries-of-benefit bg-[#dff6f0] pt-16 pb-6 px-8 relative overflow-hidden">
      {/* Mint Wave - Adjusted position */}
      <div className="absolute -top-1 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,149.3C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Header - Adjusted margin */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Industries of <span className="text-green-500">Benefit</span>
        </h2>
        <p className="text-lg text-gray-600 mt-3 leading-relaxed">
          Unlock new potential with HouseTabz by supporting shared households across multiple industries.
        </p>
      </motion.div>

      {/* Moving Banner */}
      <div className="marquee-container mt-4 relative z-10">
        <div className="marquee-content flex gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="text-lg md:text-xl font-semibold bg-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 w-40 flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {industry}
            </motion.div>
          ))}
          {industries.map((industry, index) => (
            <div
              key={`repeat-${index}`}
              className="text-lg md:text-xl font-semibold bg-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 w-40 flex justify-center items-center"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
        }

        .marquee-content {
          display: flex;
          animation: scroll 12s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default IndustriesOfBenefit;