import React, { useState, useEffect } from 'react';
import { ChevronRight, CreditCard, Users, Wallet, ArrowRightLeft } from 'lucide-react';

const SharedPaymentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "Seamless Expense Sharing",
      description: "No more awkward conversations. HouseTabz makes shared expenses hassle-free."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Roommate Consent Built-In",
      description: "Whenever you connect to HouseTabz, all roommates provide consent, before the transaction is completed."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Financial Equality",
      description: "Every roommate is only responsible for their share—no more fronting expenses and waiting for reimbursements."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "One-Click Payments",
      description: "Use 'Connect to HouseTabz' at checkout and settle shared expenses with just one click."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const section = document.querySelector('.shared-payment-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="shared-payment-section relative bg-white py-24 overflow-hidden">
      {/* Mint Wave at Top */}
      <div className="absolute -top-[10vh] w-full h-[20vh] overflow-hidden z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#dff6f0"
            d="M0,128L80,192C160,256,320,320,480,288C640,256,800,160,960,128C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                Simplified Shared Payments
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                The Payment Method for Roommates
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                HouseTabz eliminates the need for one roommate to put their card down for shared expenses. With 'Pay with HouseTabz' or 'Connect to HouseTabz,' expenses are added to your HouseTabz account—where each roommate is equally responsible to pay their share.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    activeFeature === index ? 'bg-white shadow-lg scale-105' : 'bg-green-50'
                  }`}
                >
                  <div className="flex flex-col space-y-4">
                    {/* Icon Section */}
                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto">
                      {feature.icon}
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
              Get Started
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Integration Display Section */}
          <div className={`relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative w-full aspect-[4/3]">
              {/* Checkout Integration Demo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Checkout</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-gray-900 font-semibold">$120.00</span>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">$40.00 per roommate</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                      Pay with HouseTabz
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-200 rounded-full opacity-20" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-200 rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mint Wave */}
      <div className="absolute bottom-0 w-full h-[20vh] overflow-hidden z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#dff6f0"
            d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,144C672,128,768,96,864,74.7C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default SharedPaymentSection;
