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
  ChevronRight,
  Shield,
  Copy,
  AlertTriangle
} from 'lucide-react';

const QuickstartGuide = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [copied, setCopied] = useState(false);
  
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
      const scrollPosition = window.scrollY + 100;
      
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

  // Code examples
  const sdkExample = `<script src="https://cdn.housetabz.com/sdk/v1/housetabz.min.js"></script>

<script>
  await window.HouseTabz.init({
    apiKey: 'htz_your_api_key_here',
    environment: 'production'
  });

  await window.HouseTabz.mount('#housetabz-button', {
    serviceName: 'Service Name',
    serviceType: 'energy','internet, 'cleaning', 'etc',
    estimatedAmount: 137,
    transactionId: 'TransactionId in your system (users sessionId)',
    onSuccess: (data) => {
      console.log('Connection successful:', data);
    }
  });
</script>`;

  const webhookExample = `// Webhook handler with HMAC signature verification
app.post('/webhooks/housetabz', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['housetabz-signature'];
  const timestamp = req.headers['housetabz-timestamp'];
  
  // CRITICAL: Verify signature before processing
  if (!verifySignature(req.body, timestamp, signature)) {
    return res.status(401).json({error: 'Invalid signature'});
  }
  
  const event = JSON.parse(req.body.toString());
  
  switch(event.event) {
    case 'agreement.created':
      // Create payment method and agreement
      break;
    case 'request.authorized':  
      // Update agreement status to 'active'
      break;
    case 'bill.created':
      // Handle bill creation confirmation
      break;
    case 'bill.paid':
      // Mark bill as paid
      break;
  }
  
  res.status(200).json({received: true});
});`;

  const billCreateExample = `// Create a bill for an active HouseTabz agreement
const crypto = require('crypto');

const apiKey = 'htz_your_api_key_here';
const secretKey = 'htzsk_your_secret_key_here';

// Request data
const requestBody = {
  houseTabzAgreementId: "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
  externalBillId: "TEST-BILL-002",
  amount: 110,
  dueDate: "2025-07-15T00:00:00.000Z",
  billingPeriod: "May 2025"
};

// Generate authentication headers
const timestamp = Math.floor(Date.now() / 1000).toString();
const payload = JSON.stringify(requestBody);
const signedPayload = \`\${timestamp}.\${payload}\`;
const signature = crypto.createHmac('sha256', secretKey).update(signedPayload).digest('hex');
const signatureWithPrefix = \`sha256=\${signature}\`;

const response = await fetch('https://api.housetabz.com/api/partners/bills', {
  method: 'POST',
  headers: {
    'x-api-key': apiKey,
    'housetabz-timestamp': timestamp,
    'housetabz-signature': signatureWithPrefix,
    'Content-Type': 'application/json'
  },
  body: payload
});`;

  // Webhook payload examples
  const agreementCreatedExample = `{
  "event": "agreement.created",
  "timestamp": "2025-05-26T10:30:00.000Z",
  "data": {
    "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
    "transactionId": "OCTOPUS-1716717000000",
    "serviceName": "Octopus Energy - Octo12",
    "serviceType": "energy",
    "estimatedAmount": 137,
    "status": "pending"
  }
}`;

  const requestAuthorizedExample = `{
  "event": "request.authorized",
  "timestamp": "2025-05-26T12:45:00.000Z",
  "data": {
    "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
    "transactionId": "OCTOPUS-1716717000000",
    "status": "active",
  }
}`;

  const billCreatedExample = `{
  "event": "bill.created",
  "timestamp": "2025-05-26T14:00:00.000Z",
  "data": {
    "billId": "htz_bill_abc123",
    "externalBillId": "BillId-In-Your-System",
    "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
    "amount": 110,
    "dueDate": "2025-07-15T00:00:00.000Z",
    "billingPeriod": "May 2025",
    "status": "pending",
  }
}`;

  const billPaidExample = `{
  "event": "bill.paid",
  "timestamp": "2025-05-26T16:30:00.000Z",
  "data": {
    "billId": "htz_bill_abc123",
    "externalBillId": "BillId-In-Your-System",
    "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
    "amount": 110,
    "paidDate": "2025-05-26T16:30:00.000Z",
    "status": "paid",
  }
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
              title="SDK Integration"
              isActive={activeSection === 'sdk'}
              onClick={() => navigateTo('sdk')}
              mobile
            />
            <NavItem 
              icon={<Database className="w-5 h-5" />}
              title="Database Setup"
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
              title="Create Bills"
              isActive={activeSection === 'billing'}
              onClick={() => navigateTo('billing')}
              mobile
            />
            <NavItem 
              icon={<CheckCircle className="w-5 h-5" />}
              title="Payment Confirmation"
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
                  title="SDK Integration"
                  isActive={activeSection === 'sdk'}
                  onClick={() => navigateTo('sdk')}
                />
                <NavItem 
                  icon={<Database className="w-5 h-5" />}
                  title="Database Setup"
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
                  title="Create Bills"
                  isActive={activeSection === 'billing'}
                  onClick={() => navigateTo('billing')}
                />
                <NavItem 
                  icon={<CheckCircle className="w-5 h-5" />}
                  title="Payment Confirmation"
                  isActive={activeSection === 'confirmation'}
                  onClick={() => navigateTo('confirmation')}
                />
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
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
                    A quick guide to integrating shared payments for housemates
                  </p>
                </div>
                <img 
                  src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo-update.png" 
                  alt="HouseTabz Logo" 
                  className="relative w-1/2 md:w-1/3 max-w-xs mx-auto"
                />
              </div>
              
              {/* API Keys Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2 w-5 h-5" style={{ color: '#34d399' }} />
                  Secure Authentication
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  HouseTabz uses industry-standard HMAC-SHA256 signature authentication to ensure all API requests are secure and verified.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">API Key</div>
                    <code className="block p-2 bg-gray-100 text-gray-800 rounded text-sm font-mono overflow-x-auto">
                      htz_your_api_key_here
                    </code>
                    <p className="text-xs text-gray-500 mt-1">Used in x-api-key header</p>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Secret Key</div>
                    <code className="block p-2 bg-gray-100 text-gray-800 rounded text-sm font-mono overflow-x-auto">
                      htzsk_your_secret_key_here
                    </code>
                    <p className="text-xs text-gray-500 mt-1">Used for HMAC signature generation</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Security Requirements
                  </h3>
                  <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                    <li>All API requests MUST include HMAC-SHA256 signatures</li>
                    <li>Webhook events MUST be verified before processing</li>
                    <li>Timestamps prevent replay attacks (5 minute window)</li>
                    <li>Never expose your secret key in client-side code</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Sandbox Environment
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Production Environment
                  </div>
                </div>
              </div>
              
              {/* Integration Steps Overview */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Integration Overview</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                  Complete HouseTabz integration in 5 simple steps. Each step builds on the previous to create a seamless shared payment experience.
                </p>
                
                <ol className="space-y-4 md:space-y-6">
                  <IntegrationStep 
                    number="1" 
                    title="Add SDK to your checkout page"
                    description="Integrate the 'Pay with HouseTabz' button"
                    icon={<Code className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('sdk')}
                  />
                  <IntegrationStep 
                    number="2" 
                    title="Update your database schema"
                    description="Add payment methods and agreements tables"
                    icon={<Database className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('db')}
                  />
                  <IntegrationStep 
                    number="3" 
                    title="Handle webhook events"
                    description="Process real-time notifications from HouseTabz"
                    icon={<Webhook className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('webhooks')}
                  />
                  <IntegrationStep 
                    number="4" 
                    title="Create bills via API"
                    description="Send billing information to charge housemates"
                    icon={<FileText className="w-5 h-5" style={{ color: '#34d399' }} />}
                    onClick={() => navigateTo('billing')}
                  />
                  <IntegrationStep 
                    number="5" 
                    title="Receive payment confirmations"
                    description="Get notified when bills are fully paid"
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
                title="Step 1: SDK Integration"
                subtitle="Add the HouseTabz SDK to your checkout page"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Frontend Integration</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    The HouseTabz SDK provides a simple "Pay with HouseTabz" button that handles the complete shared payment flow.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>How It Works</h3>
                      <ol className="list-decimal list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>Customer clicks "Pay with HouseTabz" button</li>
                        <li>Customer is redirected to HouseTabz to set up sharing</li>
                        <li>HouseTabz sends <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">agreement.created</code> webhook to your server</li>
                        <li>Housemates approve the agreement via HouseTabz platform</li>
                        <li>You receive <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">request.authorized</code> webhook when ready</li>
                      </ol>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <div className="text-xs md:text-sm font-mono text-gray-600">SDK Implementation</div>
                        <button 
                          onClick={() => copyToClipboard(sdkExample)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono whitespace-pre-wrap">
                            {sdkExample}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Required Parameters</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">serviceName</code>: Name of your service (e.g., "Netflix Premium")</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">serviceType</code>: Type of service (energy, streaming, internet, etc.)</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">estimatedAmount</code>: Expected monthly cost</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">transactionId</code>: Your unique transaction identifier</li>
                      </ul>
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
                title="Step 2: Database Setup"
                subtitle="Update your database to support HouseTabz payments"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Database Schema Updates</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    You'll need to make two simple changes to your database to support HouseTabz payments.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-blue-800 mb-2">1. Update Payment Methods Table</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-2">
                        Add <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">'housetabz'</code> as a valid payment method type alongside your existing types (card, bank, etc.).
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-purple-800 mb-2">2. Create HouseTabz Agreements Table</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-3">
                        Create a new table to track HouseTabz agreements and their lifecycle.
                      </p>
                      
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                          <div className="text-xs font-mono text-gray-600">housetabz_agreements Schema</div>
                        </div>
                        <div className="bg-gray-50 p-3">
                          <pre className="text-xs overflow-x-auto">
                            <code className="text-gray-800 font-mono">
{`{
  id: string,                    // Your internal ID
  user_id: string,              // Your customer ID
  housetabz_agreement_id: string, // HouseTabz agreement ID
  transaction_id: string,        // Your transaction ID
  payment_method_id: string,     // Reference to payment method
  status: enum(                 // Agreement status
    'pending',     // Waiting for housemate approval
    'active',      // All housemates approved
    'completed',   // Agreement fulfilled
    'cancelled'    // Agreement cancelled
  ),
  created_at: timestamp,
  updated_at: timestamp
}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-amber-800 mb-2">Database Updates via Webhooks</h3>
                      <p className="text-sm md:text-base text-gray-700">
                        When you receive the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm">agreement.created</code> webhook, 
                        create both a payment method entry and a HouseTabz agreement entry. This keeps your existing payment flow intact.
                      </p>
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
                title="Step 3: Webhook Integration"
                subtitle="Handle real-time notifications from HouseTabz"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Secure Webhook Handling</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    HouseTabz sends secure webhook notifications as users progress through the shared payment flow. 
                    All webhooks MUST be verified using HMAC signatures.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-red-800 mb-2 flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        CRITICAL: Signature Verification Required
                      </h3>
                      <p className="text-sm md:text-base text-red-800 mb-2">
                        You MUST verify webhook signatures before processing events. This prevents malicious webhook attacks.
                      </p>
                      <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                        <li>Use timing-safe comparison to prevent timing attacks</li>
                        <li>Check timestamp to prevent replay attacks (5 minute window)</li>
                        <li>Verify HMAC-SHA256 signature using your secret key</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 md:p-4">
                        <h3 className="font-medium text-purple-800 mb-2">🔔 agreement.created</h3>
                        <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-2 md:ml-4 space-y-1">
                          <li><strong>Trigger:</strong> Customer completes HouseTabz request</li>
                          <li><strong>Action:</strong> Create payment method with type 'housetabz'</li>
                          <li><strong>Action:</strong> Create agreement record with status 'pending'</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                        <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>🔔 request.authorized</h3>
                        <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-2 md:ml-4 space-y-1">
                          <li><strong>Trigger:</strong> All housemates have approved</li>
                          <li><strong>Action:</strong> Update agreement status to 'active'</li>
                          <li><strong>Result:</strong> Ready to create bills via API</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                        <h3 className="font-medium text-blue-800 mb-2">🔔 bill.paid</h3>
                        <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-2 md:ml-4 space-y-1">
                          <li><strong>Trigger:</strong> Bill fully paid by all housemates</li>
                          <li><strong>Action:</strong> Update bill status to 'paid'</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <div className="text-xs md:text-sm font-mono text-gray-600">Webhook Handler with Signature Verification</div>
                        <button 
                          onClick={() => copyToClipboard(webhookExample)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono whitespace-pre-wrap">
                            {webhookExample}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Webhook Event Examples</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-3">
                        Here are the exact webhook payloads you'll receive:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
                            <div className="text-xs font-mono text-gray-600">agreement.created</div>
                            <button 
                              onClick={() => copyToClipboard(agreementCreatedExample)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="bg-gray-50 p-3">
                            <pre className="text-xs overflow-x-auto">
                              <code className="text-gray-800 font-mono whitespace-pre-wrap">
                                {agreementCreatedExample}
                              </code>
                            </pre>
                          </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
                            <div className="text-xs font-mono text-gray-600">request.authorized</div>
                            <button 
                              onClick={() => copyToClipboard(requestAuthorizedExample)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="bg-gray-50 p-3">
                            <pre className="text-xs overflow-x-auto">
                              <code className="text-gray-800 font-mono whitespace-pre-wrap">
                                {requestAuthorizedExample}
                              </code>
                            </pre>
                          </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
                            <div className="text-xs font-mono text-gray-600">bill.created</div>
                            <button 
                              onClick={() => copyToClipboard(billCreatedExample)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="bg-gray-50 p-3">
                            <pre className="text-xs overflow-x-auto">
                              <code className="text-gray-800 font-mono whitespace-pre-wrap">
                                {billCreatedExample}
                              </code>
                            </pre>
                          </div>
                        </div>
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
                title="Step 4: Create Bills"
                subtitle="Send billing information to HouseTabz when it's time to charge"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Billing API Integration</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Once a HouseTabz agreement is active, you can create bills that will be automatically split among housemates.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-amber-800 mb-2">Billing Flow</h3>
                      <ol className="list-decimal list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li>Check if payment method type is 'housetabz'</li>
                        <li>Ensure agreement status is 'active'</li>
                        <li>Send authenticated POST request to /api/partners/bills</li>
                        <li>HouseTabz splits bill among housemates automatically</li>
                        <li>Receive bill.paid webhook when fully collected</li>
                      </ol>
                    </div>
                    
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-red-800 mb-2">Authentication Required</h3>
                      <p className="text-sm md:text-base text-red-800">
                        All API requests require HMAC-SHA256 signatures with these headers:
                      </p>
                      <ul className="list-disc list-inside text-sm text-red-800 mt-2 space-y-1">
                        <li><code className="bg-red-100 px-1 py-0.5 rounded text-xs">x-api-key</code>: Your API key</li>
                        <li><code className="bg-red-100 px-1 py-0.5 rounded text-xs">housetabz-timestamp</code>: Unix timestamp</li>
                        <li><code className="bg-red-100 px-1 py-0.5 rounded text-xs">housetabz-signature</code>: HMAC signature</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <div className="text-xs md:text-sm font-mono text-gray-600">Create Bill API Example</div>
                        <button 
                          onClick={() => copyToClipboard(billCreateExample)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4">
                        <pre className="text-xs md:text-sm overflow-x-auto">
                          <code className="text-gray-800 font-mono whitespace-pre-wrap">
                            {billCreateExample}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Bill Parameters</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">houseTabzAgreementId</code>: The agreement ID from webhooks</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">externalBillId</code>: Your unique bill identifier</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">amount</code>: Bill amount in dollars</li>
                        <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">dueDate</code>: When payment is due</li>
                      </ul>
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
                title="Step 5: Payment Confirmation"
                subtitle="Receive notifications when bills are fully paid"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Payment Lifecycle Complete</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Once all housemates have paid their share, HouseTabz sends a final confirmation webhook.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>🔔 bill.paid Webhook</h3>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1 md:space-y-2">
                        <li><strong>Trigger:</strong> All housemates have paid their share</li>
                        <li><strong>Contains:</strong> Total amount paid, payment date, bill ID</li>
                        <li><strong>Action:</strong> Update your bill status to 'paid'</li>
                        <li><strong>Result:</strong> Payment cycle complete, service continues</li>
                      </ul>
                    </div>
                    
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                          <div className="text-xs md:text-sm font-mono text-gray-600">bill.paid Webhook Payload</div>
                          <button 
                            onClick={() => copyToClipboard(billPaidExample)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="bg-gray-50 p-3 md:p-4">
                          <pre className="text-xs md:text-sm overflow-x-auto">
                            <code className="text-gray-800 font-mono whitespace-pre-wrap">
                              {billPaidExample}
                            </code>
                          </pre>
                        </div>
                      </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Payment Processing</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-2">
                        HouseTabz handles all the complexity of:
                      </p>
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 ml-4 space-y-1">
                        <li>Splitting bills among housemates</li>
                        <li>Sending payment reminders</li>
                        <li>Processing individual payments</li>
                        <li>Handling failed payments and retries</li>
                        <li>Consolidating payments to you</li>
                      </ul>
                    </div>

                 
                  </div>
                </div>
              </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 md:py-8 mt-12 md:mt-16">
              <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-500 mb-4">
                    &copy; {new Date().getFullYear()} HouseTabz. All rights reserved.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a href="/docs" className="text-sm text-gray-500 hover:text-gray-700">Documentation</a>
                    <a href="/api-reference" className="text-sm text-gray-500 hover:text-gray-700">API Reference</a>
                    <a href="/support" className="text-sm text-gray-500 hover:text-gray-700">Support</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Copied toast notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md text-sm animate-fade-in-out z-50">
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

// Integration Step Component
const IntegrationStep = ({ number, title, description, icon, onClick }) => {
  return (
    <li className="flex">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-sm mr-3" 
        style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
        {number}
      </div>
      <div className="flex-1">
        <button 
          onClick={onClick}
          className="group text-left w-full"
        >
          <div className="flex items-center text-gray-800 hover:text-green-700 font-medium group-hover:text-green-600">
            <span className="flex-1">{title}</span>
            <span className="ml-2 text-gray-400 group-hover:text-green-500">
              {icon}
            </span>
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
              {description}
            </p>
          )}
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