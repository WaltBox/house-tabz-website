import React, { useState } from 'react';
import { Share2, Copy, Check, Gift } from 'lucide-react';

const ShareComponent = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);

  const getShareContent = () => {
    return `🏠 Join the HouseTabz VIP List!

Get early access to the first payment method created for roommates. ✨

We'll both get $5 in credits when you activate your first service! 🎉

${referralLink}

Help us reach 1,000 VIP members! 🚀`;
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
    <div className="max-w-lg mx-auto w-full px-4 sm:px-0 bg-white rounded-xl shadow-lg overflow-hidden">
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
            Share & Earn $5! ✨
          </h3>
          <div className="bg-green-50 rounded-lg p-3 mt-2">
            <p className="text-green-800 text-sm font-medium">
              Goal: 1,000 VIP Members! 🎯
            </p>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mb-6 -mx-6 sm:mx-0">  
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your invitation message:</h4>
          <div className="text-sm text-gray-600 whitespace-pre-line">
            {getShareContent()}
          </div>
        </div>
        </div>

        {/* Action Buttons */}
 {/* Action Buttons */}
<div className="flex gap-2 sm:gap-3">  {/* Reduced gap on mobile */}
  <button
    onClick={handleCopy}
    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
      copied 
        ? 'bg-green-50 text-green-600 border border-green-200' 
        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
    }`}
  >
    {copied ? (
      <>
        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>Copied!</span>
      </>
    ) : (
      <>
        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>Copy Message</span>
      </>
    )}
  </button>
  <button
    onClick={handleShare}
    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
  >
    <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
    <span>Share</span>
  </button>
</div>
      </div>
    </div>
  );
};

export default ShareComponent;