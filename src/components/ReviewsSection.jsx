import React, { useState, useEffect } from 'react';

const ReviewsSection = ({ reviews = [], reviewsStats = null, reviewsLoading = false }) => {

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (reviewsLoading) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>
              What our users say
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Real feedback from real roommates
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34d399]"></div>
          </div>
        </div>
      </section>
    );
  }


  if (reviews.length === 0) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>
            What our users say
          </h2>
          <p className="text-gray-500">Be the first to leave a review!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 px-6 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gray-50/30"></div>
        <div className="absolute top-32 right-32 w-24 h-24 bg-green-100/20 rounded-full"></div>
        <div className="absolute bottom-24 left-24 w-32 h-32 bg-green-50/25 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-100/15 rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>
            What our users say
          </h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-6">
            Real feedback from real roommates who've experienced the HouseTabz difference
          </p>
          
          {/* Statistics */}
          {reviewsStats && reviewsStats.totalReviews > 0 && (
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="flex">
                {renderStars(Math.round(reviewsStats.averageRating))}
              </div>
              <span className="font-semibold text-gray-900">
                {reviewsStats.averageRating.toFixed(1)} out of 5
              </span>
              <span className="text-gray-500">
                ({reviewsStats.totalReviews} review{reviewsStats.totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt={`${review.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34d399] to-[#10b981] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {review.name}
                  </h3>
                  {review.location && (
                    <p className="text-sm text-gray-500">{review.location}</p>
                  )}
                  {review.occupation && (
                    <p className="text-sm text-gray-500">{review.occupation}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {review.rating}/5
                </span>
              </div>

              {/* Review Title */}
              {review.title && (
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  "{review.title}"
                </h4>
              )}

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {review.content}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
