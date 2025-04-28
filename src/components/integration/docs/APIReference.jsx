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
  Copy,
  ArrowRight
} from 'lucide-react';

const APIReference = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [activeSection, setActiveSection] = useState('overview');
  
  // Section refs for navigation
  const overviewRef = useRef(null);
  const requestParamsRef = useRef(null);
  const responseRef = useRef(null);
  
  // Content refs map
  const contentRefs = {
    overview: overviewRef,
    requestParams: requestParamsRef,
    response: responseRef
  };
  
  // Navigation function
  const navigateTo = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    
    if (contentRefs[sectionId] && contentRefs[sectionId].current) {
      contentRefs[sectionId].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
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

  const requestExample = `curl -X POST https://api.housetabz.com/api/partners/bills \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "houseTabzAgreementId": "a10d74b5-43a8-487c-87ac-2f76d2fde008",
    "externalAgreementId": "",
    "externalBillId": "10134123",
    "amount": 104,
    "dueDate": "2025-05-15T00:00:00.000Z",
    "billingPeriod": "May 2025"
  }'`;

  const responseExample = `{
  "message": "Bill created successfully",
  "billId": 53,
  "amount": "104.00",
  "status": "pending",
  "dueDate": "2025-05-15T00:00:00.000Z",
  "chargesCreated": 2
}`;

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
              {/* Logo for mobile */}
              <div className="flex lg:hidden items-center space-x-2" style={{ color: '#34d399' }}>
                <Code className="w-5 h-5" />
                <h2 className="font-semibold text-base">API Reference</h2>
              </div>
              <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                <a href="/docs" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Docs
                </a>
                <a href="/api-reference" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-green-500">
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
                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
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

      {/* Mobile Side Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-lg font-semibold">API Reference</div>
          <button
            type="button"
            className="p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto max-h-screen pb-20">
          <NavItem 
            icon={<ChevronLeft className="w-5 h-5" />}
            title="Back to Docs"
            isActive={false}
            href="/docs"
            mobile
          />
          
          <li className="my-3 border-t border-gray-200"></li>
          
          <NavItem 
            icon={<Code className="w-5 h-5" />}
            title="Overview"
            isActive={activeSection === 'overview'}
            onClick={() => navigateTo('overview')}
            mobile
          />
          <NavItem 
            icon={<Code className="w-5 h-5" />}
            title="Request Parameters"
            isActive={activeSection === 'requestParams'}
            onClick={() => navigateTo('requestParams')}
            mobile
          />
          <NavItem 
            icon={<Code className="w-5 h-5" />}
            title="Response"
            isActive={activeSection === 'response'}
            onClick={() => navigateTo('response')}
            mobile
          />
        </nav>
      </div>

     {/* Fixed Side Navigation - Desktop */}
<div className="hidden lg:flex lg:flex-shrink-0">
  <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto top-16 pt-6">
    <div className="px-6 pb-6 border-b border-gray-200">
      <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
        <Code className="w-5 h-5" />
        <h2 className="font-bold text-lg">API Reference</h2>
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
          icon={<Code className="w-5 h-5" />}
          title="Overview"
          isActive={activeSection === 'overview'}
          onClick={() => navigateTo('overview')}
        />
        <NavItem 
          icon={<Code className="w-5 h-5" />}
          title="Request Parameters"
          isActive={activeSection === 'requestParams'}
          onClick={() => navigateTo('requestParams')}
        />
        <NavItem 
          icon={<Code className="w-5 h-5" />}
          title="Response"
          isActive={activeSection === 'response'}
          onClick={() => navigateTo('response')}
        />
      </ul>
    </nav>
  </div>
</div>
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 lg:pl-64">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 mt-16">
          {/* Overview Section */}
          <section 
            ref={overviewRef} 
            id="overview" 
            className="mb-12 lg:mb-16 scroll-mt-24"
          >
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Create a Bill</h1>
              <p className="mt-4 text-base lg:text-lg text-gray-600">
                Create a new bill for a specific HouseTabz agreement
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                <div className="flex items-center bg-green-50 text-green-700 rounded-md px-3 py-1 text-sm font-medium mr-4 mb-2 sm:mb-0" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
                  <span>POST</span>
                </div>
                <div className="font-mono text-sm bg-gray-100 rounded px-3 py-1 w-full sm:flex-grow overflow-x-auto">
                  <div className="whitespace-nowrap">https://api.housetabz.com/api/partners/bills</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                This endpoint creates a new bill for an existing HouseTabz agreement. Bills are shared among housemates according to the agreement terms.
              </p>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Authentication Required</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  This endpoint requires your API key to be included in the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">x-api-key</code> header.
                </p>
              </div>
            </div>
          </section>
          
          {/* Request Parameters Section */}
          <section 
            ref={requestParamsRef} 
            id="requestParams" 
            className="mb-12 lg:mb-16 scroll-mt-24"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className="px-4 py-2 text-sm font-medium border-b-2 border-green-500 text-green-600"
                    style={{ color: '#34d399' }}
                  >
                    Request Parameters
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Request Parameters</h2>
                
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Parameter</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Required</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">houseTabzAgreementId</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string (UUID)</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">Yes</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">The unique identifier for the HouseTabz agreement</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">externalAgreementId</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">No</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Your internal reference ID for the agreement (can be empty)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">externalBillId</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">Yes</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Your unique identifier for this bill (prevents duplicates)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">amount</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">number</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">Yes</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">The bill amount in dollars</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">dueDate</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string (ISO 8601)</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">Yes</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">The date when payment is due</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">billingPeriod</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">No</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Descriptive period for this bill (e.g., "May 2025")</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-xs sm:text-sm font-mono text-gray-600">Example Request</div>
                    <button 
                      onClick={() => copyToClipboard(requestExample)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <pre className="text-xs sm:text-sm overflow-x-auto">
                      <code className="text-gray-800 font-mono whitespace-pre-wrap">
                        {requestExample}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Response Section */}
          <section 
            ref={responseRef} 
            id="response" 
            className="mb-12 lg:mb-16 scroll-mt-24"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className="px-4 py-2 text-sm font-medium border-b-2 border-green-500 text-green-600"
                    style={{ color: '#34d399' }}
                  >
                    Response
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Response</h2>
                
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">message</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Success message</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">billId</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">number</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">The numeric ID for the created bill</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">amount</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Total bill amount formatted with decimal places</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">status</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Current status of the bill ('pending')</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">dueDate</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">string (ISO 8601)</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">The date when payment is due</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-900 whitespace-nowrap">chargesCreated</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">number</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-500">Number of individual charges created (one per housemate)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-xs sm:text-sm font-mono text-gray-600">Example Response</div>
                    <button 
                      onClick={() => copyToClipboard(responseExample)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <pre className="text-xs sm:text-sm overflow-x-auto">
                      <code className="text-gray-800 font-mono whitespace-pre-wrap">
                        {responseExample}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                  <h3 className="font-medium text-purple-800 mb-2">Notes</h3>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2">
                    <li>The bill is automatically split among housemates according to the agreement terms</li>
                    <li>Each housemate will be notified about their portion of the bill</li>
                    <li>Use the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm">externalBillId</code> to prevent duplicate bills from being created</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Simplified Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 lg:py-8 mt-12 lg:mt-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <p className="text-center text-xs sm:text-sm text-gray-500">
                &copy; {new Date().getFullYear()} HouseTabz. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Copied toast notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md text-sm animate-fade-in-out z-50">
          Copied to clipboard!
        </div>
      )}
      
      {/* Mobile Quick-Nav Floating Button - Fixed at bottom for small screens */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          style={{ backgroundColor: '#34d399' }}
          aria-label="Quick navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
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

export default APIReference;