import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import dawgMode from '../assets/dawgmode.png';

const DawgMode = () => {
  return (
    <section className="dawg-mode-section py-16 px-8 relative overflow-hidden">
      {/* Background gradient - #dff6f0 at top to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#dff6f0] to-white z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left: Text Content */}
          <div className="text-content lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Introducing <span className="text-[#34d399]">Dawg Mode</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-700 mb-10 leading-relaxed"
              initial={{ y: -15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              First 100 houses unlock Dawg Mode - completely free access to HouseTabz as long as your HSI remains above 42.
            </motion.p>
            
            {/* EXTREME ATTENTION-GRABBING CTA BUTTON */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/vip" 
                className="relative group block"
              >
                {/* Outer rings animation */}
                <motion.div 
                  className="absolute -inset-4 rounded-full opacity-75"
                  style={{ 
                    background: "radial-gradient(circle, rgba(52,211,153,1) 0%, rgba(124,58,237,0.5) 100%)" 
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 0.4, 0.7],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.div>

                {/* Secondary pulse */}
                <motion.div 
                  className="absolute -inset-2 bg-white rounded-full opacity-20 blur-md"
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                ></motion.div>

                {/* Fire effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-[#34d399] to-purple-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-200 animate-pulse"></div>

                {/* Main button */}
                <motion.div 
                  className="relative flex items-center justify-between px-8 py-4 bg-[#34d399] rounded-full leading-none font-extrabold text-white transition-all duration-300 border-2 border-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Text with glowing effect */}
                  <motion.span 
                    className="mr-3 text-xl relative z-10"
                    animate={{ textShadow: ["0 0 5px #ffffff", "0 0 15px #ffffff", "0 0 5px #ffffff"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    JOIN VIP LIST
                  </motion.span>

                  {/* Animated arrow icon */}
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-[#34d399]"
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </motion.div>

                  {/* Sparkles animation for extreme emphasis */}
                  <div className="absolute -top-2 -right-3">
                    <motion.svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.8, 1],
                        rotate: [0, 15, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.2
                      }}
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" />
                    </motion.svg>
                  </div>
                  <div className="absolute -bottom-2 -left-3">
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.8, 1],
                        rotate: [0, -15, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.7
                      }}
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" />
                    </motion.svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Right: Image */}
          <motion.div 
            className="image-content lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={dawgMode}
              alt="Dawg Mode Preview"
              className="max-w-full object-contain"
              initial={{ scale: 0.9, rotate: -2 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DawgMode;