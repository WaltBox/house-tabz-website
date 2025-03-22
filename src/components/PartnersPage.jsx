import React, { useState } from 'react';
import Footer from './Footer';
import ProblemStatement from './ProblemStatement';
import IndustrySelector from './IndustrySelector';
import IndustryInfo from './IndustryInfo';
import PartnerBenefits from './PartnerBenefits';
import IntegrationSection from './IntegrationSection';
import FAQSection from './FAQSection';
import PartnerForm from './PartnerForm';

const PartnersPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('energy');
  
  return (
    <div className="partners-page flex flex-col min-h-screen bg-gradient-to-br from-[#dff6f0] to-white">
      <div className="content flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <ProblemStatement />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Market <span className="text-[#34d399]">Opportunity</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Join HouseTabz to access a growing market of shared households. Our platform connects service providers like you
              directly with groups of roommates who are actively seeking a unified way to pay for bills.
            </p>
          </div>
          <IndustrySelector selectedIndustry={selectedIndustry} setSelectedIndustry={setSelectedIndustry} />
          <IndustryInfo selectedIndustry={selectedIndustry} />
          <PartnerBenefits />
          <IntegrationSection />
          <FAQSection />
          <PartnerForm />
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        @media (max-width: 768px) {
          .industry-selector button {
            font-size: 0.85rem;
            padding: 0.5rem 0.75rem;
          }
          table {
            font-size: 0.75rem;
          }
          th, td {
            padding: 0.5rem 0.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnersPage;