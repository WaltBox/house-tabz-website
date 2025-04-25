import React, { useState, useRef, useEffect } from 'react';
import { 
  Rocket,
  Code, 
  Database, 
  Webhook, 
  FileText, 
  CheckCircle,
  Home,
  Lock,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Copy,
  ArrowRight
} from 'lucide-react';

const DatabaseSetup = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [copied, setCopied] = useState(false);
  
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
  const overviewRef = useRef(null);
  const paymentMethodsRef = useRef(null);
  const agreementsTableRef = useRef(null);
  const webhookCommunicationRef = useRef(null);
  
  const contentRefs = {
    overview: overviewRef,
    paymentMethods: paymentMethodsRef,
    agreementsTable: agreementsTableRef,
    webhookCommunication: webhookCommunicationRef
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <div className="text-lg font-semibold">Database Setup</div>
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
              title="Back to docs"
              isActive={false}
              href="/docs"
              mobile
            />
            
            <li className="my-3 border-t border-gray-200"></li>
            
            <NavItem 
              icon={<Home className="w-5 h-5" />}
              title="Overview"
              isActive={activeSection === 'overview'}
              onClick={() => navigateTo('overview')}
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="Payment Methods Table"
              isActive={activeSection === 'paymentMethods'}
              onClick={() => navigateTo('paymentMethods')}
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="Agreements Table"
              isActive={activeSection === 'agreementsTable'}
              onClick={() => navigateTo('agreementsTable')}
              mobile
            />
            <NavItem 
              icon={<Webhook className="w-5 h-5" />}
              title="Webhook Communication"
              isActive={activeSection === 'webhookCommunication'}
              onClick={() => navigateTo('webhookCommunication')}
              mobile
            />
          </nav>
        </div>

        {/* Fixed Side Navigation - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto pt-6">
            <div className="px-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
                <Database className="w-5 h-5" />
                <h2 className="font-bold text-lg">Database Setup</h2>
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
                  icon={<Home className="w-5 h-5" />}
                  title="Overview"
                  isActive={activeSection === 'overview'}
                  onClick={() => navigateTo('overview')}
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="Payment Methods Table"
                  isActive={activeSection === 'paymentMethods'}
                  onClick={() => navigateTo('paymentMethods')}
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="Agreements Table"
                  isActive={activeSection === 'agreementsTable'}
                  onClick={() => navigateTo('agreementsTable')}
                />
                <NavItem 
                  icon={<Webhook className="w-5 h-5" />}
                  title="Webhook Communication"
                  isActive={activeSection === 'webhookCommunication'}
                  onClick={() => navigateTo('webhookCommunication')}
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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Database Setup
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Configure your database to work with HouseTabz payments
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 mb-4">
                  To properly integrate HouseTabz into your application, you'll need to make a few adjustments to your existing database structure and create a new table to track payment agreements.
                </p>
                
                <h3 className="font-medium text-gray-900 mb-3">Integration Requirements</h3>
                <p className="text-gray-600 mb-6">
                  The HouseTabz integration requires two database components:
                </p>
                
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Database className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">Payment Methods Table</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Add 'housetabz' as a valid payment type to your existing payment methods table.
                    </p>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Database className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">HouseTabz Agreements Table</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Create a new table to track HouseTabz payment agreements and their status.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                  <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>How It Works</h3>
                  <p className="text-gray-700">
                    When a customer uses "Pay with HouseTabz", we'll send you an <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.created</code> webhook 
                    containing all necessary parameters to create both a payment method entry and a HouseTabz agreement entry in your database. This allows your system to track
                    the payment status and relationship with the HouseTabz service.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Payment Methods Table Section */}
            <section 
              ref={paymentMethodsRef} 
              id="paymentMethods" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                icon={<Database className="w-6 h-6" />}
                title="Payment Methods Table Update"
                subtitle="Add HouseTabz as a payment type"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Add HouseTabz Payment Type</h2>
                  <p className="text-gray-600 mb-6">
                    To integrate with your existing payment infrastructure, add the 'housetabz' payment type to your payment methods table. This allows your system to recognize HouseTabz as a valid payment option.
                  </p>

                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field Name</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Update Required</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">type</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Add 'housetabz' value</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Add 'housetabz' as a valid payment type alongside your existing types (e.g., 'card', 'bank', etc.)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Payment Method Parameters</h3>
                    <p className="text-gray-700 mb-4">
                      When a customer uses "Pay with HouseTabz", we'll send you all necessary parameters in the 
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm"> agreement.created</code> webhook to satisfy your current payment system including:
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">paymentMethodId</code>: A unique identifier for this payment method</li>
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">type</code>: Will be 'housetabz'</li>
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">last4</code>: Last 4 digits of the account reference</li>
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">brand</code>: Payment source information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            {/* HouseTabz Agreements Table Section */}
            <section 
              ref={agreementsTableRef} 
              id="agreementsTable" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                icon={<Database className="w-6 h-6" />}
                title="HouseTabz Agreements Table"
                subtitle="Create a new table to track HouseTabz payment agreements"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Create HouseTabz Agreements Table</h2>
                  <p className="text-gray-600 mb-6">
                    You'll need to create a new <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">housetabz_agreements</code> table in your database 
                    to track payment agreements between your users and HouseTabz.
                  </p>

                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field Name</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">id</td>
                          <td className="py-2 px-4 text-sm text-gray-500">UUID/String</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Primary key (your internal ID)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">user_id</td>
                          <td className="py-2 px-4 text-sm text-gray-500">String</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Your internal user/customer ID</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">housetabz_agreement_id</td>
                          <td className="py-2 px-4 text-sm text-gray-500">String</td>
                          <td className="py-2 px-4 text-sm text-gray-500">HouseTabz agreement identifier</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">transaction_id</td>
                          <td className="py-2 px-4 text-sm text-gray-500">String</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Your transaction identifier</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-sm font-mono text-gray-900">payment_method_id</td>
                          <td className="py-2 px-4 text-sm text-gray-500">String</td>
                          <td className="py-2 px-4 text-sm text-gray-500">Reference to payment methods table</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-4 text-sm font-mono text-gray-900" style={{ color: '#34d399' }}>status</td>
                          <td className="py-2 px-4 text-sm text-gray-500">String/Enum</td>
                          <td className="py-2 px-4 text-sm text-gray-500">'pending', 'active', 'cancelled'</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Webhook Communication Section */}
            <section 
              ref={webhookCommunicationRef} 
              id="webhookCommunication" 
              className="mb-16 scroll-mt-4"
            >
              <SectionHeader 
                icon={<Webhook className="w-6 h-6" />}
                title="Webhook Communication"
                subtitle="Receive and process HouseTabz webhook notifications"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Handling HouseTabz Webhooks</h2>
                  <p className="text-gray-600 mb-6">
                    HouseTabz uses webhooks to notify your system about changes to payment agreements. Here's how to handle the webhook events related to database updates.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>agreement.created Webhook</h3>
                      <p className="text-gray-700 mb-4">
                        When a customer uses the "Pay with HouseTabz" button, you'll receive an <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.created</code> webhook with all necessary parameters to create a new entry in your database, including:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">userId/customerId</code>: Your customer's ID</li>
                        <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">housetabzAgreementId</code>: Unique identifier from HouseTabz</li>
                        <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">transactionId</code>: Your transaction reference</li>
                        <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">status</code>: Initially set to 'pending'</li>
                        <li>• <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">paymentMethodId</code>: Reference to the payment method</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-purple-800 mb-2">Updating Agreement Status</h3>
                      <p className="text-gray-700 mb-2">
                        As the HouseTabz agreement progresses, you'll receive additional webhooks to update the status:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.authorized</code>: Update status to 'active'</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.completed</code>: Update status to 'completed'</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.cancelled</code>: Update status to 'cancelled'</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-black mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      When you receive the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">agreement.created</code> webhook, you should create both a payment method entry and a HouseTabz agreement entry. This ensures your existing payment system works smoothly with HouseTabz.
                    </p>
                  </div>
                  
              
                </div>
              </div>
            </section>
            
            {/* Simplified Footer */}
          
          </div>
        </div>
      </div>

      {/* Copied toast notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md text-sm animate-fade-in-out">
          Copied to clipboard!
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

// Section Header Component
const SectionHeader = ({ icon, title, subtitle }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
        {icon}
        <h2 className="ml-2 text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default DatabaseSetup;