import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProblemSection from './components/ProblemSection';
import SolutionPage from './components/SolutionPage';
import LaunchingSection from './components/LaunchingSection';
import Footer from './components/Footer';
import Navbar from './components/navigation/Navbar';
import BusinessPage from './components/BusinessPage';
import WaitlistPage from './components/WaitlistPage';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import SharedPaymentSection from './components/SharedPaymentSection';
import HouseTabzHomies from './components/HouseTabzHomies';
import ReferralProgram from './components/ReferralProgram';
import { Helmet } from 'react-helmet';
import vipInviteImage from './assets/housetabzvipinvite.png';
import PartnersPage from './components/PartnersPage';
import ConfirmRequest from './components/ConfirmRequest';

const MainLayout = ({ children }) => (
 <>
   <Navbar />
   {children}
 </>
);

const AppContent = () => {
 const location = useLocation();

 useEffect(() => {
   if (window.gtag) {
     window.gtag('config', 'G-CYDC85KMX7', { page_path: location.pathname });
   }
 }, [location]);

 return (
   <>
     <Helmet>
       <title>HouseTabz VIP Program</title>
       <meta name="description" content="Join HouseTabz VIP List and earn rewards!" />
       <meta property="og:type" content="website" />
       <meta property="og:title" content="Join HouseTabz VIP List 🏠" />
       <meta property="og:description" content="Get $5 in credits when you sign up! Limited time offer." />
       <meta property="og:image" content={vipInviteImage} />
       <meta property="og:url" content="https://housetabz.com" />
       <meta name="apple-mobile-web-app-title" content="HouseTabz VIP Invite" />
       <link rel="apple-touch-icon" href={vipInviteImage} />
     </Helmet>
     
     <Routes>
       {/* Confirm Request - No Navbar */}
       <Route path="/confirm-request" element={<ConfirmRequest />} />

       {/* All other routes - With Navbar */}
       <Route path="/" element={
         <MainLayout>
           <>
             <LandingPage />
             <SharedPaymentSection />
             <ProblemSection />
             <SolutionPage />
             {/* <LaunchingSection /> */}
             <Footer />
           </>
         </MainLayout>
       } />

       <Route path="/business" element={
         <MainLayout>
           <BusinessPage />
         </MainLayout>
       } />

       <Route path="/vip" element={
         <MainLayout>
           <WaitlistPage />
         </MainLayout>
       } />

       <Route path="/about" element={
         <MainLayout>
           <AboutUs />
         </MainLayout>
       } />

       <Route path="/how-it-works" element={
         <MainLayout>
           <HowItWorks />
         </MainLayout>
       } />

       <Route path="/referral-program" element={
         <MainLayout>
           <ReferralProgram />
         </MainLayout>
       } />

       <Route path="/homies" element={
         <MainLayout>
           <HouseTabzHomies />
         </MainLayout>
       } />

<Route path="/partners" element={
  <MainLayout>
    <PartnersPage />
  </MainLayout>
} />
     </Routes>
   </>
 );
};

const App = () => {
 useEffect(() => {
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