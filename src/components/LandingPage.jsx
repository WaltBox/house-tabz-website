// src/components/LandingPage.jsx

import React, { useEffect, useState } from 'react';
import heroImage from '../assets/hero-image.png';

const LandingPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts
  useEffect(() => {
    const existingLink = document.querySelector('link[href*="DM+Sans"]');
    if (!existingLink) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'dm-sans-font-link';
      fontLink.onload = () => setFontLoaded(true);
      document.head.appendChild(fontLink);
    } else {
      setFontLoaded(true);
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center py-16 px-6 pt-32 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-white"></div>
        
        {/* Simple circles - very subtle */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-100/20 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-green-50/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100/15 rounded-full"></div>
      </div>

      <div className="relative flex flex-col items-center text-center max-w-6xl w-full z-10">
          {/* Main Heading */}
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight ${fontLoaded ? '' : 'opacity-90'}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'black',
              fontWeight: 900,
              letterSpacing: '-0.03em'
            }}
          >
            The payment method for shared household expenses
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 max-w-4xl font-medium"
          style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#374151',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}
          >
            HouseTabz allows houses to pay for shared recurring expenses together.
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span 
              className="bg-[#34d399] text-white px-6 py-3 rounded-full text-lg md:text-xl font-bold shadow-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 1s ease-out 0.5s forwards'
              }}
            >
              #nomorefrontingbills
            </span>
            <span 
              className="bg-[#34d399] text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold shadow-xl"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 1s ease-out 1s forwards'
              }}
            >
              #nomore<span style={{ 
                color: '#3D95CE',
                backgroundColor: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                margin: '0 2px',
                fontWeight: 'bold'
              }}>venmo</span>requests
            </span>
          </div>

          <style>{`
            @keyframes fadeInUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Hero Image */}
          <div className="w-full mt-8 flex justify-center">
            <img
              src={heroImage}
              alt="HouseTabz App Preview"
              className="max-w-full h-auto rounded-2xl shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          </div>
      </div>
    </section>
  );
};

export default LandingPage;