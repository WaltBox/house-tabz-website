import React, { useRef, useState } from 'react';
import maisonEnergyLogo from '../assets/maison-energy.png';
import maisonExampleVideo from '../assets/maison-expample.mov';
import howItWorksGraphic from '../assets/how-it-works.png';

const MaisonPage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Add Montserrat font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden bg-[#34d399]">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-10 w-32 h-32 bg-white/3 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Partnership Badge */}
            <div className="inline-block mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
                <span className="text-white font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Strategic Partnership Proposal
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-12 leading-tight">
              <span style={{ 
                color: '#2D3748',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                MAISON ENERGY
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-white font-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                × HouseTabz
              </span>
            </h1>
            
            {/* Logo */}
            <div className="mb-12 max-w-xl mx-auto">
              <img 
                src={maisonEnergyLogo} 
                alt="Maison Energy Logo" 
                className="w-full h-auto max-h-64 object-contain"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
              />
            </div>
            
            {/* Tagline */}
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Revolutionizing shared energy billing through seamless integration and intelligent cost splitting
            </p>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Market Opportunity */}
          <div className="text-center mb-20">
            <h2 
              className="text-3xl md:text-4xl font-black text-gray-800 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Market Opportunity
            </h2>
            <div className="w-16 h-1 bg-[#34d399] mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="text-4xl md:text-5xl font-black text-[#34d399] mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  $47B
                </div>
                <p className="text-gray-600 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  U.S. Rental Market
                </p>
              </div>
              
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="text-4xl md:text-5xl font-black text-[#34d399] mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  73%
                </div>
                <p className="text-gray-600 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Share Utility Bills
                </p>
              </div>
              
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="text-4xl md:text-5xl font-black text-[#34d399] mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  $2.1K
                </div>
                <p className="text-gray-600 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Annual Utility Cost
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Graphic */}
          <div className="mb-32 relative">
            <div className="text-center mb-20">
              <div className="relative inline-block group mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#34d399]/20 via-green-400/30 to-[#34d399]/20 blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
                <h2 
                  className="relative text-4xl md:text-6xl font-black mb-4 transform group-hover:scale-105 transition-all duration-700"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #1f2937 0%, #374151 25%, #4b5563 50%, #374151 75%, #1f2937 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                  }}
                >
                  How It Works
                </h2>
              </div>
              
              <div className="relative w-32 h-2 mx-auto mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-[#34d399] via-green-500 to-[#34d399] rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div className="relative group max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#34d399]/5 via-green-400/10 to-[#34d399]/5 rounded-3xl blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-1000"></div>
              <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700">
                <img 
                  src={howItWorksGraphic} 
                  alt="How HouseTabz and Maison Energy Integration Works"
                  className="w-full h-auto rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1)) drop-shadow(0 8px 16px rgba(16, 185, 129, 0.05))',
                    transition: 'all 0.7s ease'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-20">
            <h2 
              className="text-3xl md:text-4xl font-black text-gray-800 mb-4 text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Partnership Benefits
            </h2>
            <div className="w-16 h-1 bg-[#34d399] mx-auto mb-12"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#34d399] transition-all duration-300">
                <div className="w-16 h-16 bg-[#34d399] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Instant Splitting
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Real-time bill division among roommates
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#34d399] transition-all duration-300">
                <div className="w-16 h-16 bg-[#34d399] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Usage Analytics
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Detailed consumption insights
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#34d399] transition-all duration-300">
                <div className="w-16 h-16 bg-[#34d399] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Customer Growth
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Access to 50K+ active users
                </p>
              </div>
              
              {/* Benefit 4 */}
              <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#34d399] transition-all duration-300">
                <div className="w-16 h-16 bg-[#34d399] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Revenue Boost
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Increase customer lifetime value
                </p>
              </div>
            </div>
          </div>

          {/* User Experience Preview */}
          <div className="mb-20">
            <h2 
              className="text-3xl md:text-4xl font-black text-gray-800 mb-4 text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              User Experience Preview
            </h2>
            <div className="w-16 h-1 bg-[#34d399] mx-auto mb-12"></div>
            
            {/* iPhone Frame with Video */}
            <div className="flex justify-center mb-20">
              <div className="relative">
                {/* iPhone Frame */}
                <div className="relative w-80 h-[650px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                    
                    {/* Video */}
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-[2.5rem]"
                      loop 
                      muted 
                      playsInline
                    >
                      <source src={maisonExampleVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Play/Pause Button */}
                    <button
                      onClick={toggleVideo}
                      className="absolute bottom-8 right-4 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 z-20"
                    >
                      {isPlaying ? (
                        // Pause Icon
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        // Play Icon
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Watch how users seamlessly split their Maison Energy bills through HouseTabz, 
                creating a frictionless experience that benefits both platforms.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gray-50 rounded-3xl p-12">
            <h2 
              className="text-3xl md:text-4xl font-black text-gray-800 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Ready to Partner?
            </h2>
            <p 
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Let's discuss how we can integrate our platforms to create the ultimate energy billing experience for shared living.
            </p>
            <button 
              className="bg-[#34d399] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2bb583] transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Schedule Partnership Meeting
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default MaisonPage;