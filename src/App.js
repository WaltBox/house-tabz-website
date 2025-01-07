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

const App = () => {
  const location = useLocation();

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

  useEffect(() => {
    // Track page views for single-page applications
    if (window.gtag) {
      window.gtag('config', 'G-CYDC85KMX7', { page_path: location.pathname });
    }
  }, [location]);

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render the Navbar */}
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <LandingPage />
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
          <Route path="/waitlist" element={<WaitlistPage />} />

          {/* About Us Page */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
