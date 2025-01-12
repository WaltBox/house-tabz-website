import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import vipInviteImage from '../assets/housetabzvipinvite.png';

const ShareComponent = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Join HouseTabz VIP List 🏠',
        text: 'Get $5 in credits when you join!',
        url: referralLink
      });
    } catch (err) {
      handleCopy();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Preview Card */}
      <div className="relative">
        <img 
          src={vipInviteImage} 
          alt="HouseTabz VIP Invite" 
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold mb-1">HouseTabz VIP List 🏠</h3>
            <p className="text-sm opacity-90">Exclusive rewards await!</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Share your invite link
          </h4>
          <p className="text-sm text-gray-600">
            When your friends join, you'll both get $5 in credits!
          </p>
        </div>

        {/* Link Display */}
        <div className="mb-6 bg-gray-50 rounded-lg p-3 flex items-center justify-between">
          <div className="truncate text-sm text-gray-600">
            {referralLink}
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
                <span>Copy Link</span>
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