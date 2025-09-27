// src/components/LandingPage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';

const LandingPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

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
      {/* Background Orbs All Around Screen - MAXIMUM ORBS! */}
      <div className="absolute inset-0 opacity-25">
        {/* Top Row - Dense */}
        <div className="absolute top-5 left-5 w-16 h-16 bg-[#34d399] rounded-full blur-lg opacity-40"></div>
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#34d399] rounded-full blur-xl opacity-35"></div>
        <div className="absolute top-3 left-20 w-12 h-12 bg-[#059669] rounded-full blur-md opacity-45"></div>
        <div className="absolute top-16 left-1/4 w-32 h-32 bg-[#10b981] rounded-full blur-3xl opacity-18"></div>
        <div className="absolute top-6 left-1/3 w-18 h-18 bg-[#34d399] rounded-full blur-xl opacity-22"></div>
        <div className="absolute top-8 left-1/2 w-20 h-20 bg-[#059669] rounded-full blur-xl opacity-22"></div>
        <div className="absolute top-14 left-3/5 w-14 h-14 bg-[#10b981] rounded-full blur-lg opacity-26"></div>
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-[#34d399] rounded-full blur-2xl opacity-16"></div>
        <div className="absolute top-4 right-1/3 w-22 h-22 bg-[#059669] rounded-full blur-xl opacity-20"></div>
        <div className="absolute top-12 right-10 w-26 h-26 bg-[#10b981] rounded-full blur-2xl opacity-20"></div>
        <div className="absolute top-7 right-5 w-15 h-15 bg-[#34d399] rounded-full blur-lg opacity-24"></div>
        
        {/* Upper Middle - More Dense */}
        <div className="absolute top-1/5 left-2 w-20 h-20 bg-[#10b981] rounded-full blur-xl opacity-19"></div>
        <div className="absolute top-1/4 left-5 w-18 h-18 bg-[#059669] rounded-full blur-xl opacity-25"></div>
        <div className="absolute top-1/6 left-16 w-25 h-25 bg-[#34d399] rounded-full blur-2xl opacity-17"></div>
        <div className="absolute top-1/3 left-1/5 w-30 h-30 bg-[#10b981] rounded-full blur-2xl opacity-14"></div>
        <div className="absolute top-1/3 left-1/3 w-36 h-36 bg-[#34d399] rounded-full blur-3xl opacity-12"></div>
        <div className="absolute top-1/5 left-2/5 w-16 h-16 bg-[#059669] rounded-full blur-xl opacity-23"></div>
        <div className="absolute top-1/4 left-3/5 w-28 h-28 bg-[#10b981] rounded-full blur-2xl opacity-16"></div>
        <div className="absolute top-1/6 right-1/3 w-19 h-19 bg-[#34d399] rounded-full blur-xl opacity-21"></div>
        <div className="absolute top-1/4 right-5 w-22 h-22 bg-[#10b981] rounded-full blur-xl opacity-24"></div>
        <div className="absolute top-1/5 right-2 w-24 h-24 bg-[#059669] rounded-full blur-2xl opacity-18"></div>
        
        {/* Center Row - Maximum Density */}
        <div className="absolute top-2/5 left-1 w-32 h-32 bg-[#34d399] rounded-full blur-3xl opacity-13"></div>
        <div className="absolute top-1/2 left-2 w-30 h-30 bg-[#34d399] rounded-full blur-2xl opacity-14"></div>
        <div className="absolute top-3/7 left-12 w-17 h-17 bg-[#10b981] rounded-full blur-xl opacity-22"></div>
        <div className="absolute top-1/2 left-1/4 w-26 h-26 bg-[#059669] rounded-full blur-2xl opacity-19"></div>
        <div className="absolute top-2/5 left-2/5 w-21 h-21 bg-[#34d399] rounded-full blur-xl opacity-20"></div>
        <div className="absolute top-1/2 left-3/5 w-33 h-33 bg-[#10b981] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-3/7 right-1/4 w-23 h-23 bg-[#059669] rounded-full blur-xl opacity-21"></div>
        <div className="absolute top-1/2 right-2 w-28 h-28 bg-[#059669] rounded-full blur-2xl opacity-18"></div>
        <div className="absolute top-2/5 right-1 w-29 h-29 bg-[#34d399] rounded-full blur-2xl opacity-16"></div>
        
        {/* Lower Middle - Dense */}
        <div className="absolute bottom-2/5 left-3 w-27 h-27 bg-[#10b981] rounded-full blur-2xl opacity-17"></div>
        <div className="absolute bottom-1/3 left-8 w-24 h-24 bg-[#10b981] rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-2/5 left-20 w-19 h-19 bg-[#059669] rounded-full blur-xl opacity-23"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-[#34d399] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-2/5 left-1/2 w-22 h-22 bg-[#10b981] rounded-full blur-xl opacity-19"></div>
        <div className="absolute bottom-1/3 left-3/5 w-25 h-25 bg-[#34d399] rounded-full blur-2xl opacity-18"></div>
        <div className="absolute bottom-2/5 right-1/3 w-31 h-31 bg-[#059669] rounded-full blur-2xl opacity-14"></div>
        <div className="absolute bottom-1/3 right-8 w-20 h-20 bg-[#059669] rounded-full blur-xl opacity-23"></div>
        <div className="absolute bottom-2/5 right-3 w-26 h-26 bg-[#10b981] rounded-full blur-2xl opacity-17"></div>
        
        {/* Bottom Row - Super Dense */}
        <div className="absolute bottom-5 left-3 w-18 h-18 bg-[#059669] rounded-full blur-xl opacity-24"></div>
        <div className="absolute bottom-10 left-10 w-26 h-26 bg-[#34d399] rounded-full blur-2xl opacity-17"></div>
        <div className="absolute bottom-7 left-20 w-14 h-14 bg-[#10b981] rounded-full blur-lg opacity-25"></div>
        <div className="absolute bottom-16 left-1/4 w-38 h-38 bg-[#10b981] rounded-full blur-3xl opacity-13"></div>
        <div className="absolute bottom-6 left-1/3 w-20 h-20 bg-[#059669] rounded-full blur-xl opacity-22"></div>
        <div className="absolute bottom-8 left-1/2 w-22 h-22 bg-[#059669] rounded-full blur-xl opacity-21"></div>
        <div className="absolute bottom-12 left-3/5 w-16 h-16 bg-[#34d399] rounded-full blur-xl opacity-23"></div>
        <div className="absolute bottom-20 right-1/4 w-30 h-30 bg-[#34d399] rounded-full blur-2xl opacity-16"></div>
        <div className="absolute bottom-8 right-1/3 w-24 h-24 bg-[#10b981] rounded-full blur-2xl opacity-18"></div>
        <div className="absolute bottom-12 right-10 w-24 h-24 bg-[#10b981] rounded-full blur-2xl opacity-19"></div>
        <div className="absolute bottom-5 right-5 w-17 h-17 bg-[#059669] rounded-full blur-xl opacity-24"></div>
        
        {/* Extra scattered orbs - EVERYWHERE */}
        <div className="absolute top-1/8 left-1/6 w-13 h-13 bg-[#34d399] rounded-full blur-lg opacity-26"></div>
        <div className="absolute top-1/5 left-2/3 w-16 h-16 bg-[#059669] rounded-full blur-xl opacity-26"></div>
        <div className="absolute top-1/7 left-4/5 w-21 h-21 bg-[#10b981] rounded-full blur-xl opacity-20"></div>
        <div className="absolute top-3/8 left-1/8 w-35 h-35 bg-[#34d399] rounded-full blur-3xl opacity-11"></div>
        <div className="absolute top-2/3 left-1/5 w-34 h-34 bg-[#34d399] rounded-full blur-3xl opacity-11"></div>
        <div className="absolute top-3/4 left-2/3 w-23 h-23 bg-[#059669] rounded-full blur-2xl opacity-19"></div>
        <div className="absolute top-5/8 right-1/8 w-27 h-27 bg-[#10b981] rounded-full blur-2xl opacity-16"></div>
        <div className="absolute bottom-1/8 left-1/8 w-15 h-15 bg-[#059669] rounded-full blur-lg opacity-25"></div>
        <div className="absolute bottom-1/5 right-2/3 w-18 h-18 bg-[#10b981] rounded-full blur-xl opacity-24"></div>
        <div className="absolute bottom-1/7 right-4/5 w-19 h-19 bg-[#34d399] rounded-full blur-xl opacity-22"></div>
        <div className="absolute bottom-3/8 right-1/8 w-33 h-33 bg-[#10b981] rounded-full blur-3xl opacity-12"></div>
        
        {/* Micro orbs for texture */}
        <div className="absolute top-1/12 left-1/12 w-8 h-8 bg-[#34d399] rounded-full blur-sm opacity-30"></div>
        <div className="absolute top-1/10 left-1/7 w-10 h-10 bg-[#10b981] rounded-full blur-md opacity-28"></div>
        <div className="absolute top-1/9 left-1/4 w-9 h-9 bg-[#059669] rounded-full blur-sm opacity-32"></div>
        <div className="absolute top-1/11 right-1/12 w-11 h-11 bg-[#34d399] rounded-full blur-md opacity-27"></div>
        <div className="absolute top-1/8 right-1/6 w-7 h-7 bg-[#10b981] rounded-full blur-sm opacity-33"></div>
        <div className="absolute bottom-1/12 left-1/12 w-9 h-9 bg-[#059669] rounded-full blur-sm opacity-31"></div>
        <div className="absolute bottom-1/10 right-1/10 w-8 h-8 bg-[#34d399] rounded-full blur-sm opacity-29"></div>
        <div className="absolute bottom-1/9 right-1/7 w-10 h-10 bg-[#10b981] rounded-full blur-md opacity-28"></div>
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
            <span className="bg-[#34d399] text-white px-6 py-3 rounded-full text-lg md:text-xl font-bold shadow-lg opacity-0 translate-y-4 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
              #nomorefrontingbills
            </span>
            <span className="bg-[#34d399] text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold shadow-xl opacity-0 translate-y-4 animate-[fadeInUp_1s_ease-out_1s_forwards]">
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

          <style jsx>{`
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