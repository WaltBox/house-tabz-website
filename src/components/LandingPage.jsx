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
  const [isGreen, setIsGreen] = useState(true);

  useEffect(() => {
    // Clear any existing refs from potential re-renders
    textRefs.current = [];
    
    // Set initial state
    gsap.set(textRefs.current, { opacity: 0, y: 20 });
    gsap.set(buttonRef.current, { opacity: 0 });
    
    // Text entrance animation
    gsap.to(textRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3
    });

    // Button entrance animation
    gsap.to(buttonRef.current, {
      opacity: 1,
      duration: 0.8,
      delay: 0.8
    });

    // Scroll-triggered color flip animation - improved for mobile
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%", // Adjusted trigger point
      end: "bottom 40%",
      markers: false, // Set to true for debugging
      onEnter: () => updateColors(true),
      onLeave: () => updateColors(false),
      onEnterBack: () => updateColors(true),
      onLeaveBack: () => updateColors(false),
      // Make sure ScrollTrigger refreshes on mobile orientation changes
      invalidateOnRefresh: true,
      scrub: 0.5 // Adding scrub for smoother transitions
    });

    // Refresh ScrollTrigger on resize to handle orientation changes
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    // Clean up function
    return () => {
      trigger.kill();
      window.removeEventListener('resize', () => {
        ScrollTrigger.refresh();
      });
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

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
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
            style={{ color: 'white' }}
          >
            THE PAYMENT METHOD
          </h1>
          
          <h2
            ref={addToRefs}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ color: 'white' }}
          >
            for shared household expenses
          </h2>
        </div>

        <Link
          ref={buttonRef}
          to="/how-it-works"
          className="mt-16 font-bold text-xl py-4 px-14 rounded-full transition-all duration-300 border-2"
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
      
      {/* Add this invisible element for better scroll triggering on mobile */}
      <div className="h-[200vh]"></div>
    </section>
  );
};

export default LandingPage;