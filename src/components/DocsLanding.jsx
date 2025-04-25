import React, { useState } from 'react';
import { 
  Home,
  Rocket,
  Code, 
  Database, 
  Webhook, 
  FileText,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const DocsLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-montserrat">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Top Navigation Bar - Simplified */}
      <header className="fixed w-full z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <img 
                  src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
                  alt="HouseTabz Logo" 
                  className="h-8"
                />
              </a>
              <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                <a href="/docs" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-green-500">
                  Docs
                </a>
                <a href="/api-reference" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  API Reference
                </a>
                <a href="/support" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Support
                </a>
              </nav>
            </div>

            <div className="flex items-center">
              <a
                href="/dashboard"
                className="hidden lg:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Dashboard
              </a>
              <button
                type="button"
                className="lg:hidden p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Mobile Side Navigation */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <img 
              src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
              alt="HouseTabz Logo" 
              className="h-8"
            />
            <button
              type="button"
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem 
              icon={<Home className="w-5 h-5" />}
              title="Home"
              isActive={true}
              href="/docs"
              mobile
            />
            <NavItem 
              icon={<Rocket className="w-5 h-5" />}
              title="Quickstart"
              href="/docs/quickstart"
              mobile
            />
            <NavItem 
              icon={<Code className="w-5 h-5" />}
              title="SDK"
              href="/docs/sdk"
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="Database"
              href="/docs/database"
              mobile
            />
            <NavItem 
              icon={<FileText className="w-5 h-5" />}
              title="API"
              href="/docs/api"
              mobile
            />
            <NavItem 
              icon={<Webhook className="w-5 h-5" />}
              title="Webhooks"
              href="/docs/webhooks"
              mobile
            />
              <NavItem 
    icon={<ChevronRight className="w-5 h-5 transform rotate-180" />}
    title="Back to Docs"
    isActive={false}
    onClick={() => window.location.href = '/docs'}
    mobile
  />
          </nav>
        </div>

        {/* Fixed Side Navigation */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto pt-6">
            <div className="px-6 pb-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
            </div>
            
            <nav className="px-6 pt-2">
              <ul className="space-y-1">
                <NavItem 
                  icon={<Home className="w-5 h-5" />}
                  title="Home"
                  isActive={true}
                  href="/docs"
                />
                <NavItem 
                  icon={<Rocket className="w-5 h-5" />}
                  title="Quickstart"
                  href="/docs/quickstart"
                />
                <NavItem 
                  icon={<Code className="w-5 h-5" />}
                  title="SDK"
                  href="/docs/sdk"
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="Database"
                  href="/docs/database"
                />
                <NavItem 
                  icon={<FileText className="w-5 h-5" />}
                  title="API"
                  href="/docs/api"
                />
                <NavItem 
                  icon={<Webhook className="w-5 h-5" />}
                  title="Webhooks"
                  href="/docs/webhooks"
                />
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64">
          {/* Hero Section */}
          <div className="px-6 py-12 sm:px-8 sm:py-16 lg:py-20 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  HouseTabz Documentation
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Learn how to integrate HouseTabz payments into your platform.
                </p>
              </div>
              <img 
                src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
                alt="HouseTabz Logo" 
                className="relative w-full max-w-xs mx-auto"
              />
            </div>
          </div>
          
          {/* Documentation Cards */}
          <div className="px-6 pb-16 sm:px-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
              Guides & References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocCard 
                title="Quickstart"
                description="Get up and running with HouseTabz in minutes"
                icon={<Rocket className="w-6 h-6 text-white" />}
                href="/docs/quickstart"
              />
              
              <DocCard 
                title="SDK Integration"
                description="Add HouseTabz to your checkout page"
                icon={<Code className="w-6 h-6 text-white" />}
                href="/docs/sdk"
              />
              
              <DocCard 
                title="Database Setup"
                description="Database requirements for HouseTabz"
                icon={<Database className="w-6 h-6 text-white" />}
                href="/docs/database"
              />
              
              <DocCard 
                title="API Reference"
                description="Complete API endpoint reference"
                icon={<FileText className="w-6 h-6 text-white" />}
                href="/docs/api"
              />
              
              <DocCard 
                title="Webhooks"
                description="Configure real-time payment notifications"
                icon={<Webhook className="w-6 h-6 text-white" />}
                href="/docs/webhooks"
              />

              {/* <DocCard 
                title="Integration Guide"
                description="Recommended integration Guide"
                icon={<FileText className="w-6 h-6 text-white" />}
                href="/docs/guide"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HouseTabz. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add Montserrat font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        /* Apply Montserrat to all text */
        html {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, title, isActive, href, mobile = false }) => {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center space-x-3 p-2 rounded-lg ${
          isActive 
            ? 'bg-green-50 text-green-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${mobile ? 'text-base' : 'text-sm'}`}
        style={{ color: isActive ? '#34d399' : '' }}
      >
        <span className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} style={{ color: isActive ? '#34d399' : '' }}>
          {icon}
        </span>
        <span>{title}</span>
      </a>
    </li>
  );
};

// Documentation Card Component
const DocCard = ({ title, description, icon, href }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col hover:border-green-300 transition-colors duration-150 h-full">
      <div className="p-6 flex-1">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#34d399' }}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <a 
          href={href} 
          className="inline-flex items-center text-sm font-medium hover:text-green-700"
          style={{ color: '#34d399' }}
        >
          Get Started
          <ChevronRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default DocsLanding;