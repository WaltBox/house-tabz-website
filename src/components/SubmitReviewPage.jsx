import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubmitReviewPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    content: '',
    location: '',
    occupation: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please upload a valid image file (JPG, PNG, GIF, or WebP)'
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'Image must be smaller than 5MB'
        });
        return;
      }

      setProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous error
      setSubmitStatus(null);
    }
  };

  const removeImage = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
    // Reset file input
    const fileInput = document.getElementById('profilePicture');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.content.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitFormData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitFormData.append(key, formData[key]);
        }
      });
      
      // Add profile picture if selected
      if (profilePicture) {
        submitFormData.append('profileImage', profilePicture);
      }

      const response = await fetch('https://api.housetabz.com/api/reviews', {
        method: 'POST',
        body: submitFormData
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your review! 🎉 It will be published after approval.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          rating: 5,
          title: '',
          content: '',
          location: '',
          occupation: ''
        });
        setProfilePicture(null);
        setPreviewUrl(null);
        
        // Reset file input
        const fileInput = document.getElementById('profilePicture');
        if (fileInput) fileInput.value = '';
        
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to submit review. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: index + 1 }))}
        className={`w-8 h-8 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        } hover:text-yellow-400 transition-colors duration-200`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#34d399]/6 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#34d399]/8 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#34d399]/4 rounded-full"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png"
              alt="HouseTabz logo"
              className="h-12 w-auto"
            />
            <h1 className="text-3xl font-black text-[#34d399]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              HouseTabz
            </h1>
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Share Your Experience
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Help other roommates discover the HouseTabz difference
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Upload */}
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Profile Picture (Optional)
            </label>
            
            {previewUrl ? (
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#34d399]/20"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="inline-block">
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-[#34d399]/40 rounded-full hover:border-[#34d399] transition-colors duration-200"
                >
                  <svg className="w-8 h-8 text-[#34d399] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm text-gray-600">Add Photo</span>
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              JPG, PNG, GIF, or WebP • Max 5MB
            </p>
          </div>

          {/* Name (Required) */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-900 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={50}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll only use this to follow up if needed
            </p>
          </div>

          {/* Rating (Required) */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Rating *
            </label>
            <div className="flex items-center gap-2 mb-2">
              {renderStars(formData.rating)}
              <span className="ml-3 text-lg font-medium text-gray-700">
                {formData.rating}/5 stars
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Click the stars to rate your experience
            </p>
          </div>

          {/* Review Title (Optional) */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-2">
              Review Title (Optional)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200"
              placeholder="Sum up your experience in a few words"
            />
          </div>

          {/* Review Content (Required) */}
          <div>
            <label htmlFor="content" className="block text-lg font-semibold text-gray-900 mb-2">
              Your Review *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={6}
              maxLength={1000}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about your experience with HouseTabz. How has it helped you and your roommates?"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.content.length}/1000 characters
            </p>
          </div>

          {/* Location (Optional) */}
          <div>
            <label htmlFor="location" className="block text-lg font-semibold text-gray-900 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200"
              placeholder="City, State"
            />
          </div>

          {/* Occupation (Optional) */}
          <div>
            <label htmlFor="occupation" className="block text-lg font-semibold text-gray-900 mb-2">
              Occupation (Optional)
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34d399] focus:border-transparent transition-all duration-200"
              placeholder="Student, Software Engineer, etc."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#34d399] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#10b981] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting Review...
              </span>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
            submitStatus.type === 'success' 
              ? 'bg-[#34d399]/10 text-[#34d399]' 
              : 'bg-red-50 text-red-600'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Bottom Link */}
        <div className="text-center mt-12">
          <Link to="/" className="text-gray-600 hover:text-[#34d399] transition-colors duration-300 font-medium">
            ← Back to HouseTabz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
