import React, { useState, useRef, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Webhook, 
  FileText, 
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Clock,
  AlertCircle,
  Users,
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const IntegrationGuide = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Import Montserrat font
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  // Refs for scrolling to sections
  const overviewRef = useRef(null);
  const setupRef = useRef(null);
  const frontendRef = useRef(null);
  const databaseRef = useRef(null);
  const webhookRef = useRef(null);
  const testingRef = useRef(null);
  const faqRef = useRef(null);
  
  const contentRefs = {
    overview: overviewRef,
    setup: setupRef,
    frontend: frontendRef,
    database: databaseRef,
    webhook: webhookRef,
    testing: testingRef,
    faq: faqRef
  };
  
  // Handle navigation click
  const navigateTo = (sectionId) => {
    setActiveSection(sectionId);
    
    if (contentRefs[sectionId] && contentRefs[sectionId].current) {
      contentRefs[sectionId].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Track scroll position to update active menu item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      // Check each section's position
      Object.entries(contentRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Top Navigation Bar */}
      <header className="fixed w-full z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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
                style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}
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
            <div className="text-lg font-semibold">Integration Guide</div>
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
              icon={<ChevronLeft className="w-5 h-5" />}
              title="Back to Docs"
              isActive={false}
              href="/docs"
              mobile
            />
            
            <li className="my-3 border-t border-gray-200"></li>
            
            <NavItem 
              icon={<Layers className="w-5 h-5" />}
              title="Integration Overview"
              isActive={activeSection === 'overview'}
              onClick={() => navigateTo('overview')}
              mobile
            />
            <NavItem 
              icon={<Code className="w-5 h-5" />}
              title="1. Initial Setup"
              isActive={activeSection === 'setup'}
              onClick={() => navigateTo('setup')}
              mobile
            />
            <NavItem 
              icon={<FileText className="w-5 h-5" />}
              title="2. Frontend Integration"
              isActive={activeSection === 'frontend'}
              onClick={() => navigateTo('frontend')}
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="3. Database Setup"
              isActive={activeSection === 'database'}
              onClick={() => navigateTo('database')}
              mobile
            />
            <NavItem 
              icon={<Webhook className="w-5 h-5" />}
              title="4. Webhook Integration"
              isActive={activeSection === 'webhook'}
              onClick={() => navigateTo('webhook')}
              mobile
            />
            <NavItem 
              icon={<CheckCircle className="w-5 h-5" />}
              title="5. Testing & Going Live"
              isActive={activeSection === 'testing'}
              onClick={() => navigateTo('testing')}
              mobile
            />
            <NavItem 
              icon={<HelpCircle className="w-5 h-5" />}
              title="FAQ & Troubleshooting"
              isActive={activeSection === 'faq'}
              onClick={() => navigateTo('faq')}
              mobile
            />
          </nav>
        </div>

        {/* Fixed Side Navigation - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto pt-6">
            <div className="px-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
                <Layers className="w-5 h-5" />
                <h2 className="font-bold text-lg">Integration Guide</h2>
              </div>
            </div>
            
            <nav className="px-6 pt-2">
              <ul className="space-y-1">
                <NavItem 
                  icon={<ChevronLeft className="w-5 h-5" />}
                  title="Back to Docs"
                  isActive={false}
                  href="/docs"
                />
                
                <li className="my-3 border-t border-gray-200"></li>
                
                <NavItem 
                  icon={<Layers className="w-5 h-5" />}
                  title="Integration Overview"
                  isActive={activeSection === 'overview'}
                  onClick={() => navigateTo('overview')}
                />
                <NavItem 
                  icon={<Code className="w-5 h-5" />}
                  title="1. Initial Setup"
                  isActive={activeSection === 'setup'}
                  onClick={() => navigateTo('setup')}
                />
                <NavItem 
                  icon={<FileText className="w-5 h-5" />}
                  title="2. Frontend Integration"
                  isActive={activeSection === 'frontend'}
                  onClick={() => navigateTo('frontend')}
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="3. Database Setup"
                  isActive={activeSection === 'database'}
                  onClick={() => navigateTo('database')}
                />
                <NavItem 
                  icon={<Webhook className="w-5 h-5" />}
                  title="4. Webhook Integration"
                  isActive={activeSection === 'webhook'}
                  onClick={() => navigateTo('webhook')}
                />
                <NavItem 
                  icon={<CheckCircle className="w-5 h-5" />}
                  title="5. Testing & Going Live"
                  isActive={activeSection === 'testing'}
                  onClick={() => navigateTo('testing')}
                />
                <NavItem 
                  icon={<HelpCircle className="w-5 h-5" />}
                  title="FAQ & Troubleshooting"
                  isActive={activeSection === 'faq'}
                  onClick={() => navigateTo('faq')}
                />
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 lg:pl-64">
          <div className="max-w-5xl mx-auto p-6 sm:p-8">
            {/* Overview Section */}
            <section 
              ref={overviewRef} 
              id="overview" 
              className="mb-16 scroll-mt-4"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">HouseTabz Integration Guide</h1>
                <p className="mt-4 text-lg text-gray-600">
                  This guide walks you through the process of integrating HouseTabz into your website or application.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Overview</h2>
                <p className="text-gray-600 mb-6">
                  Integrating HouseTabz is very straightforward and should only take a few hours. The process involves five main steps:
                </p>
                
                <div className="space-y-6">
                  <IntegrationStep
                    number="1"
                    title="Initial Setup"
                    description="Create a partner account and get your API keys (15-30 minutes)"
                    icon={<Code className="w-6 h-6" />}
                    onClick={() => navigateTo('setup')}
                  />
                  
                  <IntegrationStep
                    number="2"
                    title="Frontend Integration"
                    description="Add the SDK and 'Pay with HouseTabz' button to your checkout page (1-2 hours)"
                    icon={<FileText className="w-6 h-6" />}
                    onClick={() => navigateTo('frontend')}
                  />
                  
                  <IntegrationStep
                    number="3"
                    title="Database Setup"
                    description="Update your database schema to support HouseTabz payments (15-30mins)"
                    icon={<Database className="w-6 h-6" />}
                    onClick={() => navigateTo('database')}
                  />
                  
                  <IntegrationStep
                    number="4"
                    title="Webhook Integration"
                    description="Set up webhook handling to receive payment events (1-2 hours)"
                    icon={<Webhook className="w-6 h-6" />}
                    onClick={() => navigateTo('webhook')}
                  />
                  
                  <IntegrationStep
                    number="5"
                    title="Testing & Going Live"
                    description="Test the integration and move to production (2-3 hours)"
                    icon={<CheckCircle className="w-6 h-6" />}
                    onClick={() => navigateTo('testing')}
                  />
                </div>
                
                <div className="mt-8 bg-green-50 border border-green-100 rounded-lg p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                  <h3 className="font-medium mb-2 flex items-center" style={{ color: '#34d399' }}>
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Dedicated Support
                  </h3>
                  <p className="text-gray-700">
                    Our integration team is available to help if you get stuck at any point. Contact us at <a href="mailto:partners@housetabz.com" className="underline" style={{ color: '#34d399' }}>partners@housetabz.com</a> or through the Partner Dashboard.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Flow</h2>
                <p className="text-gray-600 mb-6">
                  Here's how HouseTabz works with your existing systems:
                </p>
                
                <div className="overflow-x-auto">
                  <div className="min-w-[768px]">
                    <div className="flex flex-col space-y-4">
                      {/* Customer Flow */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Users className="w-5 h-5 mr-2 text-gray-400" />
                          <h3 className="font-medium text-gray-700">Customer Experience</h3>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            Customer clicks "Pay with HouseTabz" on your checkout page
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            Customer completes HouseTabz form to share service with housemates
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            Customer returns to your site to complete checkout
                          </div>
                        </div>
                      </div>
                      
                      {/* Developer Flow */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Code className="w-5 h-5 mr-2 text-gray-400" />
                          <h3 className="font-medium text-gray-700">Developer Implementation</h3>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">Frontend</p>
                            <p>Add SDK and button to checkout page</p>
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">Backend (Webhooks)</p>
                            <p>Create payment method & agreement from webhook</p>
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">API</p>
                            <p>Create bills for the agreement when needed</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Clock className="w-5 h-5 mr-2 text-gray-400" />
                          <h3 className="font-medium text-gray-700">Integration Timeline</h3>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">Day 1</p>
                            <p>Setup, frontend integration</p>
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">Day 2</p>
                            <p>Database and webhook integration</p>
                          </div>
                          <ArrowRight className="w-5 h-5 mt-3 text-gray-400" />
                          <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 text-sm text-gray-600">
                            <p className="font-medium">Day 3</p>
                            <p>Testing and going live</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => navigateTo('setup')}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:bg-green-600"
                    style={{ backgroundColor: '#34d399' }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
            
            {/* Setup Section */}
            <section 
              ref={setupRef} 
              id="setup" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                number="1"
                title="Initial Setup"
                subtitle="Create your HouseTabz partner account and get API keys"
                icon={<Code className="w-6 h-6" />}
                timeEstimate="15-30 minutes"
              />
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Setting Up Your Partner Account</h2>
                  <p className="text-gray-600 mb-6">
                    Before you can integrate HouseTabz, you need to create a partner account and get your API credentials.
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="1.1"
                      title="Create a HouseTabz partner account"
                      description="Sign up for a partner account through our Partner Dashboard."
                      link={{
                        text: "Sign up here",
                        url: "https://partners.housetabz.com/signup"
                      }}
                    />
                    
                    <TaskItem
                      number="1.2"
                      title="Complete your company profile"
                      description="Fill in your company details including business name, website, and contact information."
                    />
                    
                    <TaskItem
                      number="1.3"
                      title="Get your API keys"
                      description="Navigate to the API Keys section of the Partner Dashboard to get your test API keys."
                      link={{
                        text: "API Keys documentation",
                        url: "/docs/authentication"
                      }}
                    />
                    
                    <TaskItem
                      number="1.4"
                      title="Set up webhooks URL"
                      description="Register your webhook endpoint URL in the Partner Dashboard to receive event notifications."
                      link={{
                        text: "Webhook setup guide",
                        url: "/docs/webhooks"
                      }}
                    />
                  </div>
                  
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      Keep your API keys secure and never share them publicly. We provide separate keys for test and production environments.
                    </p>
                  </div>
                </div>
              </div>
             
            </section>
            
            {/* Frontend Section */}
            <section 
              ref={frontendRef} 
              id="frontend" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                number="2"
                title="Frontend Integration"
                subtitle="Add the HouseTabz SDK and payment button to your checkout page"
                icon={<FileText className="w-6 h-6" />}
                timeEstimate="1-2 hours"
              />
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Implementing the SDK</h2>
                  <p className="text-gray-600 mb-6">
                    To integrate HouseTabz in your frontend, you'll need to add our SDK and implement the "Pay with HouseTabz" button.
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="2.1"
                      title="Include the HouseTabz SDK"
                      description="Add the HouseTabz JavaScript SDK to your website by including our script in the head section of your HTML."
                      link={{
                        text: "SDK Documentation",
                        url: "/docs/sdk#installation"
                      }}
                    />
                    
                    <TaskItem
                      number="2.2"
                      title="Initialize the SDK"
                      description="Configure the SDK with your API keys and environment settings."
                      link={{
                        text: "SDK Initialization Guide",
                        url: "/docs/sdk#initialization"
                      }}
                    />
                    
                    <TaskItem
                      number="2.3"
                      title="Add the 'Pay with HouseTabz' button"
                      description="Implement the button on your checkout page and configure the payment request parameters."
                      link={{
                        text: "Button Implementation Guide",
                        url: "/docs/sdk#button"
                      }}
                    />
                    
                    <TaskItem
                      number="2.4"
                      title="Implement callback functions"
                      description="Set up event handlers for success, error, and cancel events from the HouseTabz SDK."
                      link={{
                        text: "Callback Implementation Guide",
                        url: "/docs/sdk#callbacks"
                      }}
                    />
                  </div>
                  
                  <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Pro Tip</h3>
                    <p className="text-gray-700">
                      Make sure to test the button on a page where all the required payment details (serviceName, serviceType, estimatedAmount, etc.) are available. Many integration issues stem from missing or incorrect payment parameters.
                    </p>
                  </div>
                </div>
              </div>
            
         
            </section>
            
            {/* Database Section */}
            <section 
              ref={databaseRef} 
              id="database" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                number="3"
                title="Database Setup"
                subtitle="Update your database to support HouseTabz payments"
                icon={<Database className="w-6 h-6" />}
                timeEstimate="1-2 hours"
              />
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Database Configuration</h2>
                  <p className="text-gray-600 mb-6">
                    To properly track HouseTabz payments, you'll need to make some adjustments to your database schema.
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="3.1"
                      title="Update payment methods table"
                      description="Add 'housetabz' as a valid payment type to your existing payment methods table."
                      link={{
                        text: "Database Setup Guide",
                        url: "/docs/database"
                      }}
                    />
                    
                    <TaskItem
                      number="3.2"
                      title="Create housetabz_agreements table"
                      description="Create a new table to track HouseTabz agreements and their statuses."
                      link={{
                        text: "Database Models Guide",
                        url: "/docs/database"
                      }}
                    />
                    
                    <TaskItem
                      number="3.3"
                      title="Plan for handling bills and payments"
                      description="Ensure your database can associate bills and payments with HouseTabz agreements."
                      link={{
                        text: "Billing Guide",
                        url: "/docs/api"
                      }}
                    />
                  </div>
                  
                  <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Database Schema Tips</h3>
                    <p className="text-gray-700">
                      When designing your housetabz_agreements table, make sure to include fields for tracking the agreement status. This will be updated via webhooks as users complete the authorization process.
                    </p>
                  </div>
                </div>
              </div>
            
            </section>
            
            {/* Webhook Section */}
            <section 
              ref={webhookRef} 
              id="webhook" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                number="4"
                title="Webhook Integration"
                subtitle="Set up webhook endpoints to receive payment events"
                icon={<Webhook className="w-6 h-6" />}
                timeEstimate="1-2 hours"
              />
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Webhook Implementation</h2>
                  <p className="text-gray-600 mb-6">
                    Webhooks are a critical part of the HouseTabz integration. They allow your system to receive real-time notifications about payment events.
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="4.1"
                      title="Create a webhook endpoint"
                      description="Set up a secure endpoint on your server to receive webhook events from HouseTabz."
                    //   link={{
                    //     text: "Webhook Setup Guide",
                    //     url: "/docs/webhooks#setup"
                    //   }}
                    />
                    
                    <TaskItem
                      number="4.2"
                      title="Handle agreement.created webhook"
                      description="When a customer chooses to pay with HouseTabz, create a payment method and agreement record."
                    //   link={{
                    //     text: "agreement.created Event Guide",
                    //     url: "/docs/webhooks#agreement-created"
                    //   }}
                    />
                    
                    <TaskItem
                      number="4.3"
                      title="Handle request.authorized webhook"
                      description="Update the agreement status to 'active' when all housemates have authorized the agreement."
                    //   link={{
                    //     text: "request.authorized Event Guide",
                    //     url: "/docs/webhooks#request-authorized"
                    //   }}
                    />
                    
                    <TaskItem
                      number="4.4"
                      title="Handle bill.paid webhook"
                      description="Update bill status to 'paid' when a bill is fully paid through the HouseTabz platform."
                    //   link={{
                    //     text: "bill.paid Event Guide",
                    //     url: "/docs/webhooks#bill-paid"
                    //   }}
                    />
                    
                    <TaskItem
                      number="4.5"
                      title="Implement bill creation endpoint"
                      description="Create the ability to generate new bills for HouseTabz agreements using the API."
                    //   link={{
                    //     text: "Bills API Reference",
                    //     url: "/api-reference/bills"
                    //   }}
                    />
                  </div>
                  
                  <div className="mt-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <h3 className="font-medium text-purple-800 mb-2">Best Practices</h3>
                    <p className="text-gray-700 mb-2">
                      Always respond to webhook events with a 200 status code as quickly as possible, even if you need to process the event asynchronously. This prevents unnecessary retries.
                    </p>
                    <p className="text-gray-700">
                      Implement idempotency in your webhook handlers to prevent duplicate processing if the same event is received multiple times.
                    </p>
                  </div>
                </div>
              </div>
              
            
            </section>
            
            {/* Testing Section */}
            <section 
              ref={testingRef} 
              id="testing" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                number="5"
                title="Testing & Going Live"
                subtitle="Test your integration and prepare for production"
                icon={<CheckCircle className="w-6 h-6" />}
                timeEstimate="2-3 hours"
              />
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Testing Your Integration</h2>
                  <p className="text-gray-600 mb-6">
                    Before going live, it's important to thoroughly test your integration in the sandbox environment.
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="5.1"
                      title="Test the payment flow"
                      description="Use test credentials to make sure the 'Pay with HouseTabz' button works correctly."
                    //   link={{
                    //     text: "Testing Guide",
                    //     url: "/docs/testing#payment-flow"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.2"
                      title="Test webhook handling"
                      description="Verify that your system correctly processes all webhook events from HouseTabz."
                    //   link={{
                    //     text: "Webhook Testing Guide",
                    //     url: "/docs/testing#webhooks"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.3"
                      title="Test bill creation and payment"
                      description="Create test bills and verify they are properly split and paid through the HouseTabz system."
                    //   link={{
                    //     text: "Billing Testing Guide",
                    //     url: "/docs/testing#billing"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.4"
                      title="Test error handling"
                      description="Ensure your application handles errors and edge cases gracefully."
                    //   link={{
                    //     text: "Error Handling Guide",
                    //     url: "/docs/testing#error-handling"
                    //   }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Going Live</h2>
                  <p className="text-gray-600 mb-6">
                    Once you've thoroughly tested your integration, follow these steps to move to production:
                  </p>

                  <div className="space-y-6">
                    <TaskItem
                      number="5.5"
                      title="Request production access"
                      description="Contact the HouseTabz team to request approval for production access."
                    //   link={{
                    //     text: "Production Access Guide",
                    //     url: "/docs/going-live"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.6"
                      title="Update API keys and URLs"
                      description="Replace your test API keys with production keys and update any environment-specific URLs."
                    //   link={{
                    //     text: "Production Configuration Guide",
                    //     url: "/docs/going-live#configuration"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.7"
                      title="Deploy to production"
                      description="Deploy your integration to your production environment."
                    //   link={{
                    //     text: "Deployment Checklist",
                    //     url: "/docs/going-live#deployment"
                    //   }}
                    />
                    
                    <TaskItem
                      number="5.8"
                      title="Monitor and validate"
                      description="Closely monitor the first few transactions to ensure everything is working correctly in production."
                    //   link={{
                    //     text: "Monitoring Guide",
                    //     url: "/docs/going-live#monitoring"
                    //   }}
                    />
                  </div>
                  
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      Once you go live, never use test API keys in production or production keys in test environments. This can lead to real transactions being processed in your test environment or test transactions failing in production.
                    </p>
                  </div>
                </div>
              </div>
         
            </section>
            
            {/* FAQ Section */}
            <section 
              ref={faqRef} 
              id="faq" 
              className="mb-16 scroll-mt-4"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2" style={{ color: '#34d399' }} />
                  FAQ & Troubleshooting
                </h2>
                <p className="mt-4 text-gray-600">
                  Common questions and solutions to issues you might encounter during integration.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6">
                  <div className="space-y-6">
                    <FAQItem
                      question="How long does the integration typically take?"
                      answer="For most partners, the complete integration should only take a few hours of development time, depending on the complexity of your existing systems and your team's familiarity with webhook integrations."
                    />
                    
                    <FAQItem
                      question="Do I need to modify my checkout flow?"
                      answer="You'll need to add the 'Pay with HouseTabz' button to your checkout page, but the rest of your checkout flow can remain unchanged. When users click the button, they'll be directed to HouseTabz to set up their agreement, then returned to your site."
                    />
                    
                    <FAQItem
                      question="How do I handle webhook failures or retries?"
                      answer="We recommend implementing idempotency in your webhook handlers to prevent duplicate processing. Always respond with a 200 status code as quickly as possible, and process the events asynchronously if needed. We'll retry failed webhook deliveries with exponential backoff."
                    />
                    
                    <FAQItem
                      question="What happens if a housemate declines to pay?"
                      answer="If any housemate declines the payment request, the agreement will not be activated. You'll receive a request.declined webhook event, which you should handle by updating the agreement status in your database."
                    />
                    
                    <FAQItem
                      question="Can I test the integration without real payments?"
                      answer="Yes, our sandbox environment allows you to test the full integration flow without processing real payments. Use the test API keys and test accounts provided in the Partner Dashboard."
                    />
                    
                   
                    
                    {/* <FAQItem
                      question="Do I need to update my privacy policy?"
                      answer="Yes, you should update your privacy policy to inform users that their information will be shared with HouseTabz for payment processing purposes. We provide template language for this in our documentation."
                    /> */}
                    
                    <FAQItem
                      question="What customer support is provided for end users?"
                      answer="HouseTabz provides support for end users regarding the HouseTabz platform itself, including authorization and payment issues. However, you remain responsible for support related to your service and billing."
                    />
                  </div>
                </div>
              </div>
              
              {/* <div className="bg-green-50 border border-green-100 rounded-lg p-6 mt-8" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#34d399' }}>Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you're stuck on any step of the integration process or have questions not answered here, our developer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="/docs"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:bg-green-600"
                    style={{ backgroundColor: '#34d399' }}
                  >
                    Developer Documentation
                  </a>
                  <a 
                    href="/support"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
               */}
          
            </section>
            
            {/* Simplified Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-16">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} HouseTabz. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ number, title, subtitle, icon, timeEstimate }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
          <span className="text-sm font-bold" style={{ color: '#34d399' }}>{number}</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
          {timeEstimate && (
            <span className="ml-3 text-sm font-medium text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {timeEstimate}
            </span>
          )}
        </h2>
      </div>
      {subtitle && <p className="mt-1 text-gray-600 ml-11">{subtitle}</p>}
    </div>
  );
};

// Integration Step Component
const IntegrationStep = ({ number, title, description, icon, onClick }) => {
  return (
    <div 
      className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="mr-4 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
          <span className="text-sm font-bold" style={{ color: '#34d399' }}>{number}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          {icon && <span className="mr-2" style={{ color: '#34d399' }}>{icon}</span>}
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-auto">
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

// Task Item Component
const TaskItem = ({ number, title, description, link }) => {
  return (
    <div className="flex items-start">
      <div className="mr-4 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
          <span className="text-xs font-bold" style={{ color: '#34d399' }}>{number}</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        {link && (
          <a 
            href={link.url}
            className="mt-2 inline-flex items-center text-sm font-medium"
            style={{ color: '#34d399' }}
          >
            {link.text}
            <ExternalLink className="ml-1 w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-900">{question}</h3>
        <ChevronRight 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, title, isActive, onClick, href, mobile = false }) => {
  if (href) {
    return (
      <li>
        <a
          href={href}
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive 
              ? 'bg-green-50 text-green-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } ${mobile ? 'text-base' : 'text-sm'}`}
          style={{ 
            backgroundColor: isActive ? 'rgba(52, 211, 153, 0.1)' : '',
            color: isActive ? '#34d399' : '' 
          }}
        >
          <span className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} style={{ color: isActive ? '#34d399' : '' }}>
            {icon}
          </span>
          <span>{title}</span>
        </a>
      </li>
    );
  }
  
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left ${
          isActive 
            ? 'bg-green-50 text-green-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${mobile ? 'text-base' : 'text-sm'}`}
        style={{ 
          backgroundColor: isActive ? 'rgba(52, 211, 153, 0.1)' : '',
          color: isActive ? '#34d399' : '' 
        }}
      >
        <span className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} style={{ color: isActive ? '#34d399' : '' }}>
          {icon}
        </span>
        <span>{title}</span>
      </button>
    </li>
  );
};

export default IntegrationGuide;