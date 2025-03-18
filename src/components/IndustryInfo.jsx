import React from 'react';

const IndustryInfo = ({ selectedIndustry }) => {
  // Formatting helpers
  const formatNumber = (num, decimalPlaces = 0) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
  };

  const formatCurrency = (num) => {
    return `$${formatNumber(num, 2)}`;
  };

  // Energy Data
  const energyData = [
    { city: 'Houston', collegeStudents: 155092, age22To30: 495532, age30To40: 575000, totalRoommates: 1225624, sharedHouseholds: 135905, energyRevPotential: 244629000 },
    { city: 'Dallas', collegeStudents: 151206, age22To30: 293304, age30To40: 320000, totalRoommates: 764510, sharedHouseholds: 98292, energyRevPotential: 176925600 },
    { city: 'Fort Worth', collegeStudents: 44084, age22To30: 92307, age30To40: 108000, totalRoommates: 244391, sharedHouseholds: 30882, energyRevPotential: 55587600 },
    { city: 'Corpus Christi', collegeStudents: 20769, age22To30: 30000, age30To40: 25000, totalRoommates: 75769, sharedHouseholds: 9691, energyRevPotential: 17443800 },
    { city: 'Abilene', collegeStudents: 6073, age22To30: 18948, age30To40: 18964, totalRoommates: 43985, sharedHouseholds: 6221, energyRevPotential: 11197800 },
    { city: 'Lubbock', collegeStudents: 43173, age22To30: 49301, age30To40: 40000, totalRoommates: 132474, sharedHouseholds: 23255, energyRevPotential: 41859000 },
    { city: 'McAllen', collegeStudents: 15800, age22To30: 105432, age30To40: 109491, totalRoommates: 230723, sharedHouseholds: 37151, energyRevPotential: 66871800 },
    { city: 'Waco', collegeStudents: 19310, age22To30: 30000, age30To40: 33500, totalRoommates: 82810, sharedHouseholds: 11293, energyRevPotential: 20327400 },
    { city: 'Galveston', collegeStudents: 22334, age22To30: 20000, age30To40: 22000, totalRoommates: 64334, sharedHouseholds: 10144, energyRevPotential: 18259200 },
    { city: 'North Richland Hills', collegeStudents: 15839, age22To30: 15940, age30To40: 25000, totalRoommates: 56779, sharedHouseholds: 8386, energyRevPotential: 15094800 }
  ];

  const energyTotals = energyData.reduce((acc, curr) => ({
    collegeStudents: (acc.collegeStudents || 0) + curr.collegeStudents,
    age22To30: (acc.age22To30 || 0) + curr.age22To30,
    age30To40: (acc.age30To40 || 0) + curr.age30To40,
    totalRoommates: (acc.totalRoommates || 0) + curr.totalRoommates,
    sharedHouseholds: (acc.sharedHouseholds || 0) + curr.sharedHouseholds,
    energyRevPotential: (acc.energyRevPotential || 0) + curr.energyRevPotential
  }), {});

  // Cleaning Data
  const cleaningData = [
    { city: 'Houston', sharedHouseholds: 135905, avgMonthlySpend: 120, annualRevPotential: 195703200 },
    { city: 'Dallas', sharedHouseholds: 98292, avgMonthlySpend: 120, annualRevPotential: 141540480 },
    { city: 'Austin', sharedHouseholds: 87500, avgMonthlySpend: 120, annualRevPotential: 126000000 },
    { city: 'San Antonio', sharedHouseholds: 65000, avgMonthlySpend: 120, annualRevPotential: 93600000 }
  ];

  const cleaningTotals = cleaningData.reduce((acc, curr) => ({
    sharedHouseholds: (acc.sharedHouseholds || 0) + curr.sharedHouseholds,
    annualRevPotential: (acc.annualRevPotential || 0) + curr.annualRevPotential
  }), {});

  if (selectedIndustry === 'energy') {
    return (
      <div className="industry-info bg-white rounded-xl shadow-lg p-6 mb-10 overflow-x-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Texas Energy Market Opportunity</h2>
          <p className="text-gray-600 mb-3">
            In Texas's deregulated energy market, HouseTabz offers a unique opportunity to reach shared households.
            Our platform simplifies the billing process for roommates and helps energy providers reduce customer acquisition costs while increasing retention.
          </p>
          <p className="text-lg font-semibold text-[#065f46] mb-4 bg-[#e6f7ef] p-3 rounded-md inline-block">
            The data below represents over <span className="text-2xl font-bold">$650 million</span> in annual energy revenue potential across just ten Texas cities!
          </p>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[#f8f9fa] border-b">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">City</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">College Students</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">22-30</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">30-40</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Roommates</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Shared Households</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Annual Energy Revenue Potential</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {energyData.map((city, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 text-sm font-medium text-gray-900">{city.city}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.collegeStudents)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.age22To30)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.age30To40)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.totalRoommates)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.sharedHouseholds)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatCurrency(city.energyRevPotential)}</td>
              </tr>
            ))}
            <tr className="bg-[#e6f7ef] font-bold">
              <td className="py-2 px-4 text-sm font-bold text-gray-900">TOTAL</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(energyTotals.collegeStudents)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(energyTotals.age22To30)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(energyTotals.age30To40)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(energyTotals.totalRoommates)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(energyTotals.sharedHouseholds)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatCurrency(energyTotals.energyRevPotential)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (selectedIndustry === 'cleaning') {
    return (
      <div className="industry-info bg-white rounded-xl shadow-lg p-6 mb-10 overflow-x-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Cleaning Services Market Opportunity</h2>
          <p className="text-gray-600 mb-5">
            Shared households represent a significant opportunity for cleaning service providers.
            HouseTabz offers a platform to reach these households efficiently, reducing the friction of split payments and helping establish recurring service arrangements.
          </p>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[#f8f9fa] border-b">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">City</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Shared Households</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Avg Monthly Spend</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Annual Rev Potential</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cleaningData.map((city, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 text-sm font-medium text-gray-900">{city.city}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatNumber(city.sharedHouseholds)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatCurrency(city.avgMonthlySpend)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{formatCurrency(city.annualRevPotential)}</td>
              </tr>
            ))}
            <tr className="bg-[#e6f7ef] font-bold">
              <td className="py-2 px-4 text-sm font-bold text-gray-900">TOTAL</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatNumber(cleaningTotals.sharedHouseholds)}</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">-</td>
              <td className="py-2 px-4 text-sm font-bold text-gray-900">{formatCurrency(cleaningTotals.annualRevPotential)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (selectedIndustry === 'streaming') {
    return (
      <div className="industry-info text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Streaming Services Market Opportunity</h2>
        <p className="text-gray-600 mb-6">
          Streaming services are commonly shared among roommates, but account sharing can be challenging to manage.
          HouseTabz provides a solution that helps streaming services increase subscription revenue while offering a seamless experience for shared households.
        </p>
        <div className="coming-soon p-8 bg-gray-100 rounded-lg inline-block">
          <p className="text-lg font-medium text-gray-700">Detailed market data coming soon</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check back later or contact us for preliminary insights
          </p>
        </div>
      </div>
    );
  } else if (selectedIndustry === 'internet') {
    return (
      <div className="industry-info text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Internet Services Market Opportunity</h2>
        <p className="text-gray-600 mb-6">
          Internet services are an essential utility in shared households, but billing disputes can lead to customer churn.
          HouseTabz offers internet service providers a way to increase customer satisfaction and retention by simplifying the payment process for roommates.
        </p>
        <div className="coming-soon p-8 bg-gray-100 rounded-lg inline-block">
          <p className="text-lg font-medium text-gray-700">Detailed market data coming soon</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check back later or contact us for preliminary insights
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default IndustryInfo;
