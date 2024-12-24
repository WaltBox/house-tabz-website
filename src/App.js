import React from 'react';
import './App.css'; // Import global styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import LandingPage from './components/LandingPage';
import ProblemSection from './components/ProblemSection';
import SolutionPage from './components/SolutionPage';
import LaunchingSection from './components/LaunchingSection';
import Footer from './components/Footer';
import Navbar from './components/navigation/Navbar';
import BusinessPage from './components/BusinessPage'; // Import the BusinessPage component
import WaitlistPage from './components/WaitlistPage'; // Import the WaitlistPage component

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
