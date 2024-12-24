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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render the Navbar */}
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <ProblemSection />
              <SolutionPage />
              <LaunchingSection />
              <Footer />
            </>
          } />
          <Route path="/business" element={<BusinessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
