import React, { useState } from 'react';
import { Share2, Copy, Check, Gift } from 'lucide-react';

const ShareComponent = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);

  const getShareContent = () => {
    return `🎉 Join HouseTabz VIP List!

💰 Get $5 in credits when you sign up using my referral link!

${referralLink}

See you there! 🏠`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Join HouseTabz VIP List',
        text: getShareContent(),
        url: referralLink
      });
    } catch (err) {
      handleCopy();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
            <Gift className="h-6 w-6 text-green-500" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Share & Earn Together! 🎉
          </h3>
          <p className="text-gray-600">
            Invite friends to join HouseTabz and you'll both get $5 in credits when they sign up!
          </p>
        </div>

        {/* Message Preview */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your invitation message:</h4>
          <div className="text-sm text-gray-600 whitespace-pre-line">
            {getShareContent()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              copied 
                ? 'bg-green-50 text-green-600 border border-green-200' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Message</span>
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;