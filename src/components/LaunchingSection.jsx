import React from 'react';
import { motion } from 'framer-motion';
import launchTexas from '../assets/launchtexas1.png';
import MiniForm from './MiniForm'; // Import the MiniForm component

const LaunchingSection = () => {
  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="launching-section bg-white py-16 px-8 relative overflow-hidden">
      {/* Top Mint Wave */}
      <div className="absolute top-0 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            fill="#dff6f0"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,117.3C672,96,768,96,864,112C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Text Section */}
        <motion.div
          className="text-section md:w-1/2 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          variants={textVariants}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            HouseTabz is anticipating availability in
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-green-500 mt-2">
            Dallas, Houston, and Lubbock!
          </h3>
          <p className="text-xl text-gray-600 mt-6 leading-relaxed">
            Exciting times are ahead! Stay tuned as we bring our revolutionary shared expense platform to select Texas cities.
          </p>
          <div className="note bg-green-100 text-green-700 mt-8 p-4 rounded-lg shadow-lg text-lg">
            <strong>Join the VIP list</strong> to be the first to hear about our upcoming giveaways and exclusive offers!
          </div>

          {/* Mini Form */}
          <div className="mt-8">
            <MiniForm />
          </div>
        </motion.div>

        {/* Launch Image Section */}
        <motion.div
          className="image-section md:w-1/2 flex justify-center items-center relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          variants={imageVariants}
        >
          <img
            src={launchTexas}
            alt="Texas Launch"
            className="w-full h-auto object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-green-200 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-green-300 rounded-full blur-xl opacity-75"></div>
      <div className="absolute bottom-32 right-28 w-20 h-20 bg-green-400 rounded-full blur-2xl opacity-50"></div>
      <div className="absolute top-40 left-20 w-14 h-14 bg-green-300 rounded-full blur-md"></div>
    </section>
  );
};

export default LaunchingSection;
