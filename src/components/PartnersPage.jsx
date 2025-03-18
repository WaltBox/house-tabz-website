import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import logo from '../assets/housetabzlogo.png';
import wink from '../assets/housetabzwink.png';

const PartnersPage = () => {
  // State declarations
  const [selectedIndustry, setSelectedIndustry] = useState('energy');
  // Phase of the logo animation: "snake", "wink", "fall", "rock"
  const [phase, setPhase] = useState("snake");
  const logoContainerRef = useRef(null);

  // Timer effect for phase transitions
  useEffect(() => {
    console.log("PartnersPage mounted, starting timers");
    const timer1 = setTimeout(() => {
      console.log("5 seconds: entering wink phase");
      setPhase("wink");
    }, 1000);
    const timer2 = setTimeout(() => {
      console.log("6.5 seconds: entering fall phase");
      setPhase("fall");
    }, 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Animation end handler
  const handleAnimationEnd = () => {
    if (phase === "fall") {
      console.log("Fall animation ended, switching to rock phase");
      setPhase("rock");
    }
  };

  // Data definitions
  const energyData = [
    { city: 'Houston', collegeStudents: 155092, age22To30: 495532, age30To40: 575000, totalRoommates: 1225624, sharedHouseholds: 135905, energyRevPotential: 244629000, houseTabzRev: 7338870 },
    { city: 'Dallas', collegeStudents: 151206, age22To30: 293304, age30To40: 320000, totalRoommates: 764510, sharedHouseholds: 98292, energyRevPotential: 176925600, houseTabzRev: 5307768 },
    { city: 'Fort Worth', collegeStudents: 44084, age22To30: 92307, age30To40: 108000, totalRoommates: 244391, sharedHouseholds: 30882, energyRevPotential: 55587600, houseTabzRev: 1667628 },
    { city: 'Corpus Christi', collegeStudents: 20769, age22To30: 30000, age30To40: 25000, totalRoommates: 75769, sharedHouseholds: 9691, energyRevPotential: 17443800, houseTabzRev: 523314 },
    { city: 'Abilene', collegeStudents: 6073, age22To30: 18948, age30To40: 18964, totalRoommates: 43985, sharedHouseholds: 6221, energyRevPotential: 11197800, houseTabzRev: 335934 },
    { city: 'Lubbock', collegeStudents: 43173, age22To30: 49301, age30To40: 40000, totalRoommates: 132474, sharedHouseholds: 23255, energyRevPotential: 41859000, houseTabzRev: 1255770 },
    { city: 'McAllen', collegeStudents: 15800, age22To30: 105432, age30To40: 109491, totalRoommates: 230723, sharedHouseholds: 37151, energyRevPotential: 66871800, houseTabzRev: 2006154 },
    { city: 'Waco', collegeStudents: 19310, age22To30: 30000, age30To40: 33500, totalRoommates: 82810, sharedHouseholds: 11293, energyRevPotential: 20327400, houseTabzRev: 609822 },
    { city: 'Galveston', collegeStudents: 22334, age22To30: 20000, age30To40: 22000, totalRoommates: 64334, sharedHouseholds: 10144, energyRevPotential: 18259200, houseTabzRev: 547776 },
    { city: 'North Richland Hills', collegeStudents: 15839, age22To30: 15940, age30To40: 25000, totalRoommates: 56779, sharedHouseholds: 8386, energyRevPotential: 15094800, houseTabzRev: 452844 }
  ];

  const energyTotals = energyData.reduce((acc, curr) => ({
    collegeStudents: (acc.collegeStudents || 0) + curr.collegeStudents,
    age22To30: (acc.age22To30 || 0) + curr.age22To30,
    age30To40: (acc.age30To40 || 0) + curr.age30To40,
    totalRoommates: (acc.totalRoommates || 0) + curr.totalRoommates,
    sharedHouseholds: (acc.sharedHouseholds || 0) + curr.sharedHouseholds,
    energyRevPotential: (acc.energyRevPotential || 0) + curr.energyRevPotential,
    houseTabzRev: (acc.houseTabzRev || 0) + curr.houseTabzRev
  }), {});

  const cleaningData = [
    { city: 'Houston', sharedHouseholds: 135905, avgMonthlySpend: 120, annualRevPotential: 195703200, houseTabzRev: 5871096 },
    { city: 'Dallas', sharedHouseholds: 98292, avgMonthlySpend: 120, annualRevPotential: 141540480, houseTabzRev: 4246214 },
    { city: 'Austin', sharedHouseholds: 87500, avgMonthlySpend: 120, annualRevPotential: 126000000, houseTabzRev: 3780000 },
    { city: 'San Antonio', sharedHouseholds: 65000, avgMonthlySpend: 120, annualRevPotential: 93600000, houseTabzRev: 2808000 }
  ];

  const cleaningTotals = cleaningData.reduce((acc, curr) => ({
    sharedHouseholds: (acc.sharedHouseholds || 0) + curr.sharedHouseholds,
    annualRevPotential: (acc.annualRevPotential || 0) + curr.annualRevPotential,
    houseTabzRev: (acc.houseTabzRev || 0) + curr.houseTabzRev
  }), {});

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

  // Determine which image to display:
  // During "wink" phase, use the wink image; otherwise, show the normal logo.
  const displayedImage = phase === "wink" ? wink : logo;

  return (
    <div className="partners-page min-h-screen bg-gradient-to-br from-[#dff6f0] to-white pt-28 pb-20" style={{ position: 'relative' }}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Business Value Proposition Hero Section */}
        <div className="problem-statement bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                HouseTabz: The Payment Method for Shared Household Expenses
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                HouseTabz functions similarly to Affirm by letting each user pay directly for shared services.
                No single roommate bears the full cost—payments are split seamlessly through our platform.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Eliminate the “who’s paying?” confusion and streamline your shared expense experience.
                With HouseTabz, every payment is handled efficiently, improving satisfaction and retention.
              </p>
              <div className="inline-block bg-gray-100 px-5 py-3 rounded-lg border-l-4 border-[#34d399]">
                <p className="font-medium text-gray-800">
                  Your competitors are already tapping into this $650M+ market. Can you afford to miss out?
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#065f46] to-[#34d399] p-8 md:p-12 text-white flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Partner Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Consumer-Oriented Sales Channel:</strong> Gain access to users specifically seeking shared billing solutions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Improved Retention:</strong> Eliminate payment disputes that drive customers to competitors
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Brand Protection:</strong> Transform negative billing experiences into positive associations with your service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Market <span className="text-[#34d399]">Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Join HouseTabz to access a growing market of shared households. Our platform connects service providers like you
            directly with groups of roommates who are actively seeking a unified way to pay for bills.
          </p>
        </div>

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

        <div className="industry-info bg-white rounded-xl shadow-lg p-6 mb-10">
          {selectedIndustry === 'energy' && (
            <>
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
              <div className="overflow-x-auto">
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
            </>
          )}

          {selectedIndustry === 'cleaning' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Cleaning Services Market Opportunity</h2>
                <p className="text-gray-600 mb-5">
                  Shared households represent a significant opportunity for cleaning service providers.
                  HouseTabz offers a platform to reach these households efficiently, reducing the friction of split payments and helping establish recurring service arrangements.
                </p>
              </div>
              <div className="overflow-x-auto">
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
            </>
          )}

          {selectedIndustry === 'streaming' && (
            <div className="text-center py-8">
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
          )}

          {selectedIndustry === 'internet' && (
            <div className="text-center py-8">
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
          )}
        </div>

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

        <div className="integration-section bg-gradient-to-r from-[#dff6f0] to-white rounded-xl shadow-xl p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Seamless Integration in Minutes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              With HouseTabz, integration is as simple as adding our payment button to your checkout.
              Offer your users a direct, streamlined way to pay for shared household expenses—just like Affirm makes financing simple.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-10">
            <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#34d399] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">1</div>
                <h3 className="text-2xl font-semibold text-gray-800">Integrate the SDK</h3>
              </div>
              <p className="text-gray-600">
                Simply add our HouseTabz payment button to your checkout. It only takes one line of code to get started.
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-[#e6f7ef] text-[#34d399] rounded-full px-4 py-1 text-sm font-semibold">
                  One Line of Code
                </span>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#34d399] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">2</div>
                <h3 className="text-2xl font-semibold text-gray-800">Real-Time Notifications</h3>
              </div>
              <p className="text-gray-600">
                Get instant alerts when roommates approve payments. Continue processing orders with your existing flow.
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-[#e6f7ef] text-[#34d399] rounded-full px-4 py-1 text-sm font-semibold">
                  Stay Informed
                </span>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#34d399] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">3</div>
                <h3 className="text-2xl font-semibold text-gray-800">Automate Recurring Billing</h3>
              </div>
              <p className="text-gray-600">
                Set up recurring billing seamlessly. Simply notify us when a new bill is ready, and we'll take care of the rest.
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-[#e6f7ef] text-[#34d399] rounded-full px-4 py-1 text-sm font-semibold">
                  Automatic Collection
                </span>
              </div>
            </div>
          </div>
          <div className="text-center p-8 bg-[#e6f7ef] rounded-xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Developer's Quick Guide</h3>
            <p className="text-gray-600 mb-4">
              "Just add the HouseTabz button, listen for real-time payment approvals, and let our system handle new bills automatically."
            </p>
            <p className="text-gray-700 font-medium">
              Integration is quick and easy—most partners are up and running in less than a day with our dedicated support.
            </p>
          </div>
          <div className="text-center mt-6">
            <button className="bg-[#34d399] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#065f46] transition-all duration-300 text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Logo Animation */}
      <div
        ref={logoContainerRef}
        className={`floating-logo-container ${phase}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="floating-logo">
          <img src={displayedImage} alt="HouseTabz Logo" className="logo" />
        </div>
      </div>
      
      {/* Styles */}
      <style>{`
        @media (max-width: 768px) {
          .industry-selector button {
            font-size: 0.85rem;
            padding: 0.5rem 0.75rem;
          }
          table {
            font-size: 0.75rem;
          }
          th, td {
            padding: 0.5rem 0.25rem !important;
          }
        }

        .floating-logo-container {
          position: absolute;
          top: 4%;
          left: 75%;
          width: 100px;
          height: 100px;
          z-index: 1000;
          transform-origin: center;
        }

        /* Snake animation phase */
        .floating-logo-container.snake {
          animation: 
            snakeMove 12s ease-in-out infinite,
            float 3s ease-in-out infinite;
        }

        /* Wink animation phase */
        .floating-logo-container.wink {
          animation: winkPulse 0.8s ease-out;
        }

        /* Fall animation phase */
        .floating-logo-container.fall {
          animation: fallDrop 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }

        /* Rock animation phase */
        .floating-logo-container.rock {
          animation: rockMotion 2.2s ease-in-out infinite;
        }

        .floating-logo {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .logo {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: 
            transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28),
            filter 0.3s ease;
        }

        @keyframes snakeMove {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(100px, 50px) rotate(8deg); }
          50% { transform: translate(200px, -30px) rotate(-8deg); }
          75% { transform: translate(300px, 40px) rotate(5deg); }
          100% { transform: translate(400px, 0) rotate(0deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes winkPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(-5deg); filter: drop-shadow(0 0 12px rgba(52, 211, 153, 0.4)); }
          100% { transform: scale(1); }
        }

        @keyframes fallDrop {
          0% { top: 15%; transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(200px) rotate(180deg); }
          60% { transform: translateY(calc(100vh - 180px)) rotate(360deg); }
          70% { transform: translateY(calc(100vh - 200px)) rotate(370deg); }
          80% { transform: translateY(calc(100vh - 180px)) rotate(360deg); }
          100% { top: calc(100% - 120px); transform: translateY(0) rotate(360deg); }
        }

        @keyframes rockMotion {
          0%, 100% { 
            transform: 
              rotate(0deg)
              translateY(0);
          }
          25% { 
            transform: 
              rotate(8deg)
              translateY(-8px)
              scale(1.05);
          }
          75% { 
            transform: 
              rotate(-8deg)
              translateY(-8px)
              scale(1.05);
          }
        }
      `}</style>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;
