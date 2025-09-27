import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProblemSection from './components/ProblemSection';
import SolutionPage from './components/SolutionPage';
import DawgMode from './components/DawgMode'
// import LaunchingSection from './components/LaunchingSection';
import Footer from './components/Footer';
import UnfairnessSection from './components/UnfairnessSection';
import Navbar from './components/navigation/Navbar';
import BusinessPage from './components/BusinessPage';
import WaitlistPage from './components/WaitlistPage';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import SharedPaymentSection from './components/SharedPaymentSection';
import HouseTabzHomies from './components/HouseTabzHomies';
import ReferralProgram from './components/ReferralProgram';
import { Helmet } from 'react-helmet';

import PartnersPage from './components/PartnersPage';
import ConfirmRequest from './components/ConfirmRequest';
// import IntegrationDocs from './components/IntegrationDocs';
import QuickstartGuide from './components/QuickstartGuide';
import DocsLanding from './components/DocsLanding';
import SDKDocs from './components/integration/docs/SDKDocs';
import DatabaseSetup from './components/integration/docs/DatabaseSetup';
import APIReference from './components/integration/docs/APIReference';
import WebhookSetup from './components/integration/docs/WebhookSetup';
import IntegrationChecklist from './components/integration/docs/IntegrationChecklist';
import TestShit from './components/integration/docs/testshit';
import Terms from './components/TermsOfServicepage';
import TermsOfServicePage from './components/TermsOfServicepage';
import DuckedPage from './components/DuckedPage';
import MaisonPage from './components/MaisonPage';
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
     {/* <Helmet>
       <title>HouseTabz</title>
       <meta name="description" content="Join HouseTabz VIP List and earn rewards!" />
       <meta property="og:type" content="website" />
       <meta property="og:title" content="Join HouseTabz VIP List 🏠" />
       <meta property="og:description" content="Get $5 in credits when you sign up! Limited time offer." />
       <meta property="og:image" content={vipInviteImage} />
       <meta property="og:url" content="https://housetabz.com" />
       <meta name="apple-mobile-web-app-title" content="HouseTabz VIP Invite" />
       <link rel="apple-touch-icon" href={vipInviteImage} />
     </Helmet> */}
     
     <Routes>
       {/* Confirm Request - No Navbar */}
       <Route path="/confirm-request" element={<ConfirmRequest />} />

       {/* All other routes - With Navbar */}
       <Route path="/" element={
         <MainLayout>
           <>
             <LandingPage />
             <UnfairnessSection />
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

<Route path="/terms" element={<TermsOfServicePage />} />

<Route path="/docs" element={
  <MainLayout>
    <DocsLanding />
  </MainLayout>
} />
<Route path="/docs/quickstart" element={
         <MainLayout>
           <QuickstartGuide />
         </MainLayout>
       } />

<Route path="/docs/sdk" element={
         <MainLayout>
           <SDKDocs />
         </MainLayout>
       } />
       <Route path="/docs/database" element={
         <MainLayout>
           <DatabaseSetup />
         </MainLayout>
       } />

<Route path="/docs/api" element={
         <MainLayout>
           <APIReference />
         </MainLayout>
       } />

<Route path="/docs/testshit" element={
         <MainLayout>
           <TestShit />
         </MainLayout>
       } />

<Route path="/docs/webhooks" element={
         <MainLayout>
           <WebhookSetup />
         </MainLayout>
       } />
       <Route path="/docs/guide" element={
         <MainLayout>
           <IntegrationChecklist />
         </MainLayout>
       } />

<Route path="/partners" element={
  <MainLayout>
    <PartnersPage />
  </MainLayout>
} />

<Route path="/ducked" element={
  <MainLayout>
    <DuckedPage />
  </MainLayout>
} />

<Route path="/maison" element={
  <MainLayout>
    <MaisonPage />
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