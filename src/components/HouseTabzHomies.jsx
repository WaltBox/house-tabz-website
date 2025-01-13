import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Rocket,
  Gift, 
  Users,
  TrendingUp
} from 'lucide-react';
import Footer from './Footer';

const HouseTabzHomies = () => {
  return (
    <>
    <section className="relative bg-white overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#dff6f0" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-10 z-0 hidden md:block">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 relative z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Value Proposition */}
          <div className="space-y-12">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-6">
                Coming soon • Only 10 Spots
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Become a <span className="text-emerald-600">HouseTabz Homie</span>
              </h1>

              <p className="text-xl text-gray-600">
                Help launch the first payment method for roommates on your campus 
                and earn money for every new user you bring
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Earn Money</h3>
                <p className="text-gray-600 text-sm">Get paid for every new user you bring to HouseTabz</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Exclusive Perks</h3>
                <p className="text-gray-600 text-sm">VIP access and special discounts for you and your roommates</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Real Experience</h3>
                <p className="text-gray-600 text-sm">Build your marketing portfolio launching a fintech startup</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Campus Pioneer</h3>
                <p className="text-gray-600 text-sm">Be among the first to revolutionize roommate living</p>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-xl font-bold text-gray-900">Join Our Founding Class</h3>
                <p className="text-sm text-gray-500 mt-1">Be one of 10 campus pioneers</p>
              </div>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-emerald-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled
                />
                <input
                  type="email"
                  placeholder="School Email"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-emerald-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled
                />
                <input
                  type="text"
                  placeholder="Instagram Handle"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-emerald-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled
                />
                
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Applications open soon</p>
                      <p className="text-xs text-gray-500">Limited to 10 founding members</p>
                    </div>
                  </div>
                </div>

                {/* <button
                  type="submit"
                  disabled
                  className="w-full px-6 py-4 bg-emerald-500 text-white font-medium rounded-xl opacity-75 cursor-not-allowed"
                >
                  Join the Waitlist
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#dff6f0" d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,144C672,128,768,96,864,74.7C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
    <Footer />
    </>
  );
};

export default HouseTabzHomies;