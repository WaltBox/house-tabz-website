import React from 'react';
import { motion } from 'framer-motion';
import houseCard from '../assets/housecard.png'; // Import the card image
import Footer from './Footer';
const HowItWorks = () => {
  return (
    <section>
    <section className="how-it-works bg-gradient-to-b from-[#dff6f0] to-white py-16 px-8">
      {/* Add a top margin or padding to account for the navbar */}
      <div className="max-w-7xl mx-auto mt-20">
        {/* Section 1: Relatable Concept */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Card Image */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src={houseCard}
              alt="HouseTabz Card"
              className="w-full max-w-sm"
              style={{ background: 'none' }} // Remove any default background
            />
          </motion.div>

          {/* Explanation */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
              Imagine a <span className="text-green-500">Shared Bank Account</span> for Your House
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Picture this: a single debit card shared by you and your roommates, designed to handle all your shared
              expenses—like rent, utilities, and subscriptions. Each roommate is equally responsible for adding their
              portion of the funds. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              No more chasing payments or keeping track of who owes what. With <strong>HouseTabz</strong>, managing
              shared finances becomes effortless, fair, and totally stress-free.
            </p>
          </motion.div>
        </div>

        {/* Section 2: How It Works */}
        <div>
          <motion.h2
            className="text-4xl font-extrabold text-gray-800 text-center mb-12"
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
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                <strong>Step 1:</strong> Roommates browse the <span className="text-green-500">HouseTabz Marketplace</span> to
                shop for partnered services like utilities, streaming subscriptions, or cleaning services.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                <strong>Step 2:</strong> At checkout, they select either <span className="text-green-500">"Pay with HouseTabz"</span> 
                or <span className="text-green-500">"Connect to HouseTabz."</span> This sends a request to all roommates, asking 
                for approval of the service.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Step 3:</strong> Once all roommates approve, each is responsible for contributing their portion
                of the expense. HouseTabz handles the rest—paying the service and keeping your house drama-free.
              </p>
            </motion.div>

            {/* Call-to-Action */}
            <motion.div
              className="flex flex-col justify-center items-center bg-green-100 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Simplify Your Shared Expenses?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Join the waitlist today and be among the first to experience a revolutionary way to manage your house’s
                finances.
              </p>
              <a
                href="/waitlist"
                className="bg-green-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-600 transition duration-300"
              >
                Join the Waitlist
              </a>
            </motion.div>
          </div>
        </div>
        
      </div>
     
    </section>
    <Footer />
    </section>
  );

};

export default HowItWorks;
