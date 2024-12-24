import React from 'react';
import { motion } from 'framer-motion';

// Dynamically import all Teddy screenshots
const images = Array.from({ length: 21 }, (_, i) => require(`../assets/screenshots/teddy${i + 1}.png`));

const ProblemSection = () => {
  return (
    <section className="problem-section bg-white py-12 px-8 relative overflow-hidden">
      {/* Inverted Wave */}
      <div className="absolute -top-[5vh] w-full h-[10vh]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#34d399" /* Same green as the wave in the landing page */
            d="M0,64L60,96C120,128,240,192,360,213.3C480,235,600,213,720,186.7C840,160,960,128,1080,149.3C1200,171,1320,245,1380,277.3L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative">
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
    </section>
  );
};

export default ProblemSection;
