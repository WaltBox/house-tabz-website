import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import waltImage from '../assets/waltboxwellheadshot.jpeg'; // Import Walt's image
import gusImage from '../assets/gusheadshot.avif'; // Import Gus's image
import introVideo from '../assets/housetabzintro.mp4'; // Import the intro video
import Footer from './Footer'; // Import the Footer component

const AboutUs = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section>
      <div className="about-us-page bg-gray-100 min-h-screen pt-20 pb-16 px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            About <span className="text-green-500">HouseTabz</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            Simplifying shared expenses and fostering harmonious living for households everywhere.
          </motion.p>
        </div>

        {/* Our Mission Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              At HouseTabz, our mission is to eliminate the stress of shared living expenses by providing an innovative
              platform that ensures fairness, transparency, and ease of use. We’re dedicated to making communal living
              better for everyone involved.
            </motion.p>
          </div>
          <motion.div
            className="w-full bg-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center text-gray-600 text-lg relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative w-full h-64">
              <video
                ref={videoRef}
                src={introVideo}
                className="w-full h-full object-cover rounded-lg"
                controls={false}
              />
              <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                <button
                  onClick={togglePlayPause}
                  className="bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90"
                  aria-label="Play/Pause"
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90"
                  aria-label="Mute/Unmute"
                >
                  {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Meet the Team Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.h2
            className="text-3xl font-bold text-gray-800 text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team Member 1 */}
            <motion.div
              className="team-member bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={waltImage}
                alt="Walt Boxwell"
                className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-green-500 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Walt Boxwell</h3>
              <p className="text-gray-600 text-sm">Founder & CEO</p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                As the visionary behind HouseTabz, Walt is passionate about revolutionizing shared living by simplifying
                financial management for households everywhere.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className="team-member bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={gusImage}
                alt="Second Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-green-500 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Augustine (Gus) Walsh</h3>
              <p className="text-gray-600 text-sm">Advisor</p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Gus is an experienced entrepreneur and advisor, bringing a wealth of knowledge and expertise to the HouseTabz team.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto text-center mt-12">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Join Us in Transforming Shared Living
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            Whether you’re a renter, homeowner, or service provider, HouseTabz is here to make your life easier.
          </motion.p>
          <motion.a
            href="/waitlist"
            className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          >
            Join the Waitlist
          </motion.a>
        </div>

        {/* Footer */}
      </div>
      <Footer />
    </section>
  );
};

export default AboutUs;
