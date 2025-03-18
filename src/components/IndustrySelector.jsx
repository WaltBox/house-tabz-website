import React from 'react';

const IndustrySelector = ({ selectedIndustry, setSelectedIndustry }) => {
  return (
    <div className="industry-selector flex justify-center mb-10">
      <div className="bg-white rounded-full shadow-md inline-flex p-1">
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedIndustry === 'energy' ? 'bg-[#34d399] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedIndustry('energy')}
        >
          Energy
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedIndustry === 'cleaning' ? 'bg-[#34d399] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedIndustry('cleaning')}
        >
          Cleaning
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedIndustry === 'streaming' ? 'bg-[#34d399] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedIndustry('streaming')}
        >
          Streaming
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedIndustry === 'internet' ? 'bg-[#34d399] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedIndustry('internet')}
        >
          Internet
        </button>
      </div>
    </div>
  );
};

export default IndustrySelector;
