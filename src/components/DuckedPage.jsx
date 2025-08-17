import React from 'react';
import { Link } from 'react-router-dom';
import dawgDucks from '../assets/dawg-ducks.png';

const DuckedPage = () => {
  return (
    <>
      {/* Add Montserrat font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
        <div className="w-full mx-auto text-center">
          {/* Main Title */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-800 tracking-tight max-w-4xl mx-auto"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            You just got{' '}
            <span className="text-[#34d399]">Ducked!</span>
          </h1>
          
          {/* Divider line matching brand style */}
          <div className="w-16 h-1 bg-[#34d399] mx-auto mb-6 opacity-80 rounded-full"></div>
          
          {/* Subtitle */}
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 max-w-4xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Stop getting F*cked by your roommates.
          </h2>
          
          {/* Description */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Stop fronting bills and chasing reimbursements via Venmo or Splitwise. 
            There's a better way to handle shared expenses with your housemates.
          </p>

          {/* Value Propositions */}
          <div className="mt-16 mb-16 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Value Prop 1 */}
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 border-2 border-[#34d399]">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Connect Any  Service
                </h3>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Connect any service to HouseTabz and automatically split expenses with your roommates.
                </p>
              </div>

              {/* Value Prop 2 */}
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 border-2 border-[#34d399]">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Claim Ownership
                </h3>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Each roommate claims ownership for their portion of every expense. No confusion, no arguments.
                </p>
              </div>

              {/* Value Prop 3 */}
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 border-2 border-[#34d399]">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Equal Responsibility
                </h3>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Everyone becomes equally responsible for their portion of each expense. Fair and transparent.
                </p>
              </div>

              {/* Value Prop 4 */}
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 border-2 border-[#34d399]">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Pay with HouseTabz
                </h3>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Use the HouseTabz card at partnered merchants and automatically split purchases with your roommates.
                </p>
              </div>
            </div>
          </div>
          
          {/* App Store Download Button */}
          <div className="mt-20 space-y-4 mb-20">
            <a 
              href="#" 
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-75">Download on the</div>
                <div className="text-lg font-bold -mt-1">App Store</div>
              </div>
            </a>
            
            <div 
              className="text-sm text-gray-500 mt-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Join thousands who've stopped getting ducked by their roommates
          </div>

          {/* Bottom Highlight Section */}
          <div className="relative bg-white rounded-3xl p-10 md:p-16 w-[95%] md:w-[85%] lg:w-[80%] mx-auto mt-20 mb-24 shadow-2xl border border-gray-100 overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#34d399]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#34d399]/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <span className="text-gray-500">Fronting bills?</span> <span className="text-red-500 font-semibold">Awkward.</span>
                </div>
                
                <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <span className="text-gray-500">Getting Venmo-requested?</span> <span className="text-red-500 font-semibold">Awkward.</span>
                </div>
                
                <div className="mt-8 pt-6 border-t-2 border-[#34d399]/20">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
                    HouseTabz?
                  </div>
                  
                  <div className="relative inline-block">
                    <span 
                      className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#34d399] to-[#2bb583] bg-clip-text text-transparent"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Zero awkward.
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#34d399] to-[#2bb583] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why the Dawg Duck Section - 85% width on Mac+ */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 md:p-8 lg:p-10 w-[95%] md:w-[85%] mx-auto mt-20 mb-20 relative overflow-hidden">
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#34d399] rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-[#34d399] rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[#34d399] rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Section Header - More Compact */}
              <div className="text-center mb-8">
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #34d399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Why the Dawg Duck?
                </h2>
                
                <div className="w-24 h-1 bg-gradient-to-r from-[#34d399] to-white mx-auto mb-6 rounded-full"></div>
              </div>

              {/* Content Grid - Better proportions */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-stretch">
                {/* Left Side - Explanation */}
                <div className="md:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 min-h-[200px] flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-[#34d399] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 9c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm7 0c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zM12 17.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                        </svg>
                      </div>
                      <h3 
                        className="text-xl md:text-2xl font-bold text-[#34d399]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Because You're Our Dawg!
                      </h3>
                    </div>
                    <p 
                      className="text-white text-base text-left"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 400,
                        lineHeight: '1.6'
                      }}
                    >
                      When you and your roommates use HouseTabz, you unlock exclusive <span className="text-[#34d399] font-semibold">Dawg Mode</span> benefits that make shared living even better.
                    </p>
                  </div>
                </div>

                {/* Center - Dawg Ducks Image */}
                <div className="md:col-span-1 flex justify-center items-center">
                  <div className="relative">
                    {/* Glow effect behind image */}
                    <div className="absolute inset-0 bg-[#34d399]/30 rounded-full blur-3xl transform scale-110"></div>
                    
                    {/* Main image - Much bigger with less padding */}
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 md:p-6 border-2 border-[#34d399]/50">
                      <img
                        src={dawgDucks}
                        alt="Three Dawg Ducks in triangular formation"
                        className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        style={{
                          filter: 'drop-shadow(0 0 30px rgba(52, 211, 153, 0.4))'
                        }}
                      />
                    </div>

                    {/* Floating elements for extra flair */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#34d399] rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full animate-bounce"></div>
                  </div>
                </div>

                {/* Right Side - Benefits */}
                <div className="md:col-span-1">
                  <div className="bg-gradient-to-r from-[#34d399]/20 to-[#34d399]/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-[#34d399]/30 min-h-[200px] flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-[#34d399] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 
                        className="text-lg md:text-xl font-bold text-white"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Dawg Mode Perks
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span 
                          className="text-white text-sm text-left"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            lineHeight: '1.6'
                          }}
                        >
                          <span className="font-semibold">Waived service fees</span> as long as your HSI remains at or above 42
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span 
                          className="text-white text-sm text-left"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            lineHeight: '1.6'
                          }}
                        >
                          <span className="font-semibold">Use HouseTabz completely FREE!</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span 
                          className="text-white text-sm text-left"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            lineHeight: '1.6'
                          }}
                        >
                          Premium features for your entire household
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Email Capture for Dawg Mode */}
              <div className="text-center mt-8 max-w-md mx-auto">
                <p 
                  className="text-lg md:text-xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Get your Dawg Mode code:
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#34d399]/50">
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#34d399] focus:ring-2 focus:ring-[#34d399]/50 transition-all duration-300"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#34d399] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#2bb583] transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Get My Dawg Mode Code
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom Tagline - More Compact */}
              <div className="text-center mt-8">
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-black text-white"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: 'uppercase',
                    textShadow: '0 0 20px rgba(52, 211, 153, 0.5)'
                  }}
                >
                  That's what we call 
                  <span className="text-[#34d399]"> Dawg Mode!</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Follow our socials */}
          <div className="mt-20 text-center">
            <p 
              className="text-lg font-semibold text-gray-700 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Follow our socials
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://instagram.com/housetabz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://linkedin.com/company/housetabz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default DuckedPage;