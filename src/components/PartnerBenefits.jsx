import React from 'react';

const PartnerBenefits = () => {
  return (
    <div className="partner-benefits grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="benefit-card bg-white rounded-lg shadow-md p-6 border-t-4 border-[#34d399]">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Reduced Acquisition Costs</h3>
        <p className="text-gray-600">
          Access a targeted audience of shared households through our platform, significantly reducing your customer acquisition costs while increasing conversion rates.
        </p>
      </div>
      <div className="benefit-card bg-white rounded-lg shadow-md p-6 border-t-4 border-[#34d399]">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Increased Customer Retention</h3>
        <p className="text-gray-600">
          Our streamlined payment process increases customer satisfaction and reduces churn by eliminating payment disputes among roommates.
        </p>
      </div>
      <div className="benefit-card bg-white rounded-lg shadow-md p-6 border-t-4 border-[#34d399]">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Simplified Integration</h3>
        <p className="text-gray-600">
          HouseTabz offers easy integration with your existing systems, providing a seamless experience for both you and your customers.
        </p>
      </div>
    </div>
  );
};

export default PartnerBenefits;
