import React from 'react';
import { motion } from 'framer-motion';
import houseCard from '../assets/housecard.png'; // Import the card image
import Footer from './Footer';

const HowItWorks = () => {
  return (
    <section>
      <section className="how-it-works bg-gradient-to-b from-[#dff6f0] to-white py-16 px-8">
        <div className="max-w-7xl mx-auto mt-20">
          {/* Section 1: Relatable Concept */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Explanation */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Imagine a <span className="text-green-500">Shared Bank Account</span> for Your House
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Picture this: a single debit card shared by you and your roommates, designed to handle all your shared
                expenses—like rent, utilities, and subscriptions. Each roommate is equally responsible for adding their
                portion of the funds.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-4">
                No more chasing payments or keeping track of who owes what. With <strong>HouseTabz</strong>, managing
                shared finances becomes effortless, fair, and totally stress-free.
              </p>
            </motion.div>

            {/* Creative Card Display */}
            <motion.div
              className="lg:w-1/2 flex justify-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="card-wrapper">
                <img
                  src={houseCard}
                  alt="HouseTabz Card"
                  className="house-card"
                />
              </div>
            </motion.div>
          </div>

          {/* Section 2: How It Works */}
          <div>
            <motion.h2
              className="text-2xl md:text-4xl font-extrabold text-gray-800 text-center mb-12"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              How <span className="text-green-500">HouseTabz</span> Works
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Step-by-Step Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Step 1:</strong> Roommates browse the <span className="text-green-500">HouseTabz Marketplace</span> to
                  shop for partnered services like utilities, streaming subscriptions, or cleaning services.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Step 2:</strong> At checkout, they select either <span className="text-green-500">"Pay with HouseTabz"</span>
                  or <span className="text-green-500">"Connect to HouseTabz."</span> This sends a request to all roommates, asking
                  for approval of the service.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  <strong>Step 3:</strong> Once all roommates approve, each is responsible for contributing their portion
                  of the expense. HouseTabz handles the rest—paying the service and keeping your house drama-free.
                </p>
              </motion.div>

              {/* Call-to-Action */}
              <motion.div
                className="flex flex-col justify-center items-center bg-green-100 p-6 md:p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
                  Ready to Simplify Your Shared Expenses?
                </h3>
                <p className="text-gray-600 mb-6 text-center text-sm md:text-base">
                  Join the waitlist today and be among the first to experience a revolutionary way to manage your house’s
                  finances.
                </p>
                <a
                  href="/waitlist"
                  className="bg-green-500 text-white py-2 px-6 md:py-3 md:px-8 rounded-lg font-medium hover:bg-green-600 transition duration-300"
                >
                  Join the Waitlist
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Styles */}
      <style jsx>{`
        .house-card {
          width: 80%; /* Scale down card size */
          max-width: 300px;
          transform: rotate(-10deg); /* Rotate for aesthetic display */
       
       
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .house-card:hover {
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .card-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          margin-top: 2rem; /* For mobile spacing */
        }

        @media (max-width: 768px) {
          .card-wrapper {
            margin-top: 2rem;
          }

          .house-card {
            width: 70%; /* Smaller size for mobile */
            max-width: 240px;
            transform: rotate(-5deg); /* Subtle rotation on mobile */
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
