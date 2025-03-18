import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/housetabzlogo.png';

const LandingPage = () => (
  <div className="landing-page min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#34d399] via-[#6ee7b7] to-white relative">
    {/* Left Section */}
    <div className="text-section w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-8 md:px-16">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight flex flex-wrap items-center gap-y-4 md:gap-y-6 text-center md:text-left">
        <span className="w-full">Stop fighting over your</span>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-white bg-[#34d399] px-2 py-1 rounded-md whitespace-nowrap">
            Shared
          </span>
          <span className="word-carousel">
            <span>Energy</span>
            <span>Internet</span>
            <span>Streaming</span>
            <span>Cleaning</span>
          </span>
          <span className="text-[#065f46] whitespace-nowrap">Bill</span>
        </div>
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-8 text-center md:text-left">
        Say goodbye to awkward conversations and tracking down payments.
        HouseTabz allows your house to operate as a single financial entity.
      </p>
      <Link
        to="/how-it-works"
        className="bg-[#065f46] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#034c39] transition-all duration-300"
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
          className="w-40 sm:w-48 md:w-64 lg:w-80 xl:w-96 max-w-full h-auto transform hover:scale-110 transition-transform duration-500"
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

      .wave-svg {
        width: 100%;
        height: 10vh;
        display: block;
      }

      .word-carousel {
        display: inline-block;
        position: relative;
        min-width: 18.1rem;
        height: 1.5em;
        overflow: hidden;
        text-align: center;
      }

      .word-carousel span {
        position: absolute;
        left: 0;
        opacity: 0;
        color: #065f46;
        font-weight: 700;
        animation: rotateWord 8s linear infinite;
        line-height: 1.5;
        width: 100%;
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
        .text-section {
          text-align: center;
          align-items: center;
        }
        .text-section h1 {
          font-size: 2rem;
          line-height: 1.3;
        }
        .text-section p {
          font-size: 1rem;
        }
        .logo-section img {
          margin-top: 2rem;
          width: 12rem; /* Smaller logo on mobile */
          height: auto;
        }
        .word-carousel {
          min-width: 10rem;
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

export default LandingPage;
