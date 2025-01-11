import React from 'react';
import { motion } from 'framer-motion';

// Dynamically import all Teddy screenshots
const images = Array.from({ length: 21 }, (_, i) => require(`../assets/screenshots/teddy${i + 1}.png`));

const ProblemSection = () => {
  return (
    <section className="problem-section bg-white py-12 px-8 relative overflow-hidden">
      {/* Inverted Wave */}
      <div className="absolute -top-[10vh] w-full h-[20vh] overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#dff6f0"
            d="M0,128L80,192C160,256,320,320,480,288C640,256,800,160,960,128C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Text Section */}
        <motion.div
          className="text-section md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold text-gray-800">
            No one wants to be like <span className="text-green-500">Teddy</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Shared expenses shouldn’t involve endless texts and awkward reminders.
          </p>
        </motion.div>

        {/* Screenshot Container */}
        <motion.div
          className="screenshot-container md:w-1/2 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[500px]"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={image}
                  alt={`Teddy screenshot ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Mint Wave */}
      

      {/* Inline Styles */}
      <style jsx>{`
        .problem-section {
          overflow-x: hidden; /* Prevent horizontal scrolling */
        }

        .grid {
          width: 100%; /* Ensure grid doesn't exceed container width */
        }

        .grid div {
          width: 100%; /* Ensure no individual image causes overflow */
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
