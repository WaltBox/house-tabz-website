import React, { useState } from 'react';

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

  // Energy Data - unchanged
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

  // Cleaning Data - empty for now
  const cleaningData = [];

  const cleaningTotals = {
    sharedHouseholds: 0,
    annualRevPotential: 0
  };

  // Energy metrics display categories
  const energyMetrics = [
    { name: 'College Students', key: 'collegeStudents' },
    { name: '22-30', key: 'age22To30' },
    { name: '30-40', key: 'age30To40' },
    { name: 'Total Roommates', key: 'totalRoommates' },
    { name: 'Shared Households', key: 'sharedHouseholds' },
    { name: 'Annual Energy Revenue Potential', key: 'energyRevPotential', format: 'currency' }
  ];

  // For mobile view - we'll allow users to switch between market summary and city-specific data
  // Define all state hooks at the top level of the component
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCleaningCity, setSelectedCleaningCity] = useState('All Cities');

  // Filter data based on selected city
  const filteredEnergyData = selectedCity === 'All Cities' 
    ? energyData 
    : energyData.filter(city => city.city === selectedCity);
    
  // Filter data for cleaning
  const filteredCleaningData = selectedCleaningCity === 'All Cities' 
    ? cleaningData 
    : cleaningData.filter(city => city.city === selectedCleaningCity);

  if (selectedIndustry === 'energy') {
    return (
      <div className="industry-info bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-10">
        <div className="mb-6 md:mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 border-l-4 border-emerald-600 pl-4">
            Texas Energy Market Opportunity
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              In Texas's deregulated energy market, HouseTabz offers a unique opportunity to reach shared households.
            </p>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <p className="text-base md:text-lg font-semibold text-emerald-800">
                Roommates spend over {' '}
                <span className="text-2xl md:text-3xl font-bold text-emerald-700">$650 million</span> {' '}
                on energy in just ten of the Texas cities with a deregulated energy market.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile view - city selector */}
        <div className="mb-4 md:hidden">
          <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">
            View Data:
          </label>
          <select 
            id="city-select" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All Cities">Market Summary</option>
            {energyData.map(city => (
              <option key={city.city} value={city.city}>{city.city}</option>
            ))}
          </select>
        </div>
        
        {/* Mobile view: Selected city card or summary */}
        <div className="md:hidden mb-4">
          {selectedCity === 'All Cities' ? (
            // Market Summary Card
            <div className="border rounded-lg p-4 bg-emerald-50 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">MARKET SUMMARY</h3>
              <div className="space-y-2">
                {energyMetrics.map((metric) => (
                  <div key={metric.key} className="flex justify-between items-center py-1 border-b border-emerald-100">
                    <span className="text-sm text-emerald-800">{metric.name}:</span>
                    <span className="text-sm font-medium text-emerald-900">
                      {metric.format === 'currency' 
                        ? formatCurrency(energyTotals[metric.key]) 
                        : formatNumber(energyTotals[metric.key])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Selected City Card
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedCity}</h3>
              <div className="space-y-2">
                {energyMetrics.map((metric) => {
                  const cityData = energyData.find(city => city.city === selectedCity);
                  return (
                    <div key={metric.key} className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{metric.name}:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {metric.format === 'currency' 
                          ? formatCurrency(cityData[metric.key]) 
                          : formatNumber(cityData[metric.key])}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Desktop view: Table */}
        <div className="hidden md:block border rounded-xl overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['City', 'College Students', '22-30', '30-40', 'Total Roommates', 'Shared Households', 'Annual Energy Revenue Potential'].map((header, idx) => (
                  <th 
                    key={idx}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {energyData.map((city, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{city.city}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.collegeStudents)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.age22To30)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.age30To40)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.totalRoommates)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.sharedHouseholds)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatCurrency(city.energyRevPotential)}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-6 py-3.5 text-sm text-emerald-900">TOTAL</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.collegeStudents)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.age22To30)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.age30To40)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.totalRoommates)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.sharedHouseholds)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatCurrency(energyTotals.energyRevPotential)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (selectedIndustry === 'cleaning') {
    return (
      <div className="industry-info text-center p-6 md:p-12 bg-white rounded-2xl shadow-xl mb-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 p-6 md:p-8 rounded-xl border border-blue-100 inline-block">
            <div className="space-y-3">
              <div className="text-blue-600 text-3xl md:text-4xl mb-3"></div>
              <p className="text-base md:text-lg font-semibold text-blue-900">Detailed market data coming soon</p>
              <p className="text-xs md:text-sm text-blue-700">
                Please check back later or contact us for preliminary insights
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selectedIndustry === 'streaming') {
    return (
        <div className="industry-info text-center p-6 md:p-12 bg-white rounded-2xl shadow-xl mb-10">
        <div className="max-w-2xl mx-auto">
      
       
          <div className="bg-purple-50 p-6 md:p-8 rounded-xl border border-purple-100 inline-block">
            <div className="space-y-3">
              <div className="text-purple-600 text-3xl md:text-4xl mb-3"></div>
              <p className="text-base md:text-lg font-semibold text-black">Detailed market data coming soon</p>
              <p className="text-xs md:text-sm text-purple-700">
                Please check back later or contact us for preliminary insights
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selectedIndustry === 'internet') {
    return (
        <div className="industry-info text-center p-6 md:p-12 bg-white rounded-2xl shadow-xl mb-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-cyan-50 p-6 md:p-8 rounded-xl border border-cyan-100 inline-block">
            <div className="space-y-3">

              <p className="text-base md:text-lg font-semibold text-cyan-900">Detailed market data coming soon</p>
              <p className="text-xs md:text-sm text-cyan-700">
                Please check back later or contact us for preliminary insights
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default IndustryInfo;