import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const buttonRef = useRef(null);
  const isGreenBg = useRef(true);

  useEffect(() => {
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

    // Scroll-triggered color flip animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        isGreenBg.current = self.isActive;
        const bgColor = isGreenBg.current ? "#34d399" : "white";
        const textColor = isGreenBg.current ? "white" : "#34d399";
        
        gsap.to(sectionRef.current, {
          backgroundColor: bgColor,
          duration: 0.5
        });
        
        gsap.to(textRefs.current, {
          color: textColor,
          duration: 0.5
        });
        
        updateButtonColors(false);
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const updateButtonColors = (isHovered) => {
    const bgColor = isHovered 
      ? (isGreenBg.current ? "white" : "#34d399")
      : "transparent";
    
    const textColor = isHovered 
      ? (isGreenBg.current ? "#34d399" : "white")
      : (isGreenBg.current ? "white" : "#34d399");
    
    const borderColor = isGreenBg.current ? "white" : "#34d399";

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
    </section>
  );
};

export default LandingPage;