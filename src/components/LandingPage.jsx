import React from 'react';
import logo from '../assets/housetabzlogo.png';

const LandingPage = () => (
  <div className="landing-page min-h-screen flex flex-col justify-center items-center relative bg-[#34d399]">
    {/* Mint Diagonal Wave */}
    <div className="absolute inset-x-0 bottom-0 w-full overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="wave-svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          className="wave-path"
          fill="#dff6f0"
          d="M0,224L120,208C240,192,480,160,720,176C960,192,1200,256,1320,288L1440,304L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>

    {/* Content */}
    <div className="content w-full max-w-6xl flex flex-col md:flex-row items-center justify-between relative z-10 px-4 md:px-12">
      {/* Text Section */}
      <div className="text w-full md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-snug mb-4">
          Say goodbye to fighting with your roommates over your...
        </h1>
        <div className="text-3xl md:text-4xl font-bold relative inline-block">
          <span className="static-text text-white">Shared </span>
          <div className="carousel-wrapper relative inline-block">
            <div className="carousel-container">
              <div className="carousel-track">
                <span className="carousel-word pencil-text">Internet</span>
                <span className="carousel-word pencil-text">Energy</span>
                <span className="carousel-word pencil-text">Cleaning</span>
                <span className="carousel-word pencil-text">Streaming</span>
                <span className="carousel-word pencil-text">Internet</span>
              </div>
            </div>
            <div className="underline absolute bottom-[-5px] left-0 w-full h-1"></div>
          </div>
          <span className="static-text text-white"> Bill</span>
        </div>
      </div>

      {/* Logo Section */}
      <div className="logo w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src={logo}
          alt="HouseTabz Logo"
          className="w-64 max-w-[80%] md:w-[40rem] transform hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>

    {/* Global and Section-Specific Styles */}
    <style jsx>{`
      /* Prevent Horizontal Scrolling */
      html,
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden; /* Ensure no horizontal scrolling on the entire page */
      }

      .landing-page {
        width: 100vw; /* Restrict width to viewport */
        overflow-x: hidden; /* Prevent horizontal scrolling in this section */
        position: relative;
        background-color: #34d399;
      }

      .wave-svg {
        width: 100%; /* Match section width */
        height: 60vh;
        display: block;
      }

      @media (max-width: 768px) {
        .wave-svg {
          height: 70vh;
        }
      }

      .content {
        max-width: 100%; /* Restrict content to viewport width */
      }

      .static-text {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 1.7em;
        color: white;
      }

      .carousel-wrapper {
        vertical-align: middle;
        padding-bottom: 10px;
      }

      .carousel-container {
        display: inline-block;
        position: relative;
        height: 1.8em;
        overflow: hidden;
        width: 12rem;
      }

      .carousel-track {
        display: flex;
        flex-direction: column;
        animation: rollCarousel 10s linear infinite;
      }

      .carousel-word {
        height: 1.8em;
        line-height: 1.8em;
        text-align: left;
        white-space: nowrap;
        color: black;
        font-weight: 700;
        filter: url(#pencil-effect);
      }

      .underline {
        background-color: white; /* White Underline */
        border-radius: 2px;
        filter: url(#pencil-effect);
      }

      @keyframes rollCarousel {
        0% {
          transform: translateY(0%);
        }
        100% {
          transform: translateY(-83.33%);
        }
      }

      .logo img {
        filter: none;
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
