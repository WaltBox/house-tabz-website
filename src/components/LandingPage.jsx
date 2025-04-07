import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const buttonRef = useRef(null);
  const spacerRef = useRef(null);
  const [isGreen, setIsGreen] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Load fonts
  useEffect(() => {
    // Check if font is already in document
    const existingLink = document.querySelector('link[href*="Montserrat"]');
    
    if (!existingLink) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.id = 'montserrat-font-link';
      
      // Set up load event to track when the font is actually loaded
      fontLink.onload = () => {
        setFontLoaded(true);
      };
      
      document.head.appendChild(fontLink);
    } else {
      setFontLoaded(true);
    }
  }, []);

  // Set up animations and scroll triggers
  useEffect(() => {
    // Clear any existing refs from potential re-renders
    textRefs.current = [];
    
    // Set initial state
    gsap.set(textRefs.current, { opacity: 0, y: 20 });
    gsap.set(buttonRef.current, { opacity: 0 });
    
    // Wait a bit for everything to be ready
    const timeoutId = setTimeout(() => {
      // Text entrance animation
      gsap.to(textRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Button entrance animation
      gsap.to(buttonRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: 0.5
      });
      
      // Initialize ScrollTrigger
      initScrollTrigger();
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [fontLoaded, isMobile]);
  
  const initScrollTrigger = () => {
    // Make sure references exist
    if (!sectionRef.current) return;
    
    // Kill any existing triggers
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Create trigger with mobile-specific settings
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? "top 40%" : "top 60%",
      end: isMobile ? "bottom 20%" : "bottom 40%",
      markers: false, // Set to true for debugging
      onEnter: () => updateColors(true),
      onLeave: () => updateColors(false),
      onEnterBack: () => updateColors(true), 
      onLeaveBack: () => updateColors(false),
      invalidateOnRefresh: true,
      scrub: isMobile ? 0.3 : 0.5, // Faster scrub on mobile
      // Debug callback to see scroll values
      onUpdate: self => {
        // Uncomment for debugging
        // console.log(`Progress: ${self.progress.toFixed(2)}, Direction: ${self.direction}`);
      }
    });
    
    // Force a refresh to make sure positions are calculated correctly
    ScrollTrigger.refresh();
    
    // If on mobile, add touch-specific handler
    if (isMobile && spacerRef.current) {
      // Set correct height for mobile
      spacerRef.current.style.height = '150vh';
    }
  };

  const updateColors = (isGreenBackground) => {
    setIsGreen(isGreenBackground);
    
    const bgColor = isGreenBackground ? "#34d399" : "white";
    const textColor = isGreenBackground ? "white" : "#34d399";
    
    gsap.to(sectionRef.current, {
      backgroundColor: bgColor,
      duration: 0.5
    });
    
    gsap.to(textRefs.current, {
      color: textColor,
      duration: 0.5
    });
    
    updateButtonColors(false, isGreenBackground);
  };

  const updateButtonColors = (isHovered, forceGreen = null) => {
    const isGreenBg = forceGreen !== null ? forceGreen : isGreen;
    
    const bgColor = isHovered 
      ? (isGreenBg ? "white" : "#34d399")
      : "transparent";
    
    const textColor = isHovered 
      ? (isGreenBg ? "#34d399" : "white")
      : (isGreenBg ? "white" : "#34d399");
    
    const borderColor = isGreenBg ? "white" : "#34d399";

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

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen min-h-[800px] bg-[#34d399] transition-colors duration-500 overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10"
      >
        <div className="text-center max-w-4xl">
          <h1 
            ref={addToRefs}
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-2 md:mb-4 leading-tight ${fontLoaded ? '' : 'opacity-90'}`}
            style={{ 
              color: 'white',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            THE PAYMENT METHOD
          </h1>
          
          {/* Decorative divider */}
          <div className="w-16 h-1 bg-white mx-auto mb-3 md:mb-5 opacity-80 rounded-full"></div>
          
          <h2
            ref={addToRefs}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${fontLoaded ? '' : 'opacity-90'}`}
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.02em',
              textTransform: 'none'
            }}
          >
            for shared household expenses
          </h2>
        </div>

        <Link
          ref={buttonRef}
          to="/how-it-works"
          className="mt-12 md:mt-16 font-bold text-lg md:text-xl py-3 md:py-4 px-10 md:px-14 rounded-full transition-all duration-300 border-2"
          style={{ 
            backgroundColor: 'transparent',
            color: 'white',
            borderColor: 'white'
          }}
          onMouseEnter={() => updateButtonColors(true)}
          onMouseLeave={() => updateButtonColors(false)}
        >
          How It Works
        </Link>
      </div>
      
      {/* Mobile-optimized scrollable content space */}
      <div 
        ref={spacerRef} 
        className="w-full h-[200vh]" 
        style={{ 
          touchAction: isMobile ? 'pan-y' : 'auto'
        }}
      ></div>
    </section>
  );
};

export default LandingPage;