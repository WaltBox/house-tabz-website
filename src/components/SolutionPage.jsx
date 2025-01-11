import React, { useState } from 'react';
import { motion } from 'framer-motion';
import marketplace from '../assets/marketplace.png';
import company from '../assets/company.png';
import house from '../assets/house.png';

const SolutionPage = () => {
  const [activeTab, setActiveTab] = useState('house');

  const tabs = {
    house: {
      image: house,
      description:
        "Track and manage all your household expenses with ease. Stay on top of who has paid and enjoy complete transparency.",
    },
    marketplace: {
      image: marketplace,
      description:
        "Discover services tailored to your address. Compare options, and pick the best providers for your household needs.",
    },
    company: {
      image: company,
      description:
        "Dive into detailed service plans and connect to providers through an intuitive in-app experience.",
    },
  };

  return (
    <section className="solution-page bg-mint py-16 px-8 relative">
      {/* Top White Wave */}
      <div className="absolute top-0 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,117.3C672,96,768,96,864,112C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left: Text Content */}
        <motion.div
          className="text-section lg:w-1/3 text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800">
            Mobile App <span className="text-green-500">Coming Soon</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            The HouseTabz mobile app will bring all the features you need to manage shared expenses right to your fingertips.
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            From tracking bills to discovering services and making payments, everything will be just a tap away. Stay tuned for the launch!
          </p>

          {/* Tabs */}
          <div className="tabs mt-8 flex gap-4 justify-center lg:justify-start">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-lg font-bold text-sm ${
                  activeTab === tab
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} View
              </button>
            ))}
          </div>
        </motion.div>

        {/* Middle: Phone */}
        <motion.div
          className="phone-section lg:w-1/3 flex justify-center items-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-[300px] h-[600px] rounded-lg overflow-hidden">
            <img
              src={tabs[activeTab].image}
              alt={`${activeTab} preview`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </motion.div>

        {/* Right: Bubble Note */}
        <motion.div
          className="note-section lg:w-1/3 flex justify-center lg:justify-start relative"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bubble bg-white text-gray-800 text-base p-6 rounded-lg shadow-md max-w-sm">
            {tabs[activeTab].description}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-mint {
          background-color: #dff6f0;
        }

        .bubble {
          background: #ffffff;
          color: #2d3748;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default SolutionPage;
