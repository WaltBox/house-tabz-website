import React, { useState } from 'react';

const IndustryInfo = ({ selectedIndustry }) => {
  // Formatting helpers
  const formatNumber = (num) => num.toLocaleString('en-US');
  const formatCurrency = (num) => {
    // First format the number with commas, then add decimal places
    return `${formatNumber(Math.floor(num))}.00`;
  };

  // Energy Data - simplified
  const energyData = [
    { city: 'Houston', totalRoommates: 1225624, sharedHouseholds: 135905, energyRevPotential: 244629000 },
    { city: 'Dallas', totalRoommates: 764510, sharedHouseholds: 98292, energyRevPotential: 176925600 },
    { city: 'Fort Worth', totalRoommates: 244391, sharedHouseholds: 30882, energyRevPotential: 55587600 },
    { city: 'Corpus Christi', totalRoommates: 75769, sharedHouseholds: 9691, energyRevPotential: 17443800 },
    { city: 'Abilene', totalRoommates: 43985, sharedHouseholds: 6221, energyRevPotential: 11197800 },
    { city: 'Lubbock', totalRoommates: 132474, sharedHouseholds: 23255, energyRevPotential: 41859000 },
    { city: 'McAllen', totalRoommates: 230723, sharedHouseholds: 37151, energyRevPotential: 66871800 },
    { city: 'Waco', totalRoommates: 82810, sharedHouseholds: 11293, energyRevPotential: 20327400 },
    { city: 'Galveston', totalRoommates: 64334, sharedHouseholds: 10144, energyRevPotential: 18259200 },
    { city: 'North Richland Hills', totalRoommates: 56779, sharedHouseholds: 8386, energyRevPotential: 15094800 }
  ];

  const energyTotals = energyData.reduce((acc, curr) => ({
    totalRoommates: acc.totalRoommates + curr.totalRoommates,
    sharedHouseholds: acc.sharedHouseholds + curr.sharedHouseholds,
    energyRevPotential: acc.energyRevPotential + curr.energyRevPotential
  }), { totalRoommates: 0, sharedHouseholds: 0, energyRevPotential: 0 });

  const [selectedCity, setSelectedCity] = useState('All Cities');
  const filteredEnergyData = selectedCity === 'All Cities' ? energyData : energyData.filter(city => city.city === selectedCity);

  if (selectedIndustry === 'energy') {
    return (
      <div className="industry-info bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-emerald-600 pl-4 mb-4">
          Texas Energy Market Opportunity
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          In Texas's deregulated energy market, HouseTabz offers a unique opportunity to reach shared households.
        </p>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-4">
          <p className="text-lg font-semibold text-emerald-800">
            Roommates spend over <span className="text-2xl font-bold text-emerald-700">${formatNumber(650000000)}</span> on energy in these ten Texas cities.
          </p>
        </div>
        {/* City Selector for Mobile */}
        <div className="mb-4 md:hidden">
          <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">View Data:</label>
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
        {/* Display Data Table */}
        <div className="border rounded-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['City', 'Total Roommates', 'Shared Households', 'Annual Energy Revenue Potential'].map((header, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEnergyData.map((city, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{city.city}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.totalRoommates)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatNumber(city.sharedHouseholds)}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700 text-right">{formatCurrency(city.energyRevPotential)}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-6 py-3.5 text-sm text-emerald-900">TOTAL</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.totalRoommates)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatNumber(energyTotals.sharedHouseholds)}</td>
                <td className="px-6 py-3.5 text-sm text-emerald-900 text-right">{formatCurrency(energyTotals.energyRevPotential)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
};

export default IndustryInfo;