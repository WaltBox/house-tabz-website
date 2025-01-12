import React, { useState, useRef } from 'react';
import { Share2, Copy } from 'lucide-react';

const ShareComponent = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);
  const componentRef = useRef(null);

  const getShareContent = () => {
    return `Join HouseTabz VIP List! 🏠

Get $5 in credits when you join using my referral link, and I'll get $5 too when you activate a service.

👉 ${referralLink}

Join now and let's both save!`;
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
      console.error('Error sharing:', err);
      // Fallback to copy if sharing fails
      handleCopy();
    }
  };

  return (
    <div className="space-y-4" ref={componentRef}>
      <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-gray-700 font-medium mb-2">
          Share this invitation with friends and family:
        </div>
        <div className="text-gray-600 whitespace-pre-line">
          {getShareContent()}
        </div>
        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {copied ? (
              <span className="text-green-500">Copied!</span>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
          {navigator.share && (
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;