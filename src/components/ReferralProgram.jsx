import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Gift, Users, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ShareComponent from './ShareComponent';
import Footer from './Footer';

const ReferralProgram = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [referralLink, setReferralLink] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotten, setIsForgotten] = useState(false);
  const API_BASE_URL = 'https://api.housetabz.com/api';
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    earnedRewards: 0,
  });

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Failed to copy link. Please try manually.',
      });
    }
  }, [referralLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://api.housetabz.com/api/referral-program', formData);
      setReferralLink(response.data.link);
      setStatus({ type: 'success', message: 'Referral link generated successfully!' });
    } catch (error) {
      console.error('Error generating referral link:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to generate referral link.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  const features = [
    {
      icon: <Gift className="w-6 h-6 text-green-500" />,
      title: "Earn $5 Credit",
      description: "Each person you refer receives a $5 credit, and you get $5 too when they activate a service.",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Unlimited Referrals",
      description: "Refer as many friends and family members as you'd like to the VIP list.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-green-500" />,
      title: "Easy Sharing",
      description: "Quickly share your referral link via text, email, or social media.",
    },
  ];

  return (
    <section>
      <section className="referral-program bg-gradient-to-b from-[#dff6f0] to-white py-16 px-8">
        <div className="max-w-7xl mx-auto mt-20">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Refer Your Friends, <span className="text-green-500">Earn Rewards</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Share HouseTabz with friends and family! When someone you refer joins the VIP list and activates a service, 
                <span className="text-green-500 font-semibold"> you both get $5</span> in HouseTabz credits.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-2">
                It’s easy—refer as many people as you like and start earning today!
              </p>
            </motion.div>

            {/* Stats Section */}
            
              <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="referral-card">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Help Us Reach 1,000 VIP Listers!
                  </h3>
                  <p className="text-lg text-white">
                    Join the movement! Invite your friends and family to the VIP list and help us hit our goal by fall. Each referral gets you <span className="font-semibold">$5</span> in credits when they activate a service.
                  </p>
                  <div className="mt-6">
                  </div>
                </div>
              </div>
            </motion.div>
            
       
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Form Section */}
        {/* Form Section */}
<motion.div
  className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
>
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-800">
      {referralLink ? 'Your Referral Link' : 'Generate Your Referral Link'}
    </h2>
    {!referralLink && (
      <p className="text-sm text-gray-600 mt-2">
        {isForgotten
          ? 'Enter your email to retrieve your referral link.'
          : 'Enter your details below to get your personalized referral link.'}
      </p>
    )}

<form
  onSubmit={async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const endpoint = `${API_BASE_URL}/referral-program`;
      let response;

      if (isForgotten) {
        // For forgotten link: Make a GET request with email as a query parameter
        response = await axios.get(endpoint, {
          params: { email: formData.email },
        });
      } else {
        // For generating new link: Make a POST request with form data
        response = await axios.post(endpoint, formData);
      }

      if (response.data.link) {
        setReferralLink(response.data.link);
        setStatus({
          type: 'success',
          message: isForgotten
            ? 'Referral link retrieved successfully!'
            : 'Referral link generated successfully!',
        });
      } else {
        setStatus({ type: 'error', message: 'No referral link found or created.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }}
  className="space-y-6 mt-6"
>
  {!isForgotten && (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
        placeholder="Enter your name"
        required={!isForgotten}
      />
    </div>
  )}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
      placeholder="Enter your email"
      required
    />
  </div>
  <button
    type="submit"
    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
    disabled={isSubmitting}
  >
    {isSubmitting
      ? 'Processing...'
      : isForgotten
      ? 'Get Link'
      : 'Generate Your Referral Link'}
  </button>
</form>

<p
  className="text-sm text-green-600 underline mt-4 cursor-pointer"
  onClick={() => {
    setIsForgotten(!isForgotten);
    setFormData({ name: '', email: '' });
    setReferralLink('');
    setStatus({ type: '', message: '' });
  }}
>
  {isForgotten ? 'Back' : 'I forgot my ref link'}
</p>

{status.message && (
  <div
    className={`mt-4 p-4 rounded-lg ${
      status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
    }`}
  >
    <p className="text-sm font-medium">{status.message}</p>
  </div>
)}

{referralLink && (
  <div className="mt-6">
    <ShareComponent
      referralLink={referralLink}
    />
  </div>
)}

  </div>
</motion.div>





        </div>
      </section>
      <Footer />

      <style>{`
        .referral-card {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          border-radius: 20px;
          padding: 2rem;
          color: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          text-align: center;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ReferralProgram;
