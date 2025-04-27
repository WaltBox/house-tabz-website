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
  ArrowRight,
  Bell,
  Shield
} from 'lucide-react';

const WebhookSetup = () => {
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
  const setupRef = useRef(null);
  const eventsRef = useRef(null);
  const securityRef = useRef(null);
  
  const contentRefs = {
    overview: overviewRef,
    setup: setupRef,
    events: eventsRef,
    security: securityRef
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const agreementCreatedExample = `{
  "event": "agreement.created",
  "timestamp": "2025-04-21T18:57:34.930Z",
  "houseTabzAgreementId": "b2df516a-d1cb-496f-a45b-0b986f62c00c",
  "externalAgreementId": 10001,
  "transactionId": "ENERGY-TEST-1745261821710",
  "serviceName": "Energy Test Plan",
  "serviceType": "energy",
  "estimatedAmount": 120,
  "status": "pending"
}`;

  const agreementAuthorizedExample = `{
  "event": "request.authorized",
  "timestamp": "2025-04-21T19:00:41.456Z",
  "houseTabzAgreementId": "b2df516a-d1cb-496f-a45b-0b986f62c00c",
  "externalAgreementId": 10001,
  "transactionId": "ENERGY-TEST-1745261821710",
  "status": "authorized",
  "serviceName": "Energy Test Plan",
  "serviceType": "energy"
}`;

const billPaidExample = `{
    "event": "bill.paid",
    "houseTabzAgreementId": "a10d74b5-43a8-487c-87ac-2f76d2fde008",
    "externalAgreementId": 10001,
    "externalBillId": "10134123",
    "amountPaid": 104,
    "paymentDate": "2025-04-24T16:18:41.210Z"
  }`;
  const webhookHandlerExample = `// Example webhook handler in Node.js/Express
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhooks/housetabz', async (req, res) => {
  try {
    const event = req.body;
    
    // Process based on event type
    switch(event.event) {
      case 'agreement.created':
        // Create a new payment method and agreement in your database
        await createPaymentMethodAndAgreement(event);
        break;
        
      case 'request.authorized':
        // Update agreement status to active
        await updateAgreementStatus(event.houseTabzAgreementId, 'active');
        break;
        
      // Handle other event types as needed
    }
    
    // Always return a 200 response quickly
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

async function createPaymentMethodAndAgreement(event) {
  // Create a payment method entry
  const paymentMethod = await db.PaymentMethods.create({
    type: 'housetabz',
    last4: '1234', // You can set this to a standard value
    brand: 'HouseTabz',
    userId: getUserIdFromTransaction(event.transactionId)
  });
  
  // Create a HouseTabz agreement entry
  await db.HouseTabzAgreements.create({
    userId: getUserIdFromTransaction(event.transactionId),
    housetabzAgreementId: event.houseTabzAgreementId,
    transactionId: event.transactionId,
    paymentMethodId: paymentMethod.id,
    status: 'pending'
  });
}

async function updateAgreementStatus(houseTabzAgreementId, status) {
  await db.HouseTabzAgreements.update(
    { status },
    { where: { housetabzAgreementId: houseTabzAgreementId } }
  );
}

function getUserIdFromTransaction(transactionId) {
  // Implement your logic to get the user ID from the transaction ID
  return 'user_123';
}

app.listen(3000, () => console.log('Webhook server running on port 3000'));`;

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
            <div className="text-lg font-semibold">Webhook Setup</div>
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
              icon={<Webhook className="w-5 h-5" />}
              title="Overview"
              isActive={activeSection === 'overview'}
              onClick={() => navigateTo('overview')}
              mobile
            />
            <NavItem 
              icon={<Code className="w-5 h-5" />}
              title="Webhook Setup"
              isActive={activeSection === 'setup'}
              onClick={() => navigateTo('setup')}
              mobile
            />
            <NavItem 
              icon={<Bell className="w-5 h-5" />}
              title="Webhook Events"
              isActive={activeSection === 'events'}
              onClick={() => navigateTo('events')}
              mobile
            />
         
          </nav>
        </div>

        {/* Fixed Side Navigation - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-gray-200 fixed h-[calc(100vh-4rem)] overflow-y-auto top-16 pt-6">
            <div className="px-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2" style={{ color: '#34d399' }}>
                <Webhook className="w-5 h-5" />
                <h2 className="font-bold text-lg">Webhook Setup</h2>
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
                  icon={<Webhook className="w-5 h-5" />}
                  title="Overview"
                  isActive={activeSection === 'overview'}
                  onClick={() => navigateTo('overview')}
                />
                <NavItem 
                  icon={<Code className="w-5 h-5" />}
                  title="Webhook Setup"
                  isActive={activeSection === 'setup'}
                  onClick={() => navigateTo('setup')}
                />
                <NavItem 
                  icon={<Bell className="w-5 h-5" />}
                  title="Webhook Events"
                  isActive={activeSection === 'events'}
                  onClick={() => navigateTo('events')}
                />
               
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 lg:pl-64">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Overview Section */}
            <section 
              ref={overviewRef} 
              id="overview" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Webhook Integration
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600">
                  Receive real-time updates from HouseTabz using webhooks
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  HouseTabz uses webhooks to notify your system about events that happen within the HouseTabz platform. 
                  This allows you to automate your systems in response to these events, such as creating payment methods and agreements
                  when a customer chooses to pay with HouseTabz.
                </p>
                
                <h3 className="font-medium text-gray-900 mb-3">Key Integration Points</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  There are three primary webhook events that you need to handle for the HouseTabz integration:
                </p>
                
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex-1 bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">agreement.created</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Sent when a customer chooses to pay with HouseTabz. You should create a new payment method and agreement in your database.
                    </p>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">request.authorized</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Sent when all housemates have authorized the HouseTabz agreement. You should update the agreement status from 'pending' to 'active'.
                    </p>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">bill.paid</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Sent when a bill has been fully paid by all housemates. You should update the bill status to 'paid' in your system.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4 mb-4 md:mb-6" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                  <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Webhook Flow</h3>
                  <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-4">
                    When a customer uses the "Pay with HouseTabz" button, your system will receive webhooks in this sequence:
                  </p>
                  <ol className="list-decimal list-inside text-xs md:text-sm text-gray-700 space-y-1 md:space-y-2 ml-2 md:ml-4">
                    <li><strong>agreement.created</strong> - Create payment method and agreement entry (status: 'pending')</li>
                    <li><strong>request.authorized</strong> - Update agreement status to 'active' after all housemates approve</li>
                    <li><strong>bill.paid</strong> - Sent when bills are paid via the HouseTabz platform</li>
                  </ol>
                </div>
              </div>
            </section>
            
            {/* Setup Section */}
            <section 
              ref={setupRef} 
              id="setup" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Code className="w-6 h-6" />}
                title="Setting Up Your Webhook Endpoint"
                subtitle="Configure your server to receive webhook events"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Creating a Webhook Endpoint</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    To receive webhook events from HouseTabz, you need to create an endpoint on your server that can:
                  </p>

                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 ml-2 md:ml-4 mb-4 md:mb-6 space-y-1 md:space-y-2">
                    <li>Accept HTTP POST requests</li>
                    <li>Parse JSON payloads</li>
                    <li>Verify webhook signatures (recommended)</li>
                    <li>Respond quickly with a 200 status code</li>
                    <li>Process events asynchronously</li>
                  </ul>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">Example Webhook Handler (Node.js/Express)</div>
                      <button 
                        onClick={() => copyToClipboard(webhookHandlerExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {webhookHandlerExample}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
             
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mt-6 md:mt-8">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Registering Your Webhook URL</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    After creating your webhook endpoint, you need to register it with HouseTabz to receive events:
                  </p>

                  <ol className="list-decimal list-inside text-xs md:text-sm text-gray-600 ml-2 md:ml-4 mb-4 md:mb-6 space-y-2 md:space-y-3">
                    <li><strong>Register in Dashboard:</strong> Go to the HouseTabz Partner Dashboard and navigate to the "Webhooks" section.</li>
                    <li><strong>Add Endpoint:</strong> Click "Add Endpoint" and enter your webhook URL (e.g., https://your-domain.com/webhooks/housetabz).</li>
                    <li><strong>Subscribe to Events:</strong> Select the events you want to receive (agreement.created and request.authorized).</li>
                    <li><strong>Save Configuration:</strong> Click "Save" to complete the registration.</li>
                  </ol>
                  
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <h3 className="font-medium text-purple-800 mb-2">Testing Your Webhook</h3>
                    <p className="text-xs md:text-sm text-gray-700 mb-2">
                      Once registered, you can use the "Test Webhook" button in the dashboard to send a test event to your endpoint.
                    </p>
                    <p className="text-xs md:text-sm text-gray-700">
                      This allows you to verify that your server is correctly receiving and processing webhook events before going live.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Events Section */}
            <section 
              ref={eventsRef} 
              id="events" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Bell className="w-6 h-6" />}
                title="Webhook Events"
                subtitle="Detailed information about the events your system will receive"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">agreement.created Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when a customer chooses to pay with HouseTabz. When you receive this event, you should:
                  </p>

                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 ml-2 md:ml-4 mb-4 md:mb-6 space-y-1 md:space-y-2">
                    <li>Create a new payment method in your payment methods table</li>
                    <li>Create a new HouseTabz agreement entry in your housetabz_agreements table</li>
                    <li>Set the agreement status to 'pending'</li>
                  </ul>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">agreement.created Event Example</div>
                      <button 
                        onClick={() => copyToClipboard(agreementCreatedExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {agreementCreatedExample}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto mb-6 md:mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">event</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">The type of event ("agreement.created")</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">timestamp</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (ISO 8601)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">When the event occurred</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">houseTabzAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (UUID)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Unique identifier for the HouseTabz agreement</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">externalAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string | null</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Optional external reference ID</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">transactionId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Your transaction identifier</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">serviceName</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Name of the service</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">serviceType</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Type of service (e.g., "energy")</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">estimatedAmount</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">number</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Estimated monthly payment amount</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">status</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Current status ("pending")</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mt-6 md:mt-8">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">request.authorized Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when all housemates have authorized the HouseTabz agreement. When you receive this event, you should:
                  </p>

                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 ml-2 md:ml-4 mb-4 md:mb-6 space-y-1 md:space-y-2">
                    <li>Find the HouseTabz agreement using the houseTabzAgreementId</li>
                    <li>Update the status from 'pending' to 'active'</li>
                    <li>Process any pending transactions related to this agreement</li>
                  </ul>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">request.authorized Event Example</div>
                      <button 
                        onClick={() => copyToClipboard(agreementAuthorizedExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {agreementAuthorizedExample}
                        </code>
                      </pre>
                      </div>
                  </div>
                  
                  <div className="overflow-x-auto mb-6 md:mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">event</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">The type of event ("request.authorized")</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">timestamp</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (ISO 8601)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">When the event occurred</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">houseTabzAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (UUID)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Unique identifier for the HouseTabz agreement</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">externalAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string | null</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Optional external reference ID</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">transactionId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Your transaction identifier</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">status</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">New status ("authorized")</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">serviceName</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Name of the service</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">serviceType</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Type of service (e.g., "energy")</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Next Steps After Authorization</h3>
                    <p className="text-xs md:text-sm text-gray-700">
                      Once you receive the request.authorized event and update the agreement status to active, the HouseTabz integration is complete. You can now use the HouseTabz agreement to create bills for this customer and their housemates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mt-6 md:mt-8">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">bill.paid Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when a bill has been fully paid by all housemates. When you receive this event, you should:
                  </p>

                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 ml-2 md:ml-4 mb-4 md:mb-6 space-y-1 md:space-y-2">
                    <li>Find the bill in your system using the externalBillId</li>
                    <li>Update the bill status to 'paid' or 'completed'</li>
                    <li>Record the payment details for financial reconciliation</li>
                  </ul>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">bill.paid Event Example</div>
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
                  
                  <div className="overflow-x-auto mb-6 md:mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Field</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                          <th className="py-2 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">event</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">The type of event ("bill.paid")</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">houseTabzAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (UUID)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">The agreement ID associated with this bill</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">externalAgreementId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string | null</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Your reference ID for the agreement (may be null)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">externalBillId</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">Your unique identifier for this bill</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">amountPaid</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">number</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">The total amount paid for this bill</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-mono text-gray-900">paymentDate</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">string (ISO 8601)</td>
                          <td className="py-2 px-2 md:px-4 text-xs md:text-sm text-gray-500">When the final payment was processed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Payment Reconciliation</h3>
                    <p className="text-xs md:text-sm text-gray-700">
                      When you receive a bill.paid event, this indicates that the bill has been successfully paid in full by all housemates. You should update your internal systems to reflect this payment and reconcile the financial transaction.
                    </p>
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
        <h2 className="ml-2 text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-sm md:text-base text-gray-600">{subtitle}</p>
    </div>
  );
};

export default WebhookSetup;