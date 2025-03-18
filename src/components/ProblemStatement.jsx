import React from 'react';

const ProblemStatement = () => {
  return (
    <div className="problem-statement bg-white rounded-xl shadow-lg hover:shadow-md transition-shadow duration-200 mx-4 my-8 overflow-hidden">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-500">
          <h2 className="text-2xl font-bold text-white leading-snug">
            Remove Signup Friction & Keep Customers Happy
          </h2>
        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="p-6 md:p-8 md:w-1/2 bg-gray-50">
            <div className="space-y-4">
              <p className="text-gray-800 text-base leading-relaxed">
                <span className="font-semibold text-emerald-600">Shared expenses slow down signups.</span> When roommates consider signing up for services, no one wants to put their card down and chase payments later. This hesitation leads to abandoned checkouts or downgraded plans.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                Even after sign-up, fronting payments and tracking down reimbursements creates frustration—frustration that isn’t just directed at roommates, but at the service itself. This negative experience leads to lower retention and churn, as users associate payment friction with the brand.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                HouseTabz eliminates this friction by allowing households to pay as a group, ensuring every roommate commits upfront—leading to higher conversions, more signups, and long-term customer retention for our partners.
              </p>
            </div>
          </div>

          {/* Right Benefits */}
          <div className="p-6 md:p-8 md:w-1/2 bg-white border-t md:border-t-0 md:border-l border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg 
                className="w-5 h-5 mr-2 text-emerald-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Why Partner with HouseTabz?
            </h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Higher Conversions",
                  content: "Remove signup hesitation and close more sales by enabling instant group payments."
                },
                {
                  title: "Stronger Customer Retention",
                  content: "Avoid negative brand perception caused by payment disputes between roommates."
                },
                {
                  title: "Lower Churn",
                  content: "Ensure predictable revenue by eliminating billing issues that lead to cancellations."
                },
                {
                  title: "Seamless Integration",
                  content: "Offer HouseTabz as a payment method with minimal setup, creating a frictionless checkout experience."
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;
