import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body nav.main-navbar, 
      body header.site-header {
        display: none !important;
      }
      body {
        padding-top: 0 !important;
        margin-top: 0 !important;
      }
      footer.simplified-footer {
        padding: 10px;
        text-align: center;
        font-size: 0.75rem;
        background-color: transparent;
        color: #64748b;
        border-top: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sections = [
    {
      title: '1. Introduction',
      content:
        'These Terms govern your use of the Platform provided by HouseTabz, Inc. (“HouseTabz,” “we,” “our,” or “us”). HouseTabz enables households to manage, split, and pay for shared expenses without requiring one individual to front payments or chase reimbursements. By registering, accessing, or using the Platform, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.',
    },
    {
      title: '2. Description of Services',
      content:
        'The Platform allows Users (“you,” “your,” “User”) to: Request the addition of third-party services (e.g., utilities, cleaning, internet) to a shared household account (“House”); Claim ownership of their share of each expense; Pledge upfront payments when required; and Monitor and fulfill their ongoing financial obligations. HouseTabz mirrors third-party billing internally, dividing responsibility among House members. While third-party providers may recognize only a primary account holder, HouseTabz enforces equal responsibility within the Platform.',
    },
    {
      title: '3. User Accounts and Responsibilities',
      content:
        'You agree to: Provide accurate and complete account information; Promptly fund your pledged and ongoing payment obligations; Maintain the confidentiality of your login credentials; Notify us immediately of unauthorized account use. Failure to meet your obligations may affect your account status, your household’s House Status Index (HSI), and access to Platform features.',
    },
    {
      title: '4. House Status Index (HSI)',
      content:
        'The HSI is a proprietary score reflecting a House’s collective payment behavior. It affects: Eligibility for fronted (advanced) payments from HouseTabz; Service fees, penalties, and discounts; Access to premium features. Timely payment improves your HSI; late or missed payments may lower it. HouseTabz reserves the right to adjust the HSI in its sole discretion.',
    },
    {
      title: '5. Financial Terms and Fronting',
      content:
        'Each User is individually responsible for their assigned share of a House Service. HouseTabz may, at its discretion, advance funds (“front”) to cover a shortfall if one or more Users fail to pay, to prevent service disruptions. Any fronted amount creates an immediate repayment obligation for the nonpaying User(s). Service fees, penalties, or interest may apply to late payments, fronted amounts, or returned transactions.',
    },
    {
      title: '6. Fees and Charges',
      content:
        'HouseTabz may charge: Service fees for managing accounts, facilitating payments, and providing premium services; Penalties for late payments or insufficient funds; Fees for payment processing or currency conversion (if applicable). All applicable fees will be disclosed prior to use. By using the Platform, you authorize us to deduct such fees.',
    },
    {
      title: '7. Third-Party Services',
      content:
        'HouseTabz is not a provider of any underlying household services (e.g., utilities, internet). We act solely as a payment facilitator. We: Do not control or guarantee third-party services, pricing, or performance; Are not responsible for service failures, outages, or disputes between you and third-party providers. You must resolve third-party disputes directly with the provider.',
    },
    {
      title: '8. Account Suspension and Termination',
      content:
        'We may suspend, restrict, or terminate your account or access to the Platform if: You violate these Terms or applicable law; You engage in fraud, abuse, or misconduct; You fail to meet your payment obligations. Termination does not release you from outstanding balances or repayment of fronted funds.',
    },
    {
      title: '9. Limitation of Liability',
      content:
        'To the maximum extent permitted by law: HouseTabz is not liable for indirect, incidental, consequential, or punitive damages; We are not responsible for service interruptions, data loss, unauthorized account access, or third-party failures; Our total liability under these Terms is limited to the lesser of (a) $100 or (b) the total amount of fees you paid to us in the preceding 12 months.',
    },
    {
      title: '10. Privacy and Data Use',
      content:
        'Your use of the Platform is subject to our Privacy Policy, which describes how we collect, use, and protect your data. By using the Platform, you consent to these practices.',
    },
    {
      title: '11. Changes to Terms',
      content:
        'We may update these Terms at any time. Material changes will be communicated through the Platform or email. Continued use of the Platform after changes take effect constitutes your acceptance.',
    },
    {
      title: '12. Arbitration and Dispute Resolution',
      content:
        'Any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Platform will be resolved by binding arbitration, except as otherwise provided under applicable law. You waive your right to a trial by jury and to participate in class actions.',
    },
    {
      title: '13. Indemnification',
      content:
        'You agree to indemnify, defend, and hold harmless HouseTabz, its affiliates, officers, and employees from any claims, losses, damages, liabilities, or expenses arising from: Your violation of these Terms; Your use or misuse of the Platform; Your interactions with third-party providers.',
    },
    {
      title: '14. Governing Law',
      content:
        'These Terms are governed by the laws of the State of Texas, without regard to its conflict of law provisions. Any claims or proceedings will be brought exclusively in the state or federal courts located in Randall County, Texas.',
    },
    {
      title: '15. Contact Information',
      content:
        'HouseTabz, Inc. | Email: walt@housetabz.com',
    },
  ];

  return (
    <div className="terms-page min-h-screen w-full bg-[#dff6f0] flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-6">
        <motion.div
          className="bg-white shadow-md rounded-lg w-full max-w-lg p-5 overflow-y-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            HouseTabz Terms of Service
          </h1>
          <p className="text-xs text-gray-500 text-center mb-6">
            Effective Date: May 4, 2025 | Version: 1.0
          </p>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY. By accessing or using the HouseTabz platform (“Platform”), you agree to be bound by these Terms of Service (“Terms”) and our Privacy Policy. If you do not agree, do not access or use the Platform.
          </p>

          {sections.map((section, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {section.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}

          <div className="mt-6 text-xs text-gray-500 text-center">
            Version 1.0 — Effective May 4, 2025
          </div>
        </motion.div>
      </div>

      <footer className="simplified-footer pb-2">
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} HouseTabz, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TermsOfServicePage;
