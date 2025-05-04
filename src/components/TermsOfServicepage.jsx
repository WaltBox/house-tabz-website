import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const TermsOfServicePage = () => {
  return (
    <div className="terms-page min-h-screen w-screen bg-[#dff6f0] flex flex-col justify-between pt-20">
      <div className="absolute top-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#b2f1dc"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,149.3C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <motion.div
          className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 overflow-y-auto max-h-[80vh]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 text-center mb-10">
            Effective Date: May 4, 2025 | Version: 1.0
          </p>

          {[
            {
              title: '1. Introduction',
              content:
                'Welcome to HouseTabz, a platform provided by HouseTabz, Inc. ("HouseTabz," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the HouseTabz platform (the "Platform"). By creating an account, accessing, or using the Platform, you agree to be bound by these Terms. Please read them carefully.',
            },
            {
              title: '2. Our Services',
              content:
                'HouseTabz enables households to manage and pay for shared services, including but not limited to utilities, internet, and cleaning services ("HouseServices"). The Platform allows Users to request the addition of services, claim financial responsibility, and track payment obligations.',
            },
            {
              title: '3. User Responsibilities',
              content:
                'By using the Platform, you agree to provide accurate information, maintain the confidentiality of your account, and promptly fund your share of each HouseService. You acknowledge that your participation creates individual financial obligations. Failure to fulfill your obligations may affect your account status and the House Status Index ("HSI") of your household.',
            },
            {
              title: '4. Financial Terms',
              content:
                'Each User is individually responsible for their allocated share of a HouseService. HouseTabz may, at its discretion, advance funds to cover missed payments depending on the household’s HSI. Users must reimburse any fronted amounts. We reserve the right to charge service fees and apply penalties for late or missed payments.',
            },
            {
              title: '5. House Status Index (HSI)',
              content:
                'The HSI is a proprietary score reflecting the payment behavior of a household. It impacts the household’s eligibility for features such as payment advances, discounts, or lower service fees. Negative payment activity may reduce the HSI, while consistent performance may improve it.',
            },
            {
              title: '6. Fees and Charges',
              content:
                'HouseTabz may charge fees for processing payments, managing accounts, and providing premium features. All applicable fees will be disclosed prior to use. By continuing to use the Platform, you agree to pay such fees.',
            },
            {
              title: '7. Third-Party Services and Disputes',
              content:
                'HouseTabz facilitates payments to third-party service providers but is not responsible for their performance, quality, or obligations. Any service disputes must be resolved directly with the provider. HouseTabz disclaims all liability arising from third-party actions.',
            },
            {
              title: '8. Account Suspension and Termination',
              content:
                'We may suspend, restrict, or terminate your account if we determine that you have violated these Terms, engaged in fraudulent activity, or failed to meet payment obligations. Termination does not release you from outstanding balances.',
            },
            {
              title: '9. Limitation of Liability',
              content:
                'To the maximum extent permitted by law, HouseTabz and its affiliates disclaim liability for indirect, incidental, special, or consequential damages arising from your use of the Platform. We are not liable for service interruptions, third-party failures, or unauthorized account access caused by your negligence.',
            },
            {
              title: '10. Privacy and Data Protection',
              content:
                'We are committed to protecting your privacy. Our practices are described in the HouseTabz Privacy Policy, which forms part of these Terms. Please review it carefully.',
            },
            {
              title: '11. Modifications to Terms',
              content:
                'We may update these Terms from time to time. Material changes will be communicated through the Platform or email. Your continued use of the Platform following such updates constitutes acceptance of the revised Terms.',
            },
            {
              title: '12. Governing Law and Jurisdiction',
              content:
                'These Terms are governed by the laws of the State of [Insert State], without regard to conflict of law principles. Any disputes arising under these Terms will be resolved in the courts located in [Insert Jurisdiction].',
            },
            {
              title: '13. Contact Information',
              content:
                'HouseTabz, Inc. | walt@housetabz.com',
            },
          ].map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div className="mt-10 text-sm text-gray-500 text-center">
            Version 1.0 — Effective May 4, 2025
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
