import React from 'react';
import { motion } from 'framer-motion';

const ProblemStatement = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden">
      {/* "Remove Signup Friction" Section - Standalone heading */}
      <motion.div 
        className="mb-10 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black pb-2 font-montserrat leading-tight">
          Remove Signup Friction <br />
          & Increase <span className="text-green-500">Conversions</span> and <span className="text-green-500">Retention</span>
        </h2>
        <div className="h-1 w-60 bg-[#34d399] mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* Main content card - with higher z-index so logos appear behind it */}
      <motion.div 
        className="problem-statement bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col">
          {/* Content Container */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Content - Enhanced with Visual Elements */}
            <div className="p-6 md:p-8 lg:w-1/2 bg-gradient-to-br from-gray-50 to-white">
              <motion.div 
                className="space-y-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-block p-2 bg-emerald-50 rounded-lg mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                <p className="text-gray-800 text-base leading-relaxed">
                  <span className="font-semibold text-emerald-600 text-lg">Shared expenses slow down signups.</span> When roommates consider signing up for services, no one wants to put their card down and chase payments later. This hesitation leads to abandoned checkouts or downgraded plans.
                </p>
                
                <div className="flex items-center py-3">
                  <div className="h-px bg-gray-200 flex-grow"></div>
                  <div className="px-4">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="h-px bg-gray-200 flex-grow"></div>
                </div>
                
                <p className="text-gray-800 text-base leading-relaxed">
                  Even after sign-up, fronting payments and tracking down reimbursements creates frustration—frustration that isn't just directed at roommates, but at the service itself. This negative experience leads to lower retention and churn, as users associate payment friction with the brand.
                </p>
                
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg my-5">
                  <p className="text-gray-800 text-base leading-relaxed">
                    HouseTabz eliminates this friction by allowing households to pay as a group, ensuring every roommate commits upfront—leading to higher conversions, more signups, and long-term customer retention for our partners.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Right Benefits - Enhanced with Animation and Design */}
            <div className="p-6 md:p-8 lg:w-1/2 bg-white border-t lg:border-t-0 lg:border-l border-gray-100">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-1.5 bg-emerald-100 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  Why Partner with HouseTabz?
                </h3>
                
                <ul className="space-y-5">
                  {[
                    {
                      title: "Higher Conversions",
                      content: "Remove signup hesitation and close more sales by enabling instant group payments.",
                      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    },
                    {
                      title: "Stronger Customer Retention",
                      content: "Avoid negative brand perception caused by payment disputes between roommates.",
                      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    },
                    {
                      title: "Lower Churn",
                      content: "Ensure predictable revenue by eliminating billing issues that lead to cancellations.",
                      icon: "M13 10V3L4 14h7v7l9-11h-7z"
                    },
                    {
                      title: "Seamless Integration",
                      content: "Offer HouseTabz as a payment method with minimal setup, creating a frictionless checkout experience.",
                      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    }
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 mt-1 mr-4">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <svg 
                            className="w-4 h-4 text-emerald-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.content}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
            
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemStatement;