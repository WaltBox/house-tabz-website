import React from 'react';
import logo from '../assets/housetabzlogo.png'; // Adjust the path to your logo

const LandingPage = () => (
  <div className="landing-page min-h-screen flex flex-col justify-center items-center px-6 md:px-16 relative overflow-hidden bg-[#dff6f0]">
    {/* Mint Hill Background */}
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-[90vh]" /* Dramatic hill height */
        preserveAspectRatio="none"
      >
        <path
          fill="#34d399" /* Green hill */
          d="M0,256L60,224C120,192,240,128,360,96C480,64,600,32,720,64C840,96,960,192,1080,256C1200,320,1320,320,1380,320L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>

    {/* Content */}
    <div className="content w-full max-w-6xl flex flex-col md:flex-row items-center justify-between relative z-10">
      {/* Text Section */}
      <div className="text md:w-1/2 text-left">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-snug md:text-6xl mb-4">
          Say goodbye to fighting with your roommates over your...
        </h1>
        <div className="text-4xl font-bold relative inline-block">
          <span className="static-text text-white">Shared </span>
          <div className="carousel-wrapper relative inline-block">
            <div className="carousel-container">
              <div className="carousel-track">
                <span className="carousel-word pencil-text">Internet</span>
                <span className="carousel-word pencil-text">Energy</span>
                <span className="carousel-word pencil-text">Cleaning</span>
                <span className="carousel-word pencil-text">Streaming</span>
                {/* Seamless Loop (Fix: Allow full scroll before repeating) */}
                <span className="carousel-word pencil-text">Internet</span>
              </div>
            </div>
            <div className="underline absolute bottom-[-5px] left-0 w-full h-1"></div>
          </div>
          <span className="static-text text-white"> Bill</span>
        </div>
      </div>

      {/* Logo Section */}
      <div className="logo md:w-1/2 flex justify-center">
        <img
          src={logo}
          alt="HouseTabz Logo"
          className="w-100 md:w-[40rem] transform hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>

    {/* Styles */}
    <style jsx>{`
      .landing-page {
        position: relative;
        background-color: #dff6f0; /* Mint background */
      }

      .static-text {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 1.5em;
        color: white; /* Static text in white */
      }

      .carousel-wrapper {
        vertical-align: middle;
        padding-bottom: 10px;
      }

      .carousel-container {
        display: inline-block;
        position: relative;
        height: 1.5em;
        overflow: hidden;
        width: 12rem;
      }

      .carousel-track {
        display: flex;
        flex-direction: column;
        animation: rollCarousel 10s linear infinite;
      }

      .carousel-word {
        height: 1.5em;
        line-height: 1.5em;
        text-align: left;
        white-space: nowrap;
        color: black; /* Black for carousel words */
        font-weight: 700;
        filter: url(#pencil-effect); /* Pencil effect */
      }

      .underline {
        background-color: white; /* White underline */
        border-radius: 2px;
        filter: url(#pencil-effect); /* White pencil-drawn underline */
      }

      @keyframes rollCarousel {
        0% {
          transform: translateY(0%);
        }
        100% {
          transform: translateY(-83.33%); /* Adjusted for full scroll */
        }
      }

      /* Hover Effects for Logo */
      .logo img {
        filter: none; /* Removes any visible container effects */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .logo img:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }
    `}</style>

    {/* SVG Filters for Pencil Effects */}
    <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
      <filter id="pencil-effect">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </svg>
  </div>
);

export default LandingPage;
