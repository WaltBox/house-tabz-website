import React, { useState } from 'react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState({});

  const faqData = [
    {
      question: "Who's name is the account under?",
      answer: "The account is registered under the primary account holder's name provided during signup. However, HouseTabz ensures that financial responsibility is shared across all roommates, so no single person is solely on the hook for payments."
    },
    {
        question: "What happens when someone misses a payment?",
        answer: "HouseTabz fronts payments based on the house’s Status Index (HSI)—a house-wide credit score that determines how much coverage the household receives."
      }
  ];
  

  const toggleFAQ = (index) => {
    setOpenFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="faq-section bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-2xl p-8 mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="divide-y divide-gray-300">
        {faqData.map((faq, index) => (
          <div key={index} className="py-4">
            <button 
              className="w-full text-left focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
              <svg 
                className={`h-6 w-6 transition-transform duration-300 ${openFAQ[index] ? 'rotate-180 text-green-600' : 'text-gray-500'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFAQ[index] && (
              <p className="mt-4 text-gray-700 text-lg pl-2 border-l-2 border-green-600">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
