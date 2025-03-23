import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dashboard from '../assets/dashboard.png';
import billtakeover from '../assets/billTakeover2.png';
import houseview from '../assets/houseview.png';

const SolutionPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = {
    dashboard: {
      image: dashboard,
      description:
        'Pay all your household bills in one place. Each roommate is equally financially responsible for their portion — no fronting, no chasing payments.',
    },
    billtakeover: {
      image: billtakeover,
      description:
        'Already paying a shared bill? Submit the details — once everyone accepts ownership, the responsibility is split evenly across the house.',
    },
    houseview: {
      image: houseview,
      description:
        'Every house has an HSI (House Status Index) — basically a shared credit score. Pay on time to boost your HSI and unlock more fronting power.',
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
Mobile App Coming Soon!
</h2>
<p className="text-lg text-gray-600 mt-4 leading-relaxed">
  HouseTabz is coming to the App store in the fall of 2025!
</p>
<p className="text-lg text-gray-600 mt-4 leading-relaxed">
  Submit your bills, and once everyone accepts, you're all equally responsible. Pay together, track everything, and unlock rewards for paying on time.
</p>


          {/* Tabs */}
          <div className="tabs mt-8 flex gap-4 justify-center lg:justify-start">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-lg font-bold text-sm ${
                  activeTab === tab
                    ? 'bg-[#34d399] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} 
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
