import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/housetabzlogo.png';

const LandingPage = () => {
  // Load Montserrat Black font
  useEffect(() => {
    // Create a new link element
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
  <div className="landing-page min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#34d399] via-[#6ee7b7] to-white relative pt-16 md:pt-0">
    {/* Left Section */}
    <div className="text-section w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-3 md:px-16 mt-6 md:mt-0">
      <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-6 leading-tight flex flex-col md:flex-wrap items-center md:items-start gap-y-4 md:gap-y-6 w-full">
        <span className="w-full text-white montserrat-black text-6xl md:text-7xl mb-4 text-center md:text-left">HouseTabz</span>
        <span className="w-full text-left">Stop fighting over</span>
        <div className="flex flex-wrap items-center gap-3 md:gap-4 self-start max-w-full overflow-visible mr-6">
          <span className="text-[#34d399] bg-white px-2 py-1 rounded-md whitespace-nowrap">
            Shared
          </span>
          <span className="word-carousel">
            <span>Energy</span>
            <span>Internet</span>
            <span>Streaming</span>
            <span>Cleaning</span>
          </span>
        </div>
      </h1>
      {/* <p className="text-lg md:text-2xl text-gray-700 mb-8 text-center md:text-left">
        Say goodbye to awkward conversations and tracking down payments.
        HouseTabz allows your house to operate as a single financial entity.
      </p> */}
      <Link
        to="/how-it-works"
        className="bg-white text-black py-3 px-6 rounded-full shadow-md hover:bg-[#dff6f0] transition-all duration-300"
      >
        How It Works
      </Link>
    </div>

    {/* Right Section */}
    <div className="logo-section w-full md:w-1/2 flex justify-center relative mt-8 md:mt-0">
      {/* Rocking animation applied to this container */}
      <div className="relative rocking">
        <img
          src={logo}
          alt="HouseTabz Logo"
          className="w-56 sm:w-64 md:w-64 lg:w-80 xl:w-96 max-w-full h-auto transform hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>

    {/* Background Wave */}
    <div className="absolute bottom-0 w-full overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="wave-svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#dff6f0"
          d="M0,128L60,160C120,192,240,256,360,240C480,224,600,128,720,112C840,96,960,160,1080,192C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>

    {/* Styling */}
    <style jsx>{`
      .landing-page {
        font-family: 'Inter', sans-serif;
        color: #2d3748;
      }

      .montserrat-black {
        font-family: 'Montserrat-Black', 'Montserrat', sans-serif;
        font-weight: 900;
        letter-spacing: -0.03em;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .wave-svg {
        width: 100%;
        height: 10vh;
        display: block;
      }

      .word-carousel {
        display: inline-block;
        position: relative;
        width: auto;
        min-width: 12rem;
        max-width: 180px;
        height: 1.5em;
        overflow: visible;
        text-align: left;
        vertical-align: middle;
      }

      .word-carousel span {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        color: black;
        font-weight: 700;
        animation: rotateWord 8s linear infinite;
        line-height: 1.5;
        width: 100%;
        white-space: nowrap;
      }

      .word-carousel span:nth-child(2) {
        animation-delay: 2s;
      }

      .word-carousel span:nth-child(3) {
        animation-delay: 4s;
      }

      .word-carousel span:nth-child(4) {
        animation-delay: 6s;
      }

      @keyframes rotateWord {
        0%, 100% {
          opacity: 0;
          transform: translateY(100%);
        }
        3%, 22% {
          opacity: 1;
          transform: translateY(0);
        }
        25%, 97% {
          opacity: 0;
          transform: translateY(-100%);
        }
      }

      /* Smoother rocking animation */
      @keyframes rocking {
        0% {
          transform: rotate(0deg);
        }
        12.5% {
          transform: rotate(5deg);
        }
        25% {
          transform: rotate(10deg);
        }
        37.5% {
          transform: rotate(5deg);
        }
        50% {
          transform: rotate(0deg);
        }
        62.5% {
          transform: rotate(-5deg);
        }
        75% {
          transform: rotate(-10deg);
        }
        87.5% {
          transform: rotate(-5deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      .rocking {
        animation: rocking 4s infinite linear;
      }

      @media (max-width: 768px) {
        .text-section h1 {
          font-size: 2.5rem;
          line-height: 1.2;
          margin-top: 1rem;
          width: 95%;
          max-width: 95vw;
        }
        .text-section h1 .montserrat-black {
          font-size: 3.5rem;
          line-height: 1;
        }
        .text-section p {
          font-size: 1.25rem;
          text-align: left;
        }
        .logo-section img {
          margin-top: 2rem;
          width: 14rem; /* Larger logo on mobile */
        }
        .word-carousel {
          min-width: 6.5rem;
          max-width: none;
          width: auto;
          text-align: left;
        }
      }

      @media (max-width: 480px) {
        .text-section h1 {
          font-size: 2.2rem;
          width: 90%;
        }
        .text-section h1 .montserrat-black {
          font-size: 3rem;
        }
        .word-carousel {
          min-width: 6rem;
        }
      }

      @media (min-width: 1600px) {
        .logo-section img {
          width: 30rem; /* Scale up for ultra-wide screens */
        }
      }
    `}</style>
  </div>
);
};

export default LandingPage;