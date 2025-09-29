import React, { useEffect, useState } from 'react';

const LandlordsPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts
  useEffect(() => {
    // Load Montserrat
    const existingMontserrat = document.querySelector('link[href*="Montserrat"]');
    if (!existingMontserrat) {
      const montserratLink = document.createElement('link');
      montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap';
      montserratLink.rel = 'stylesheet';
      montserratLink.id = 'montserrat-font-link';
      document.head.appendChild(montserratLink);
    }

    // Load DM Sans
    const existingDMSans = document.querySelector('link[href*="DM+Sans"]');
    if (!existingDMSans) {
      const dmSansLink = document.createElement('link');
      dmSansLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap';
      dmSansLink.rel = 'stylesheet';
      dmSansLink.id = 'dm-sans-font-link';
      dmSansLink.onload = () => setFontLoaded(true);
      document.head.appendChild(dmSansLink);
    } else {
      setFontLoaded(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-6">
      <div className="text-center">
        {/* HouseTabz Title */}
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-tight"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: '#34d399',
            fontWeight: 900
          }}
        >
          HouseTabz
        </h1>

        {/* For Landlords Subtitle */}
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8 ${fontLoaded ? '' : 'opacity-90'}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.03em',
            fontWeight: 900
          }}
        >
          For Landlords
        </h2>

        {/* Coming Soon */}
        <h3 
          className={`text-2xl md:text-3xl lg:text-4xl font-black text-gray-600 ${fontLoaded ? '' : 'opacity-90'}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.03em',
            fontWeight: 900
          }}
        >
          Coming soon
        </h3>
      </div>
    </div>
  );
};

export default LandlordsPage;
