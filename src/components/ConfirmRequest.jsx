import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

// Determine the appropriate API URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.housetabz.com'
  : 'http://localhost:3004';

const ConfirmRequest = () => {
  const [searchParams] = useSearchParams();
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyShare, setMonthlyShare] = useState(0);
  const [upfrontPledge, setUpfrontPledge] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [showUpfrontInfo, setShowUpfrontInfo] = useState(false);

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        const userId = searchParams.get('user_id');
        if (!userId) throw new Error('User ID is required');

        const userResponse = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
        const { houseId } = userResponse.data;
        const houseResponse = await axios.get(`${API_BASE_URL}/api/houses/${houseId}`);
        const { users } = houseResponse.data;

        setRoommates(users);
        // Calculate per-person amounts based on the number of roommates.
        setUpfrontPledge(parseFloat(searchParams.get('upfront')) / users.length);
        setMonthlyShare(parseFloat(searchParams.get('amount')) / users.length);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    fetchRoommates();
  }, [searchParams]);

  const handleConfirm = async () => {
    try {
      const partnerId = searchParams.get('partner_id');
      const userId = searchParams.get('user_id');

      if (!partnerId) throw new Error('Partner ID is required');
      if (!userId) throw new Error('User ID is required');

      const apiKey = searchParams.get('apiKey');
      const secretKey = searchParams.get('secretKey');
      if (!apiKey || !secretKey) throw new Error('Both API key and Secret key are required');

      const response = await axios.post(
        `${API_BASE_URL}/api/partners/${partnerId}/staged-request`,
        {
          transactionId: searchParams.get('transactionId'),
          serviceName: searchParams.get('serviceName'),
          serviceType: searchParams.get('serviceType'),
          estimatedAmount: parseFloat(searchParams.get('amount')),
          requiredUpfrontPayment: parseFloat(searchParams.get('upfront')),
          userId: userId
        },
        {
          headers: {
            'X-HouseTabz-API-Key': apiKey,
            'X-HouseTabz-Secret-Key': secretKey
          }
        }
      );

      if (response.status === 201 || response.data.success) {
        setIsConfirmed(true);
      }
    } catch (error) {
      console.error('Error creating request:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#dff6f0]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#34d933] border-t-transparent"></div>
          <p className="text-gray-700 font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#dff6f0]">
        <div className="flex flex-col items-center space-y-4 max-w-md px-6 text-center">
          <div className="text-red-500 text-xl mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Error
          </div>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 bg-[#34d399] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#2dbe2c]"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dff6f0] py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
              alt="HouseTabz Logo"
              className="h-16 w-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900">Payment Split Confirmation</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Confirm your ownership below.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Expense Summary */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense Summary</h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col items-center">
                <span className="text-gray-700 font-bold text-3xl">
                  ${upfrontPledge.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 uppercase">Pledge Required</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-600 text-sm">
                  and claim ownership for your portion of this bill:
                </span>
                <span className="text-gray-900 font-bold text-2xl">
                  ${monthlyShare.toFixed(2)}/mo
                </span>
              </div>
              <button 
                className="mt-1"
                onClick={() => setShowUpfrontInfo(!showUpfrontInfo)}
                title="What is this?"
              >
                <InformationCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
              {showUpfrontInfo && (
                <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700 text-center">
                  <p>
                    The one-time pledge is typically a security deposit required by the provider.
                    By confirming, you commit to this pledge and secure your ownership for a monthly charge of ${monthlyShare.toFixed(2)}.
                  </p>
                  <button 
                    className="mt-1 text-blue-500 hover:underline"
                    onClick={() => setShowUpfrontInfo(false)}
                  >
                    Got it, close
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Roommate Split Details */}
          <div className="px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Roommate Split</h2>
            <div className="space-y-3">
              {roommates.map((roommate) => (
                <div key={roommate.id} className="flex justify-between items-center p-4 bg-[#dff6f0] rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#34d933] font-medium">
                        {roommate.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-900 font-medium">{roommate.username}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-semibold text-lg">${monthlyShare.toFixed(2)}/mo</p>
                    {upfrontPledge > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">${upfrontPledge.toFixed(2)} upfront</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-8 py-4 bg-gray-50">
            <p className="text-gray-600 text-center text-sm">
              By clicking “Confirm Your Share”, you commit to the one-time pledge and monthly charge.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 rounded-b-lg">
            {!isConfirmed ? (
              <button 
                className="w-full bg-[#34d399] text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-[#2dbe2c] transition-colors duration-200 mb-4"
                onClick={handleConfirm}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Confirm Your Share</span>
              </button>
            ) : (
              <div className="space-y-3">
                <button 
                  className="w-full bg-gray-200 text-gray-500 py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 cursor-not-allowed"
                  disabled
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Share Confirmed</span>
                </button>
                <p className="text-center text-gray-600 text-sm">
                  Your roommates will be notified to confirm their shares.
                </p>
              </div>
            )}
            
            <button 
              className="w-full mt-3 bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => window.close()}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Security Footer */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure SSL encrypted transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRequest;
