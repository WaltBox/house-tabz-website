import React, { useState, useRef, useEffect } from 'react';
import { 
  Rocket,
  Code, 
  Database, 
  Webhook, 
  FileText, 
  CheckCircle,
  ChevronLeft,
  Home,
  Lock,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const QuickstartGuide = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  
  // Import Montserrat font
  useEffect(() => {
    // Create a new link element
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);
  
  // Refs for scrolling to sections
  const introRef = useRef(null);
  const sdkRef = useRef(null);
  const dbRef = useRef(null);
  const webhooksRef = useRef(null);
  const billingRef = useRef(null);
  const confirmationRef = useRef(null);
  
  const contentRefs = {
    introduction: introRef,
    sdk: sdkRef,
    db: dbRef,
    webhooks: webhooksRef,
    billing: billingRef,
    confirmation: confirmationRef
  };
  
  // Handle navigation click
  const navigateTo = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    
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
            <div className="text-lg font-semibold">Quickstart Guide</div>
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
            />
            
            <li className="my-3 border-t border-gray-200"></li>
            <NavItem 
              icon={<Home className="w-5 h-5" />}
              title="Introduction"
              isActive={activeSection === 'introduction'}
              onClick={() => navigateTo('introduction')}
              mobile
            />
            <NavItem 
              icon={<Code className="w-5 h-5" />}
              title="SDK"
              isActive={activeSection === 'sdk'}
              onClick={() => navigateTo('sdk')}
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="Your DB"
              isActive={activeSection === 'db'}
              onClick={() => navigateTo('db')}
              mobile
            />
            <NavItem 
              icon={<Webhook className="w-5 h-5" />}
              title="Webhooks"
              isActive={activeSection === 'webhooks'}
              onClick={() => navigateTo('webhooks')}
              mobile
            />
            <NavItem 
              icon={<FileText className="w-5 h-5" />}
              title="Share Billing"
              isActive={activeSection === 'billing'}
              onClick={() => navigateTo('billing')}
              mobile
            />
            <NavItem 
              icon={<CheckCircle className="w-5 h-5" />}
              title="Receive Confirmation"
              isActive={activeSection === 'confirmation'}
              onClick={() => navigateTo('confirmation')}
              mobile
            />
          </nav>
        </div>

        {/* Fixed Side Navigation - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto top-16 pt-6">
            <div className="px-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
                <Rocket className="w-5 h-5" />
                <h2 className="font-bold text-lg">Quickstart Guide</h2>
              </div>
            </div>
            
            <nav className="px-6 pt-2">
              <ul className="space-y-1">
                <NavItem 
                  icon={<ChevronLeft className="w-5 h-5" />}
                  title="Back to Docs"
                  isActive={false}
                  onClick={() => window.location.href = '/docs'}
                />
                
                <li className="my-3 border-t border-gray-200"></li>
                <NavItem 
                  icon={<Home className="w-5 h-5" />}
                  title="Introduction"
                  isActive={activeSection === 'introduction'}
                  onClick={() => navigateTo('introduction')}
                />
                <NavItem 
                  icon={<Code className="w-5 h-5" />}
                  title="SDK"
                  isActive={activeSection === 'sdk'}
                  onClick={() => navigateTo('sdk')}
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="Your DB"
                  isActive={activeSection === 'db'}
                  onClick={() => navigateTo('db')}
                />
                <NavItem 
                  icon={<Webhook className="w-5 h-5" />}
                  title="Webhooks"
                  isActive={activeSection === 'webhooks'}
                  onClick={() => navigateTo('webhooks')}
                />
                <NavItem 
                  icon={<FileText className="w-5 h-5" />}
                  title="Share Billing"
                  isActive={activeSection === 'billing'}
                  onClick={() => navigateTo('billing')}
                />
                <NavItem 
                  icon={<CheckCircle className="w-5 h-5" />}
                  title="Receive Confirmation"
                  isActive={activeSection === 'confirmation'}
                  onClick={() => navigateTo('confirmation')}
                />
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 lg:pl-64">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Introduction Section */}
            <section 
              ref={introRef} 
              id="introduction" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-6 md:mb-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
                    For Partners
                  </span>
                  <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Get Started with <span style={{ color: '#34d399' }}>HouseTabz</span>
                  </h1>
                  <p className="mt-4 text-base lg:text-lg text-gray-600">
                    A quick intro to accepting HouseTabz
                  </p>
                </div>
                <img 
                  src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
                  alt="HouseTabz Logo" 
                  className="relative w-1/2 md:w-1/3 max-w-xs mx-auto"
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="mr-2 w-5 h-5" style={{ color: '#34d399' }} />
                  Important API Keys
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">API Key</div>
                    <code className="block p-2 bg-gray-100 text-gray-800 rounded text-sm font-mono overflow-x-auto">
                      api_key
                    </code>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Secret Key</div>
                    <code className="block p-2 bg-gray-100 text-gray-800 rounded text-sm font-mono overflow-x-auto">
                      secret_key
                    </code>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Environments</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      sandbox
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      production
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Five simple steps</h2>
                <ol className="space-y-4 md:space-y-6">
                  <IntegrationStep 
                    number="1" 
                    title="Add the SDK (Pay with HouseTabz button) to your checkout page"
                    icon={<Code className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('sdk')}
                  />
                  <IntegrationStep 
                    number="2" 
                    title="Add HouseTabz to your DB"
                    icon={<Database className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('db')}
                  />
                  <IntegrationStep 
                    number="3" 
                    title="Setup Webhooks"
                    icon={<Webhook className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('webhooks')}
                  />
                  <IntegrationStep 
                    number="4" 
                    title="Share Billing"
                    icon={<FileText className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('billing')}
                  />
                  <IntegrationStep 
                    number="5" 
                    title="Receive Confirmation"
                    icon={<CheckCircle className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('confirmation')}
                  />
                </ol>
              </div>
            </section>
            
            {/* SDK Section */}
            <section 
              ref={sdkRef} 
              id="sdk" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Code className="w-6 h-6" />}
                title="Step 1: Add the SDK"
                subtitle="Integrate the HouseTabz button into your checkout flow"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Add the SDK</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Add the HouseTabz SDK to your checkout page. This triggers the entire shared payment flow.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Integration Flow</h3>
                      <ol className="list-decimal list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>User clicks the "Pay with HouseTabz" button</li>
                        <li>You send us the transaction params (via SDK)</li>
                        <li>User is redirected to HouseTabz</li>
                        <li>We send <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">agreement.created</code> webhook to your server</li>
                      </ol>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200">
                        <div className="text-xs md:text-sm font-mono text-gray-600">Including the Script</div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono">
                            &lt;script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"&gt;&lt;/script&gt;
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Database Section */}
            <section 
              ref={dbRef} 
              id="db" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Database className="w-6 h-6" />}
                title="Step 2: Set Up Your Database"
                subtitle="Add the required fields and models to store HouseTabz data"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Database Schema</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Add the required fields and models to store HouseTabz agreement data.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Required Changes</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>
                          Add a new <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">payment_method</code> type:
                          <code className="ml-1 bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">type: 'housetabz'</code>
                        </li>
                        <li>Create a new table: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">housetabz_agreements</code></li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200">
                        <div className="text-xs md:text-sm font-mono text-gray-600">housetabz_agreements Schema</div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono">
{`{
  id: string,                 // Your internal ID
  housetabz_agreement_id,    // ID from HouseTabz
  status: enum(             // Current status
    'pending',
    'active',
    'completed',
    'cancelled'
  ),
  transaction_id: string,     // Your transactionId
  payment_method_id: string, // The payment method for your use
  created_at: timestamp,
  updated_at: timestamp
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Webhooks Section */}
            <section 
              ref={webhooksRef} 
              id="webhooks" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Webhook className="w-6 h-6" />}
                title="Step 3: Handle Webhooks"
                subtitle="Process notifications from HouseTabz as users progress"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Setup Webhooks</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    HouseTabz will notify you as users progress through the shared payment flow.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 md:p-4">
                        <h3 className="font-medium text-purple-800 mb-2">🔔 agreement.created</h3>
                        <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-2 md:ml-4 space-y-1">
                          <li>Trigger: user submits request via HouseTabz</li>
                          <li>Create a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">payment_method</code> with <code>'housetabz'</code></li>
                          <li>Create a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">housetabz_agreement</code> with <code>status: 'pending'</code></li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                        <h3 className="font-medium text-blue-800 mb-2">👥 User Action</h3>
                        <p className="text-sm md:text-base text-gray-600">Each roommate logs in and accepts responsibility.</p>
                      </div>

                      <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                        <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>🔔 request.authorized</h3>
                        <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-2 md:ml-4 space-y-1">
                          <li>Trigger: all roommates have accepted</li>
                          <li>Update <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">housetabz_agreement.status</code> to <code>'active'</code></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200">
                        <div className="text-xs md:text-sm font-mono text-gray-600">Webhook Endpoint</div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono">
                            POST https://your-domain.com/webhooks/housetabz
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Billing Section */}
            <section 
              ref={billingRef} 
              id="billing" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<FileText className="w-6 h-6" />}
                title="Step 4: Post Billing Data"
                subtitle="Send billing information to HouseTabz when it's time to charge"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Share Billing Data</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    When it's time to charge the user, send billing info to HouseTabz.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-amber-800 mb-2">API Flow</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>
                          If <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">payment_method.type === 'housetabz'</code>,
                          send a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">POST /bills</code> request
                        </li>
                        <li>
                          HouseTabz will mirror the bill and collect from each roommate.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200">
                        <div className="text-xs md:text-sm font-mono text-gray-600">POST /bills Example</div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono">
{`{
  "agreement_id": "ht_agr_123456",
  "amount": 15000,       // $150.00
  "currency": "usd",
  "description": "Monthly energy payment",
  "due_date": "2025-05-01",
  "external_id": "your_invoice_123"
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Confirmation Section */}
            <section 
              ref={confirmationRef} 
              id="confirmation" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<CheckCircle className="w-6 h-6" />}
                title="Step 5: Receive Confirmation"
                subtitle="Get notified when HouseTabz collects and pays out funds"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Payment Confirmation</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Once HouseTabz has collected and paid out funds, you'll get a final webhook.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>🔔 bill.paid Webhook</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>
                          Webhook: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">bill.paid</code>
                        </li>
                        <li>
                          Confirms total amount paid, date, and the associated agreement.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200">
                        <div className="text-xs md:text-sm font-mono text-gray-600">bill.paid Payload</div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono">
{`{
  "type": "bill.paid",
  "data": {
    "id": "ht_bill_789012",
    "agreement_id": "ht_agr_123456",
    "amount": 15000,
    "currency": "usd",
    "status": "paid",
    "paid_at": "2025-05-01T14:32:21Z",
    "external_id": "your_invoice_123"
  }
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Simplified Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 md:py-8 mt-12 md:mt-16">
              <div className="max-w-5xl mx-auto px-4 md:px-6">
                <p className="text-center text-xs md:text-sm text-gray-500">
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

// Integration Step Component
const IntegrationStep = ({ number, title, icon, onClick }) => {
  return (
    <li className="flex">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-sm mr-3" 
        style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
        {number}
      </div>
      <div className="flex-1">
        <button 
          onClick={onClick}
          className="group flex items-center text-gray-800 hover:text-green-700 font-medium"
          style={{ hover: { color: '#34d399' } }}

        >
          {title}
          <span className="ml-2 text-gray-400 group-hover:text-green-500">
            {icon}
          </span>
        </button>
      </div>
    </li>
  );
};

// Section Header Component
const SectionHeader = ({ icon, title, subtitle }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
        {icon}
        <h2 className="ml-2 text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-sm md:text-base text-gray-600">{subtitle}</p>
    </div>
  );
};

export default QuickstartGuide;