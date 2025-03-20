import React from 'react';

const IntegrationSection = () => {
  return (
    <div className="integration-section bg-gradient-to-r from-[#dff6f0] to-white rounded-xl shadow-xl p-10 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Seamless Integration
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          With HouseTabz, integration is as simple as adding our payment button to your checkout.
          Offer your users a direct, streamlined way to pay for shared household expenses.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-10">
        <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-[#34d399] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">1</div>
            <h3 className="text-2xl font-semibold text-gray-800">Integrate the SDK</h3>
          </div>
          <p className="text-gray-600">
            Simply add our HouseTabz payment button to your checkout. 
          </p>
          <div className="mt-4 text-center">
            <span className="inline-block bg-[#e6f7ef] text-[#34d399] rounded-full px-4 py-1 text-sm font-semibold">
              A few lines of code
            </span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
  <div className="flex items-center mb-4">
    <div className="bg-[#34d399] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">2</div>
    <h3 className="text-2xl font-semibold text-gray-800">Payment Authorization</h3>
  </div>
  <p className="text-gray-600">
    We notify you of authorized funds just like any other payment method—no changes to your existing process.
  </p>
  <div className="mt-4 text-center">
    <span className="inline-block bg-[#e6f7ef] text-[#34d399] rounded-full px-4 py-1 text-sm font-semibold">
      Works Just Like Card Payments
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
      {/* <div className="text-left mt-6">
        <button className="bg-[#34d399] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#065f46] transition-all duration-300 text-lg font-medium">
          Learn More
        </button>
      </div> */}
    </div>
  );
};

export default IntegrationSection;
