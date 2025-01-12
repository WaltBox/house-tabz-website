import React, { useEffect } from 'react';
import './App.css'; // Import global styles
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import Router components
import LandingPage from './components/LandingPage';
import ProblemSection from './components/ProblemSection';
import SolutionPage from './components/SolutionPage';
import LaunchingSection from './components/LaunchingSection';
import Footer from './components/Footer';
import Navbar from './components/navigation/Navbar';
import BusinessPage from './components/BusinessPage'; // Import the BusinessPage component
import WaitlistPage from './components/WaitlistPage'; // Import the WaitlistPage component
import AboutUs from './components/AboutUs'; // Import the About Us page
import HowItWorks from './components/HowItWorks'; // Import the How It Works page
import SharedPaymentSection from './components/SharedPaymentSection';
import ReferralProgram from './components/ReferralProgram';
import { Helmet } from 'react-helmet';
import vipInviteImage from './assets/housetabzvipinvite.png';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views for single-page applications
    if (window.gtag) {
      window.gtag('config', 'G-CYDC85KMX7', { page_path: location.pathname });
    }
  }, [location]);

  return (
    <>

<Helmet>
        {/* Standard meta tags */}
        <title>HouseTabz VIP Program</title>
        <meta name="description" content="Join HouseTabz VIP List and earn rewards!" />
        
        {/* Open Graph / Facebook / iMessage */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Join HouseTabz VIP List 🏠" />
        <meta property="og:description" content="Get $5 in credits when you sign up! Limited time offer." />
        <meta property="og:image" content={vipInviteImage} />
        <meta property="og:url" content="https://housetabz.com" />
        
        {/* iOS specific */}
        <meta name="apple-mobile-web-app-title" content="HouseTabz VIP Invite" />
        <link rel="apple-touch-icon" href={vipInviteImage} />
      </Helmet>

      <Navbar /> {/* Render the Navbar */}
      
      <Routes>
        {/* Main Landing Page */}
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <SharedPaymentSection />
            
            
              <ProblemSection />
              <SolutionPage />
              <LaunchingSection />
            

              <Footer />
            </>
          }
        />

        {/* Business Page */}
        <Route path="/business" element={<BusinessPage />} />

        {/* Waitlist Page */}
        <Route path="/vip" element={<WaitlistPage />} />

        {/* About Us Page */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
      

      </Routes>
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Add Google Analytics script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CYDC85KMX7';
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CYDC85KMX7');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
