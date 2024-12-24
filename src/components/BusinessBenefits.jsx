import React from 'react';
import { motion } from 'framer-motion';

const BusinessBenefits = () => {
  const benefits = [
    {
      title: "Solve Consumer Problems",
      description:
        "We remove barriers for your customers by eliminating the need to front household expenses.",
      icon: "🔧",
    },
    {
      title: "New Sales Channel",
      description:
        "Sell to entire households rather than individual roommates, increasing your reach and revenue.",
      icon: "📈",
    },
    {
      title: "Drive Consumer Consideration",
      description:
        "Households now consider services they wouldn’t otherwise, knowing everyone pays their share seamlessly.",
      icon: "🤝",
    },
  ];

  return (
    <section className="business-benefits relative min-h-screen w-screen bg-[#dff6f0] overflow-hidden pt-40 sm:pt-32">
      {/* Animated Dashed Circle */}
      <motion.div
        className="relative flex justify-center items-center mb-16 sm:mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="circle-dashed relative flex justify-center items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
            Partnering with{" "}
            <span className="text-green-500 shiny-text">HouseTabz</span>
          </h2>
          <div className="dashes-container absolute w-full h-full"></div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-3xl sm:text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{benefit.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      {/* SVG Wave at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#34d399"
            fillOpacity="1"
            d="M0,224L48,192C96,160,192,96,288,80C384,64,480,96,576,128C672,160,768,192,864,192C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Styles for Dashed Circle */}
      <style jsx>{`
        .circle-dashed {
          width: 20rem;
          height: 20rem;
          position: relative;
        }

        @media (min-width: 640px) {
          .circle-dashed {
            width: 25rem;
            height: 25rem;
          }
        }

        @media (min-width: 768px) {
          .circle-dashed {
            width: 30rem; /* Larger for tablets and desktops */
            height: 30rem;
          }
        }

        .dashes-container {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dashes-container::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px dashed #d1d5db; /* Grey dashed border */
          border-radius: 50%;
        }

        /* Dashes and Animation */
        .dashes-container::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px dashed transparent;
          animation: dash-animation 3s infinite linear;
        }

        @keyframes dash-animation {
          0% {
            border-color: #34d399; /* Start with green on one dash */
            transform: rotate(0deg);
          }
          100% {
            border-color: #d1d5db; /* Complete rotation */
            transform: rotate(360deg);
          }
        }

        .shiny-text {
          background: linear-gradient(90deg, #ff6b6b, #ffcc00, #ff6b6b);
          background-clip: text;
          color: transparent;
          animation: shine 2s infinite linear;
        }

        @keyframes shine {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }
      `}</style>
    </section>
  );
};

export default BusinessBenefits;
