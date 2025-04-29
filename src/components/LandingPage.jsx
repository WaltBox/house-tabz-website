// src/components/LandingPage.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const buttonRef = useRef(null);
  const spacerRef = useRef(null);
  const [isGreen, setIsGreen] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersCreated = useRef(false);

  // Detect iOS and mobile devices
  useEffect(() => {
    const checkDevice = () => {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(iOS);
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Load fonts
  useEffect(() => {
    const existingLink = document.querySelector('link[href*="Montserrat"]');
    if (!existingLink) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'montserrat-font-link';
      fontLink.onload = () => setFontLoaded(true);
      document.head.appendChild(fontLink);
    } else {
      setFontLoaded(true);
    }
  }, []);

  // Standard setup for scroll triggers and animations
  useEffect(() => {
    textRefs.current = [];
    
    const entranceAnimationTimeoutId = setTimeout(() => {
      if (textRefs.current.length > 0 && buttonRef.current) {
        // Initial setup
        gsap.set(textRefs.current, { opacity: 0, y: 20 });
        gsap.set(buttonRef.current, { opacity: 0 });

        // Main heading animation
        gsap.to(textRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      }
    }, 300);
    
    const scrollTriggerTimeoutId = setTimeout(() => {
      if (!scrollTriggersCreated.current) {
        initScrollTrigger();
        scrollTriggersCreated.current = true;
      }
    }, 1000);

    return () => {
      clearTimeout(entranceAnimationTimeoutId);
      clearTimeout(scrollTriggerTimeoutId);
    };
  }, [fontLoaded, isMobile, isIOS]);

  // Orientation change handler
  useEffect(() => {
    const handleOrientationChange = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      scrollTriggersCreated.current = false;
      setTimeout(() => {
        initScrollTrigger();
        scrollTriggersCreated.current = true;
      }, 500);
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, [isIOS, isMobile]);

  const initScrollTrigger = () => {
    if (!sectionRef.current || !spacerRef.current) return;
    ScrollTrigger.getAll().forEach(t => t.kill());

    spacerRef.current.style.height = isIOS ? '300vh' : '200vh';
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? "top 40%" : "top 60%",
      end: isMobile ? "bottom 20%" : "bottom 40%",
      scrub: isMobile ? 0.3 : 0.5,
      onEnter: () => updateColors(true),
      onLeave: () => updateColors(false),
      onEnterBack: () => updateColors(true),
      onLeaveBack: () => updateColors(false),
      invalidateOnRefresh: true
    });

    ScrollTrigger.refresh(true);
  };

  const updateColors = (isGreenBg) => {
    setIsGreen(isGreenBg);
    const bgColor = isGreenBg ? "#34d399" : "white";
    const textColor = isGreenBg ? "black" : "#34d399";

    gsap.to(sectionRef.current, { backgroundColor: bgColor, duration: 0.5 });
    gsap.to(textRefs.current, { color: textColor, duration: 0.5 });
    
    const wordSpans = document.querySelectorAll('.animated-word');
    if (wordSpans.length > 0) {
      gsap.to(wordSpans, { color: textColor, duration: 0.5 });
    }
    
    updateButtonColors(false, isGreenBg);
  };

  const updateButtonColors = (isHovered, forceGreen = null) => {
    const isGreenBg = forceGreen !== null ? forceGreen : isGreen;
    const bgColor = isHovered
      ? (isGreenBg ? "black" : "#34d399")
      : "transparent";
    const textColor = isHovered
      ? (isGreenBg ? "#34d399" : "black")
      : (isGreenBg ? "black" : "#34d399");
    const borderColor = isGreenBg ? "black" : "#34d399";

    gsap.to(buttonRef.current, {
      backgroundColor: bgColor,
      color: textColor,
      borderColor: borderColor,
      duration: 0.3
    });
  };

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };
  
  // Create the animated words for the subheading
  const renderAnimatedSubheading = () => {
    const words = ["for", "shared", "household", "expenses"];
    
    return (
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {words.map((word, index) => (
          <span 
            key={index}
            className="animated-word inline-block mx-1"
            style={{
              color: 'black',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.02em',
              opacity: 0,
              transform: 'scale(0.5)',
              animation: `popIn 0.5s forwards ${0.8 + index * 0.2}s`,
            }}
          >
            {word}
          </span>
        ))}
      </h2>
    );
  };

  // Add the animation keyframes to the document
  useEffect(() => {
    if (!document.getElementById('animation-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'animation-styles';
      styleEl.innerHTML = `
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  // Calculate button delay based on number of words
  const buttonAnimationDelay = 0.8 + (4 * 0.2) + 0.4;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#34d399] transition-colors duration-500 overflow-visible"
      style={{ minHeight: isIOS ? '-webkit-fill-available' : '800px' }}
    >
      <div
        ref={containerRef}
        className={`absolute inset-0 flex flex-col items-center ${isMobile ? 'justify-start pt-20' : 'justify-center'} px-6 z-20`}
      >
        {/* Very large logo implementation positioned behind everything */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            transform: isMobile ? 'translateY(35%)' : 'translateY(15%)'
          }}
        >
          <img
            src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
            alt="HouseTabz logo"
            style={{
              width: isMobile ? '90vw' : '70vw',
              maxWidth: '700px',
              minWidth: isMobile ? '300px' : '500px',
              height: 'auto',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))'
            }}
          />
        </div>

        <div className="text-center max-w-4xl relative z-20">
          <h1
            ref={addToRefs}
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-2 md:mb-4 leading-tight ${fontLoaded ? '' : 'opacity-90'}`}
            style={{
              color: 'black',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            THE PAYMENT METHOD
          </h1>

          <div className="w-16 h-1 bg-[black] mx-auto mb-3 md:mb-5 opacity-80 rounded-full"></div>

          {/* Render the animated subheading with CSS animations */}
          {renderAnimatedSubheading()}
        </div>

        <Link
          ref={buttonRef}
          to="/how-it-works"
          className={`relative z-20 ${isMobile ? 'mt-4' : 'mt-6 md:mt-12'} font-bold text-lg md:text-xl py-3 md:py-4 px-10 md:px-14 rounded-full transition-all duration-300 border-2`}
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            borderColor: 'black',
            opacity: 0,
            animation: `fadeIn 0.8s forwards ${buttonAnimationDelay}s`
          }}
          onMouseEnter={() => updateButtonColors(true)}
          onMouseLeave={() => updateButtonColors(false)}
        >
          How It Works
        </Link>
      </div>

      <div
        ref={spacerRef}
        className="w-full"
        style={{
          height: isIOS ? '300vh' : '200vh',
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch'
        }}
      />
    </section>
  );
};

export default LandingPage;