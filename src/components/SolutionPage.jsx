import React from 'react';

const SolutionPage = () => {
  return (
    <section className="solution-page bg-mint py-16 px-8 relative">
      {/* Top White Wave */}
      <div className="absolute top-0 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,117.3C672,96,768,96,864,112C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800">
          HouseTabz is available for Beta Testing!
        </h2>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          Join the VIP list and Walt will reach out with more details on how to be one of the first users to try HouseTabz.
        </p>
      </div>

      <style jsx>{`
        .bg-mint {
          background-color: #dff6f0;
        }
      `}</style>
    </section>
  );
};

export default SolutionPage;