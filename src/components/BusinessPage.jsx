import React from 'react';
import BusinessBenefits from './BusinessBenefits'; // Ensure path is correct
import HowToPartner from './HowToPartner';
import IndustriesOfBenefit from './IndustriesOfBenefit';
import Footer from './Footer';
import PartnerForm from './PartnerForm';
const BusinessPage = () => {
  return (
    <div className="business-page min-h-screen bg-gray-50">
      <BusinessBenefits />
      <HowToPartner />
      <IndustriesOfBenefit />
      <PartnerForm />
      <Footer />
    </div>
  );
};

export default BusinessPage;
