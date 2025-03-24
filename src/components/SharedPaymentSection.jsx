import React from 'react';
import { CreditCard, Users, Wallet, ShoppingCart, FileText, Shield, ChevronRight } from 'lucide-react';

const SharedPaymentSection = () => {
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
      <div className="absolute inset-0 opacity-10 z-0 hidden md:block">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
            The First Payment Method for Shared Expenses
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            Stop Fronting Costs and chasing Venmo requests.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          HouseTabz makes shared expenses truly shared—every roommate accepts ownership and pays their part, no chasing, no fronting.
          </p>
        </div>

        {/* Problem/Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Problem */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
            <div className="p-6 bg-red-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full mr-3">
                  <span className="text-xl text-red-500">✗</span>
                </span>
                The Problem
              </h3>
            </div>
            <div className="p-6">
            <p className="text-gray-600">
                One person always gets stuck putting their card down for shared expenses and chasing others for payment. It's awkward, unfair, and a hassle. Shared expenses should come with <span className="underline text-emerald-600 font-bold">shared</span> Financial responsibility.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100">
            <div className="p-6 bg-emerald-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full mr-3">
                  <span className="text-xl text-emerald-500">✓</span>
                </span>
                The Solution
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                HouseTabz makes everyone equally responsible from day one. No more fronting costs or chasing payments. Everyone pays their fair share automatically for truly shared expenses.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10">How It Works</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop the Marketplace */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Shop the Marketplace</h4>
                <p className="text-center text-gray-600 text-sm">
                  Find services that accept HouseTabz, click "Pay with HouseTabz" at checkout, and each person confirms their portion.
                </p>
              </div>
              <div className="bg-emerald-50 p-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span>Expense Total</span>
                    <span className="font-semibold">$120</span>
                  </div>
                  <button className="w-full py-2 bg-emerald-500 text-white rounded-lg text-sm">
                    Pay with HouseTabz
                  </button>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    3 people × $40 each
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Bills */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Generate a virtual card</h4>
                <p className="text-center text-gray-600 text-sm">
                  Already paying for a shared service? Enter the details and HouseTabz creates a virtual card you can attach to the account. Each roommate claims ownership and is responsible for funding their portion.
                </p>
              </div>
              <div className="bg-emerald-50 p-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white" style={{aspectRatio: '1.586/1'}}>
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-emerald-50">Internet Bill</p>
                        <p className="text-base font-bold mt-1">$89.99/mo</p>
                      </div>
                      <CreditCard className="w-6 h-6 text-white opacity-80" />
                    </div>
                    
                    <div className="mt-auto text-xs text-right">
                      Funded equally by everyone
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* House Score */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">House Status Index</h4>
                <p className="text-center text-gray-600 text-sm">
                  Your household builds a reliability score that determines how much HouseTabz will cover if a payment is late.
                </p>
              </div>
              <div className="bg-emerald-50 p-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none" 
                          stroke="#E2E8F0" 
                          strokeWidth="3"
                          strokeDasharray="100, 100" 
                        />
                        <path 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none" 
                          stroke="#10B981" 
                          strokeWidth="3"
                          strokeDasharray="72, 100" 
                        />
                        <text 
                          x="18" 
                          y="20.5" 
                          textAnchor="middle" 
                          fill="#10B981" 
                          fontSize="10" 
                          fontWeight="bold"
                        >
                          72
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-800 font-medium mb-1">
                  House Status Index
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    HouseTabz will cover up to <span className="font-semibold text-emerald-600">$175</span> in late payments to protect your shared bills
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="/vip" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md"
          >
            Join VIP List
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
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