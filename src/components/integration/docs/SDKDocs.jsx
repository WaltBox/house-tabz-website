import React, { useState, useRef, useEffect } from 'react';
import { 
  Rocket,
  Code, 
  Database, 
  FileText, 
  CheckCircle,
  Home,
  Lock,
  Menu,
  X,
  ChevronLeft,
  Copy,
  ArrowRight,
  Smartphone,
  Globe
} from 'lucide-react';

const SDKDocs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Font import
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    return () => document.head.removeChild(fontLink);
  }, []);

  // Section Refs
  const overviewRef = useRef(null);
  const installationRef = useRef(null);
  const initializationRef = useRef(null);
  const buttonRef = useRef(null);
  const optionsRef = useRef(null);
  const exampleRef = useRef(null);

  const contentRefs = {
    overview: overviewRef,
    installation: installationRef,
    initialization: initializationRef,
    button: buttonRef,
    options: optionsRef,
    example: exampleRef
  };

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      Object.entries(contentRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Topbar */}
      <header className="fixed w-full z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex lg:hidden items-center space-x-2" style={{ color: '#34d399' }}>
                <Rocket className="w-5 h-5" />
                <h2 className="font-semibold text-base">SDK Docs</h2>
              </div>
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
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-lg font-semibold">SDK Docs</div>
          <button
            type="button"
            className="p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto max-h-screen pb-20">
          <NavItem icon={<ChevronLeft className="w-5 h-5" />} title="Back to Docs" href="/docs" />
          <li className="my-3 border-t border-gray-200"></li>
          <NavItem icon={<Home className="w-5 h-5" />} title="Overview" isActive={activeSection === 'overview'} onClick={() => navigateTo('overview')} />
          <NavItem icon={<Code className="w-5 h-5" />} title="Installation" isActive={activeSection === 'installation'} onClick={() => navigateTo('installation')} />
          <NavItem icon={<Lock className="w-5 h-5" />} title="Initialization" isActive={activeSection === 'initialization'} onClick={() => navigateTo('initialization')} />
          <NavItem icon={<FileText className="w-5 h-5" />} title="Adding the Button" isActive={activeSection === 'button'} onClick={() => navigateTo('button')} />
          <NavItem icon={<Database className="w-5 h-5" />} title="Configuration Options" isActive={activeSection === 'options'} onClick={() => navigateTo('options')} />
          <NavItem icon={<CheckCircle className="w-5 h-5" />} title="Example Integration" isActive={activeSection === 'example'} onClick={() => navigateTo('example')} />
        </nav>
      </div>

      {/* Fixed Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto top-16 pt-6">
          <div className="px-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
              <Code className="w-5 h-5" />
              <h2 className="font-bold text-lg">SDK Documentation</h2>
            </div>
          </div>
          <nav className="px-6 pt-2">
            <ul className="space-y-1">
              <NavItem icon={<ChevronLeft className="w-5 h-5" />} title="Back to Docs" href="/docs" />
              <li className="my-3 border-t border-gray-200"></li>
              <NavItem icon={<Home className="w-5 h-5" />} title="Overview" isActive={activeSection === 'overview'} onClick={() => navigateTo('overview')} />
              <NavItem icon={<Code className="w-5 h-5" />} title="Installation" isActive={activeSection === 'installation'} onClick={() => navigateTo('installation')} />
              <NavItem icon={<Lock className="w-5 h-5" />} title="Initialization" isActive={activeSection === 'initialization'} onClick={() => navigateTo('initialization')} />
              <NavItem icon={<FileText className="w-5 h-5" />} title="Adding the Button" isActive={activeSection === 'button'} onClick={() => navigateTo('button')} />
              <NavItem icon={<Database className="w-5 h-5" />} title="Configuration Options" isActive={activeSection === 'options'} onClick={() => navigateTo('options')} />
              <NavItem icon={<CheckCircle className="w-5 h-5" />} title="Example Integration" isActive={activeSection === 'example'} onClick={() => navigateTo('example')} />
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 mt-16">

          {/* Overview Section */}
          <section ref={overviewRef} id="overview" className="mb-16 scroll-mt-24">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                HouseTabz SDK
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                Easily add HouseTabz shared payment functionality to your checkout page
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 mb-4">
                The HouseTabz SDK allows you to integrate a "Connect to HouseTabz" button into your checkout flow,
                allowing your customers to share ownership of services with their housemates.
              </p>

              <h3 className="font-medium text-gray-900 mb-3">How It Works</h3>
              <p className="text-gray-600 mb-6">
                When your customer clicks the "Connect to HouseTabz" button, they're taken to HouseTabz to set up shared payment with their housemates. Once they complete the process, your callback functions are triggered to let you know the result. The SDK handles both mobile app and web browser flows automatically.
              </p>

              {/* Visual flow */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 text-sm">
                <div className="flex flex-col items-center text-center mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-2">
                    <Code className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="font-medium text-gray-900">Customer clicks button</div>
                </div>
                <div className="hidden md:block">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-center text-center mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-2">
                    <img src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" alt="HouseTabz" className="w-8 h-8" />
                  </div>
                  <div className="font-medium text-gray-900">HouseTabz flow</div>
                </div>
                <div className="hidden md:block">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="font-medium text-gray-900">Success callback</div>
                </div>
              </div>

              {/* Platform Support */}
           

              {/* Features */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-green-600">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Simple integration with just a few lines of code</li>
                  <li>Customizable button styling to match your brand</li>
                  <li>Success, error, and cancel callback functions</li>
                  <li>TypeScript support with full type definitions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section ref={installationRef} id="installation" className="mb-16 scroll-mt-24">
            <SectionHeader 
              icon={<Code className="w-6 h-6" />}
              title="Installation"
              subtitle="Add the HouseTabz SDK to your website"
            />
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Including the Script</h2>
                <p className="text-gray-600 mb-6">
                  Add the HouseTabz SDK to your website by including the script tag inside your HTML.
                </p>

                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-sm font-mono text-gray-600">HTML</div>
                      <button 
                        onClick={() => copyToClipboard('<script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"></script>')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono">
                          &lt;script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"&gt;&lt;/script&gt;
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-2">Important</h3>
                    <p className="text-gray-700">
                      The SDK becomes available as <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">window.HouseTabz</code> after the script is loaded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Initialization Section */}
          <section ref={initializationRef} id="initialization" className="mb-16 scroll-mt-24">
            <SectionHeader 
              icon={<Lock className="w-6 h-6" />}
              title="Initialization"
              subtitle="Configure the SDK with your API keys"
            />
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Initializing the SDK</h2>
                <p className="text-gray-600 mb-6">
                  Before you can use the SDK, initialize it with your API key from the partner dashboard.
                </p>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-sm font-mono text-gray-600">JavaScript</div>
                    <button 
                      onClick={() => copyToClipboard(`await window.HouseTabz.init({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'development', 'staging'
});`)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-gray-800 font-mono">
{`await window.HouseTabz.init({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'development', 'staging'
});`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mt-6">
                  <h3 className="font-medium text-purple-800 mb-2">Configuration Options</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">apiKey</code>: Required API Key from your partner dashboard</li>
                    <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">environment</code>: 'production', 'development', or 'staging'</li>
                    <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">userId</code> (optional): Your internal user ID</li>
                    <li><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">partnerId</code> (optional): Your partner ID if known</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Adding the Button Section */}
          <section ref={buttonRef} id="button" className="mb-16 scroll-mt-24">
            <SectionHeader 
              icon={<FileText className="w-6 h-6" />}
              title="Adding the Button"
              subtitle="Mount the 'Connect to HouseTabz' button"
            />
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mounting the Button</h2>
                <p className="text-gray-600 mb-6">
                  After initialization, mount the button onto any container element.
                </p>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-sm font-mono text-gray-600">JavaScript</div>
                    <button 
                      onClick={() => copyToClipboard(`await window.HouseTabz.mount('#housetabz-button', {
  serviceName: 'Octopus Energy - Octo12',
  serviceType: 'energy',
  estimatedAmount: 137,
  requiredUpfrontPayment: 0,
  transactionId: 'OCTOPUS-' + Date.now(),
  buttonStyle: {
    buttonText: 'Connect to',
    width: '100%'
  },
  onSuccess: (data) => {
    console.log('Connection successful:', data);
    // Handle successful connection
  },
  onError: (error) => {
    console.error('Connection error:', error);
    // Handle error
  },
  onCancel: () => {
    console.log('Connection cancelled');
    // Handle cancellation
  }
});`)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-gray-800 font-mono">
{`await window.HouseTabz.mount('#housetabz-button', {
  serviceName: 'Octopus Energy - Octo12',
  serviceType: 'energy',
  estimatedAmount: 137,
  requiredUpfrontPayment: 0,
  transactionId: 'OCTOPUS-' + Date.now(),
  buttonStyle: {
    buttonText: 'Connect to',
    width: '100%'
  },
  onSuccess: (data) => {
    console.log('Connection successful:', data);
    // Handle successful connection
  },
  onError: (error) => {
    console.error('Connection error:', error);
    // Handle error
  },
  onCancel: () => {
    console.log('Connection cancelled');
    // Handle cancellation
  }
});`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-6">
                  <h3 className="font-medium text-green-600 mb-2">HTML Container Required</h3>
                  <p className="text-gray-700 mb-2">
                    You need a container element for the button:
                  </p>
                  <pre className="text-sm bg-gray-100 p-2 rounded">
                    <code className="text-gray-800 font-mono">
                      &lt;div id="housetabz-button"&gt;&lt;/div&gt;
                    </code>
                  </pre>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                  <h3 className="font-medium text-blue-800 mb-2">Callback Functions</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li><strong>onSuccess:</strong> Called when the user successfully connects to HouseTabz</li>
                    <li><strong>onError:</strong> Called when an error occurs during the connection process</li>
                    <li><strong>onCancel:</strong> Called when the user cancels the connection process</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Options Section */}
          <section 
            ref={optionsRef} 
            id="options" 
            className="mb-16 scroll-mt-24"
          >
            <SectionHeader 
              icon={<Database className="w-6 h-6" />}
              title="Configuration Options"
              subtitle="Customize the appearance and behavior of the SDK"
            />
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Mount Options</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  The <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">mount()</code> method accepts these options to customize the button.
                </p>

                <div className="space-y-4 md:space-y-6">
                  {/* Required Parameters */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 md:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 md:mb-3">Required Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-700">Parameter</th>
                            <th className="text-left py-2 font-medium text-gray-700">Type</th>
                            <th className="text-left py-2 font-medium text-gray-700">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">serviceName</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Name of the service (e.g., "Octopus Energy - Octo12")</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">serviceType</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">'energy', 'cleaning', 'internet', 'streaming', 'rent', or 'other'</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">estimatedAmount</td>
                            <td className="py-2 text-gray-600">number</td>
                            <td className="py-2 text-gray-600">Estimated monthly payment amount in dollars</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-900 font-mono">transactionId</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Unique ID for this transaction</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Optional Parameters */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 md:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 md:mb-3">Optional Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-700">Parameter</th>
                            <th className="text-left py-2 font-medium text-gray-700">Type</th>
                            <th className="text-left py-2 font-medium text-gray-700">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">requiredUpfrontPayment</td>
                            <td className="py-2 text-gray-600">number</td>
                            <td className="py-2 text-gray-600">Any upfront deposit or payment required (optional)</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">onSuccess</td>
                            <td className="py-2 text-gray-600">function</td>
                            <td className="py-2 text-gray-600">Callback when connection is successful</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">onError</td>
                            <td className="py-2 text-gray-600">function</td>
                            <td className="py-2 text-gray-600">Callback when an error occurs</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-900 font-mono">onCancel</td>
                            <td className="py-2 text-gray-600">function</td>
                            <td className="py-2 text-gray-600">Callback when user cancels the connection</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Styling Options */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 md:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 md:mb-3">Styling Options</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                      You can customize the button appearance using the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">buttonStyle</code> object:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-700">Parameter</th>
                            <th className="text-left py-2 font-medium text-gray-700">Type</th>
                            <th className="text-left py-2 font-medium text-gray-700">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">width</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Custom button width (e.g., '100%', '250px')</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">borderRadius</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Button border radius (e.g., '4px', '8px')</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-900 font-mono">fontSize</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Text font size (e.g., '14px', '16px')</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-900 font-mono">buttonText</td>
                            <td className="py-2 text-gray-600">string</td>
                            <td className="py-2 text-gray-600">Custom text for the button (default: "Pay with")</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Integration Section */}
          <section 
            ref={exampleRef} 
            id="example" 
            className="mb-16 scroll-mt-24"
          >
            <SectionHeader 
              icon={<CheckCircle className="w-6 h-6" />}
              title="Example Integration"
              subtitle="Complete example of integrating HouseTabz in a checkout page"
            />
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Integration Example</h2>
                <p className="text-gray-600 mb-6">
                  Here's a complete example showing how to integrate the HouseTabz SDK in a checkout page, based on the Octopus Energy demo.
                </p>

                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-sm font-mono text-gray-600">HTML</div>
                      <button 
                        onClick={() => copyToClipboard(`<!DOCTYPE html>
<html>
<head>
    <title>Energy Plan Checkout - Octopus Energy</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"></script>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #210654;
            color: white;
            padding: 2rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .payment-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        .plan-details {
            margin-bottom: 2rem;
        }
        .price {
            font-size: 2rem;
            color: #ff48d8;
            font-weight: bold;
        }
        #housetabz-button {
            margin: 1rem 0;
        }
        .info-box {
            background: rgba(255, 72, 216, 0.1);
            padding: 1rem;
            border-radius: 4px;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Review your order</h1>
        
        <div class="plan-details">
            <h2>Your Plan</h2>
            <h3>Octo 12</h3>
            <p>Our most basic plan</p>
            <div class="price">$137</div>
            <p>monthly estimate for 1000 kWh</p>
        </div>

        <div class="payment-section">
            <h2>Add your payment details</h2>
            
            <p>Split energy costs automatically with your housemates using HouseTabz - just like PayPal for shared household expenses.</p>
            
            <div id="housetabz-button"></div>
            
            <div class="info-box">
                <p><strong>Good to know:</strong> With HouseTabz, your energy bill will be automatically split between all housemates. Everyone gets notified and pays their share - no more chasing people for money!</p>
            </div>
        </div>
    </div>

    <script>
        const PARTNER_CONFIG = {
            apiKey: 'your_api_key_here',  // Replace with your actual API key
            environment: 'production'     // Use 'development' for testing
        };
        
        async function initializeHouseTabzSDK() {
            try {
                // Initialize the SDK
                await window.HouseTabz.init({
                    apiKey: PARTNER_CONFIG.apiKey,
                    environment: PARTNER_CONFIG.environment
                });
                
                // Mount the button
                await window.HouseTabz.mount('#housetabz-button', {
                    serviceName: 'Octopus Energy - Octo12',
                    serviceType: 'energy',
                    estimatedAmount: 137,
                    requiredUpfrontPayment: 0,
                    transactionId: \`OCTOPUS-\${Date.now()}\`,
                    buttonStyle: {
                        buttonText: 'Connect to',
                        width: '100%'
                    },
                    onSuccess: (data) => {
                        console.log('✅ HouseTabz connection successful:', data);
                        
                        // Show success message
                        const successDiv = document.createElement('div');
                        successDiv.style.cssText = 'background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; padding: 1rem; border-radius: 4px; margin-top: 1rem;';
                        successDiv.innerHTML = \`
                            <div style="color: #10b981; font-weight: bold;">HouseTabz request sent! 🎉</div>
                            <div style="margin-top: 0.5rem;">Your housemates will receive a notification to approve this energy plan.</div>
                        \`;
                        document.querySelector('.payment-section').appendChild(successDiv);
                    },
                    onError: (error) => {
                        console.error('❌ HouseTabz connection error:', error);
                        alert('Connection failed: ' + error.message);
                    },
                    onCancel: () => {
                        console.log('⚠️ HouseTabz connection cancelled');
                    }
                });
                
                console.log('HouseTabz SDK initialized successfully');
                
            } catch (error) {
                console.error('HouseTabz SDK initialization failed:', error);
                alert('Failed to initialize HouseTabz: ' + error.message);
            }
        }
        
        // Initialize when page loads
        window.addEventListener('load', () => {
            initializeHouseTabzSDK();
        });
    </script>
</body>
</html>`)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
{`<!DOCTYPE html>
<html>
<head>
    <title>Energy Plan Checkout - Octopus Energy</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Review your order</h1>
        
        <div class="plan-details">
            <h2>Your Plan - Octo 12</h2>
            <div class="price">$137/month</div>
            <p>1000 kWh monthly estimate</p>
        </div>

        <div class="payment-section">
            <h2>Payment Method</h2>
            <p>Split costs with your housemates using HouseTabz</p>
            
            <div id="housetabz-button"></div>
        </div>
    </div>

    <script>
        window.addEventListener('load', async () => {
            try {
                await window.HouseTabz.init({
                    apiKey: 'your_api_key_here',
                    environment: 'production'
                });

                await window.HouseTabz.mount('#housetabz-button', {
                    serviceName: 'Octopus Energy - Octo12',
                    serviceType: 'energy',
                    estimatedAmount: 137,
                    requiredUpfrontPayment: 0,
                    transactionId: \`OCTOPUS-\${Date.now()}\`,
                    buttonStyle: {
                        buttonText: 'Connect to',
                        width: '100%'
                    },
                    onSuccess: (data) => {
                        console.log('Connection successful:', data);
                        // Handle successful connection
                    },
                    onError: (error) => {
                        console.error('Connection error:', error);
                        // Handle error
                    },
                    onCancel: () => {
                        console.log('Connection cancelled');
                        // Handle cancellation
                    }
                });
            } catch (error) {
                console.error('HouseTabz error:', error);
            }
        });
    </script>
</body>
</html>`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">How It Works</h3>
                    <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-2">
                      <li>The SDK is loaded from our CDN</li>
                      <li>On page load, the SDK is initialized with your API key</li>
                      <li>The "Connect to HouseTabz" button is mounted to the specified container</li>
                      <li>When clicked, the button initiates the HouseTabz connection flow</li>
                      <li>Success/error/cancel callbacks handle the result</li>
                    </ol>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>What the Button Looks Like</h3>
                    <div className="bg-white p-4 rounded border border-gray-200 flex items-center justify-center">
                      <div className="flex items-center justify-center w-[250px] h-10 bg-white border border-gray-300 rounded shadow-sm px-4">
                        <div className="h-5 w-5 mr-2">
                          <img 
                            src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
                            alt="HouseTabz" 
                            className="h-full w-auto"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Connect to <span className="font-bold" style={{ color: '#34d399' }}>HouseTabz</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-6">
                    <h3 className="font-medium text-amber-800 mb-2">Important Notes</h3>
                    <ul className="list-disc list-inside text-amber-800 space-y-1 text-sm">
                      <li>Replace <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">your_api_key_here</code> with your actual API key from the partner dashboard</li>
                      <li>Use <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">environment: 'development'</code> for testing</li>
                      <li>Make sure your <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">transactionId</code> is unique for each transaction</li>
                      <li>The SDK automatically detects if it's running in the HouseTabz mobile app vs web browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-8 mt-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} HouseTabz. All rights reserved.
              </p>
            </div>
          </footer>

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

export default SDKDocs;