import React, { useState, useEffect, useMemo } from 'react';
import frustratedTeddy from '../assets/frustratedteddy.png';
import ReviewsSection from './ReviewsSection';

const UnfairnessSection = ({ reviews, reviewsStats, reviewsLoading }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  // Chat messages with metadata - 2 weeks apart
  const chatMessages = useMemo(() => [
    { sender: 'Teddy', text: 'Can yall complete Venmo\'s soon', time: '2:14 PM', date: 'Sep 1', isGrouped: false },
    { sender: 'Teddy', text: 'Like any of them left a couple. Some of y\'all owe me a few.', time: '2:15 PM', date: 'Sep 1', isGrouped: true },
    { sender: 'Teddy', text: 'Need Venmo\'s.', time: '4:22 PM', date: 'Sep 15', isGrouped: false },
    { sender: 'Walt', text: 'who tryna rip some blackjack', time: '7:10 PM', date: 'Sep 15', isGrouped: false },
    { sender: 'Teddy', text: 'Bro pay me', time: '7:11 PM', date: 'Sep 15', isGrouped: false },
    { sender: 'Teddy', text: 'Please try to get Venmo\'s in soon.', time: '9:12 AM', date: 'Sep 29', isGrouped: false },
    { sender: 'Harrison', text: 'Anyone else hungy for margarita?', time: '11:30 AM', date: 'Sep 29', isGrouped: false },
    { sender: 'Teddy', text: 'Need y\'all to pay me Venmo\'s.', time: '3:45 PM', date: 'Oct 13', isGrouped: false },
    { sender: 'Walt', text: 'Yo whys the internet so slow', time: '4:00 PM', date: 'Oct 13', isGrouped: false },
    { sender: 'Teddy', text: 'Venmo\'s today so we dont get a late fee.', time: '8:15 AM', date: 'Oct 27', isGrouped: false },
    { sender: 'Harrison', text: 'whos tryna get sushi', time: '10:22 AM', date: 'Oct 27', isGrouped: false },
    { sender: 'Teddy', text: 'I actually need Venmo asap because there will be a late fee tomorrow and I will not pay it.', time: '7:30 PM', date: 'Nov 10', isGrouped: false },
    { sender: 'Connor', text: 'Anyone wanna go see a comedy show?', time: '8:15 PM', date: 'Nov 10', isGrouped: false },
    { sender: 'Teddy', text: 'Please pay Venmos.', time: '11:20 AM', date: 'Nov 24', isGrouped: false },
    { sender: 'Teddy', text: 'Need Venmos', time: '2:15 PM', date: 'Dec 8', isGrouped: false },
    { sender: 'Stratton', text: 'anyone tryna go to topgolf', time: '3:00 PM', date: 'Dec 8', isGrouped: false },
    { sender: 'Teddy', text: 'I need yall to pay Venmo\'s by tomorrow so we don\'t get a late fee.', time: '6:45 PM', date: 'Dec 22', isGrouped: false },
    { sender: 'Teddy', text: 'Please pay Venmo\'s so we can get good WI-FI again 🙏', time: '9:30 AM', date: 'Jan 5', isGrouped: false },
    { sender: 'Walt', text: 'My tummy hurts', time: '10:15 AM', date: 'Jan 5', isGrouped: false },
    { sender: 'Teddy', text: 'Lol its 52 degrees in the house.', time: '1:45 PM', date: 'Jan 19', isGrouped: false },
    { sender: 'Teddy', text: 'Also need Venmo\'s asap.', time: '1:46 PM', date: 'Jan 19', isGrouped: true },
    { sender: 'Harrison', text: 'whos tryna go skiing this weekend', time: '2:30 PM', date: 'Jan 19', isGrouped: false },
    { sender: 'Teddy', text: 'Stratton, Harrison and Connor pay Venmos.', time: '4:20 PM', date: 'Feb 2', isGrouped: false },
    { sender: 'Teddy', text: 'Stratton you owe two still.', time: '4:21 PM', date: 'Feb 2', isGrouped: true },
    { sender: 'Connor', text: 'Anyone tryna golf?', time: '5:00 PM', date: 'Feb 2', isGrouped: false },
    { sender: 'Teddy', text: 'Just sent out Venmo for this months shit please pay when u can', time: '8:15 AM', date: 'Feb 16', isGrouped: false },
    { sender: 'Teddy', text: 'Can y\'all pay Venmo requests.', time: '2:30 PM', date: 'Mar 2', isGrouped: false },
    { sender: 'Stratton', text: 'y\'all tryna hit the bar?', time: '12:45 PM', date: 'Mar 2', isGrouped: false },
    { sender: 'Teddy', text: 'Can y\'all complete Venmo requests today.', time: '4:15 PM', date: 'Mar 16', isGrouped: false },
    { sender: 'Walt', text: 'Teddy whys it so cold in here?', time: '5:20 PM', date: 'Mar 16', isGrouped: false },
    { sender: 'Teddy', text: 'Walt you still never paid rent.', time: '7:45 PM', date: 'Mar 30', isGrouped: false },
    { sender: 'Teddy', text: 'Also everyone complete my Venmo requests please.', time: '7:46 PM', date: 'Mar 30', isGrouped: true },
    { sender: 'Teddy', text: 'I really dont have money.', time: '7:47 PM', date: 'Mar 30', isGrouped: true },
    { sender: 'Harrison', text: 'whos tryna go to that new restaurant', time: '8:30 PM', date: 'Mar 30', isGrouped: false },
    { sender: 'Teddy', text: 'Going to have to just start requesting yalls parents on zelle or venmo.', time: '10:20 AM', date: 'Apr 13', isGrouped: false },
    { sender: 'Teddy', text: 'I cant be out money for weeks at a time for doing a favor.', time: '10:21 AM', date: 'Apr 13', isGrouped: true },
    { sender: 'Teddy', text: 'Can y\'all pay wifi Venmo please. After this I will just start including it into utilities so itll be one payment per month.', time: '5:30 PM', date: 'Apr 27', isGrouped: false },
    { sender: 'Teddy', text: 'Stratton also the only one who hasnt paid for utilities.', time: '8:15 PM', date: 'May 11', isGrouped: false },
    { sender: 'Teddy', text: 'Connor and Henry can y\'all pay me for internet.', time: '8:16 PM', date: 'May 11', isGrouped: true }
  ], []);

  // Start simulation
  const startSimulation = () => {
    setIsSimulationRunning(true);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
  };

  // Auto-advance messages during simulation
  useEffect(() => {
    let interval;
    if (isSimulationRunning && currentMessageIndex < chatMessages.length) {
      interval = setInterval(() => {
        const newMessage = chatMessages[currentMessageIndex];
        setDisplayedMessages(prev => [...prev, newMessage]);
        
        // Check if this is the last message before incrementing
        if (currentMessageIndex >= chatMessages.length - 1) {
          setIsSimulationRunning(false);
        }
        setCurrentMessageIndex(prev => prev + 1);
      }, 800); // Faster timing for better animation
    }
    return () => clearInterval(interval);
  }, [isSimulationRunning, currentMessageIndex, chatMessages]);

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
  };

  return (
    <>
    <section className="relative py-12 px-6 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Light background tint */}
        <div className="absolute inset-0 bg-gray-50/40"></div>
        
        {/* Simple geometric shapes - very subtle */}
        <div className="absolute top-24 right-24 w-20 h-20 bg-green-100/25 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-green-50/20 rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em', fontWeight: 900 }}>
            No one wants to be like Teddy
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            It's unfair that one roommate gets stuck fronting bills and chasing reimbursements
          </p>
        </div>


        {/* Controls and Note */}
        <div className="text-center mb-8">
          {/* Controls */}
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0em' }}>Watch the Simulation</p>
            <div className="flex justify-center gap-3">
              {!isSimulationRunning && displayedMessages.length === 0 && (
                <button
                  onClick={startSimulation}
                  className="bg-[#34d399] text-white p-3 rounded-full hover:bg-[#10b981] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              
              {isSimulationRunning && (
                <button
                  disabled
                  className="bg-[#34d399] text-white p-3 rounded-full opacity-75 cursor-not-allowed"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              
              {displayedMessages.length > 0 && !isSimulationRunning && (
                <button
                  onClick={resetSimulation}
                  className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              * These are real messages from Walt's junior year of college
            </p>
          </div>
        </div>

        {/* Phone Mockup with Chat Interface and Frustrated Teddy */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-8 max-w-6xl mx-auto">
          {/* Frustrated Teddy Image */}
          <div className="flex-shrink-0 lg:order-1">
            <img 
              src={frustratedTeddy} 
              alt="Frustrated Teddy crossing his arms" 
              className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain drop-shadow-lg"
            />
          </div>
          
          {/* Phone Mockup */}
          <div className="relative max-w-xs mx-auto lg:order-2">
          {/* Wave Background */}
          <div className="absolute inset-0 -z-10 transform scale-200">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d="M0,200 Q100,120 200,200 T400,200 L400,400 L0,400 Z"
                fill="url(#waveGradient)"
                className="animate-pulse"
              />
              <path
                d="M0,250 Q150,180 300,250 T600,250 L600,400 L0,400 Z"
                fill="#34d399"
                fillOpacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </svg>
          </div>
          
          {/* Phone Frame */}
          <div className="relative bg-black rounded-[3rem] p-1 shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10"></div>
            
            <div className="bg-white rounded-[2.8rem] overflow-hidden h-full flex flex-col relative">
              {/* Status Bar */}
              <div className="bg-white px-6 pt-8 pb-2 flex justify-between items-center text-xs font-semibold">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                  {/* Signal bars */}
                  <div className="flex items-end space-x-0.5">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-2 bg-black rounded-full"></div>
                    <div className="w-1 h-3 bg-black rounded-full"></div>
                    <div className="w-1 h-4 bg-black rounded-full"></div>
                  </div>
                  {/* WiFi icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 0 1 .808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 0 1-1.414 1.414zM14.95 11.05a7 7 0 0 0-9.9 0 1 1 0 0 1-1.414-1.414 9 9 0 0 1 12.728 0 1 1 0 0 1-1.414 1.414zM12.12 13.88a3 3 0 0 0-4.24 0 1 1 0 0 1-1.415-1.415 5 5 0 0 1 7.07 0 1 1 0 0 1-1.415 1.415zM9 16a1 1 0 0 1 2 0 1 1 0 0 1-2 0z"/>
                  </svg>
                  {/* Battery icon */}
                  <div className="flex items-center">
                    <div className="w-6 h-3 border border-black rounded-sm relative">
                      <div className="w-4 h-1.5 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
                    </div>
                    <div className="w-0.5 h-1.5 bg-black rounded-r-sm ml-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Chat Header */}
              <div className="bg-gray-50 px-4 py-3 flex items-center space-x-3 border-b border-gray-200">
                {/* Back arrow */}
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                
                {/* Group avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🌴</span>
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-base text-black">Palm House 🌴</p>
                  <p className="text-xs text-gray-500">Walt, Teddy, Harrison,+3</p>
                </div>
                
                {/* Info icon */}
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto bg-white p-4 space-y-1 relative">
                {displayedMessages.length === 0 && !isSimulationRunning ? (
                  // Empty thread state
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No messages yet</p>
                    <p className="text-gray-400 text-xs mt-1">Start the simulation to see Teddy's pain unfold</p>
                  </div>
                ) : (
                  displayedMessages.map((message, index) => {
                  const prevMessage = displayedMessages[index - 1];
                  const nextMessage = displayedMessages[index + 1];
                  const isFirstInGroup = !message.isGrouped;
                  const isLastInGroup = !nextMessage?.isGrouped || nextMessage?.sender !== message.sender;
                  
                  return (
                    <div key={index} className="animate-fadeIn">
                      {/* Date separator - only show if date changes AND it's not a grouped message */}
                      {(index === 0 || (prevMessage?.date !== message.date && !message.isGrouped)) && (
                        <div className="text-center my-3">
                          <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                            {message.date}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${message.sender === 'Teddy' ? 'justify-start' : 'justify-end'} ${
                        message.isGrouped ? 'mb-1' : 'mb-3'
                      }`}>
                        <div className="max-w-[85%]">
                          {/* Show sender name only for first message in group and non-Teddy messages */}
                          {isFirstInGroup && message.sender !== 'Teddy' && (
                            <p className="text-xs text-gray-500 mb-1 text-right">{message.sender}</p>
                          )}
                          
                          <div className={`${
                            message.sender === 'Teddy' 
                              ? 'bg-gray-200 text-black' 
                              : 'bg-[#007AFF] text-white'
                          } px-3 py-2 max-w-xs ${
                            // iMessage-style rounded corners based on position in group
                            message.sender === 'Teddy' 
                              ? isFirstInGroup && isLastInGroup 
                                ? 'rounded-2xl'
                                : isFirstInGroup 
                                ? 'rounded-2xl rounded-bl-lg'
                                : isLastInGroup
                                ? 'rounded-2xl rounded-tl-lg'
                                : 'rounded-r-2xl rounded-l-lg'
                              : isFirstInGroup && isLastInGroup 
                                ? 'rounded-2xl'
                                : isFirstInGroup 
                                ? 'rounded-2xl rounded-br-lg'
                                : isLastInGroup
                                ? 'rounded-2xl rounded-tr-lg'
                                : 'rounded-l-2xl rounded-r-lg'
                          }`}>
                            <p className="text-sm font-medium">{message.text}</p>
                            
                            {/* Show timestamp only on last message in group */}
                            {isLastInGroup && (
                              <p className={`text-xs mt-1 opacity-70 ${
                                message.sender === 'Teddy' ? 'text-gray-600' : 'text-white'
                              }`}>
                                {message.time}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  })
                )}
                
                
                {/* Typing Indicator */}
                {isSimulationRunning && currentMessageIndex < chatMessages.length && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>

    {/* Reviews Section */}
    <ReviewsSection 
      reviews={reviews}
      reviewsStats={reviewsStats}
      reviewsLoading={reviewsLoading}
    />

        {/* Call to Action */}
        <div className="relative text-center py-16 bg-gray-50 overflow-hidden rounded-3xl mx-6 my-8">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Very light pattern */}
            <div className="absolute top-12 right-12 w-16 h-16 bg-green-200/15 rounded-full"></div>
            <div className="absolute bottom-16 left-12 w-12 h-12 bg-green-100/20 rounded-full"></div>
          </div>
          {/* Stat */}
          <div className="relative mb-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <div className="w-2 h-2 bg-[#34d399] rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Live from our beta users
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>
              $25,000+
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              in shared bills paid using HouseTabz
            </p>
          </div>

          {/* CTA */}
          <div className="relative max-w-4xl mx-auto px-8">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em' }}>
              Join the beta
            </h4>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              Be among the first to experience stress-free shared payments
            </p>
            
            <a 
              href="https://testflight.apple.com/join/QAMFMXVJ"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#34d399] to-[#10b981] text-white px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#34d399]/20 active:scale-98 overflow-hidden"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: '0 20px 40px rgba(52, 211, 153, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Apple logo with subtle animation */}
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>

              {/* Text with subtle animation */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Download on TestFlight
              </span>

              {/* Arrow with bounce animation */}
              <svg className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>

              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            </a>

            <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Beta testing • iOS 14+ required • Free to join
            </p>
          </div>
        </div>


    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `}</style>
    </>
  );
};

export default UnfairnessSection;