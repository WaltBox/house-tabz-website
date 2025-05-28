
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
  Shield,
  AlertTriangle
} from 'lucide-react';

const WebhookSetup = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
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

  // Updated webhook examples with signature verification
  const webhookHandlerExample = `// Complete webhook handler with signature verification
const express = require('express');
const crypto = require('crypto');
const app = express();

// Use raw body parser for signature verification
app.use('/webhooks/housetabz', express.raw({ type: 'application/json' }));

app.post('/webhooks/housetabz', async (req, res) => {
  try {
    // Get webhook secret from your environment variables
    const webhookSecret = process.env.HOUSETABZ_WEBHOOK_SECRET;
    
    // Get signature headers
    const timestamp = req.headers['housetabz-timestamp'];
    const signature = req.headers['housetabz-signature'];
    
    // Verify signature (CRITICAL for security)
    if (!verifyWebhookSignature(req.body, timestamp, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Parse the JSON body after verification
    const event = JSON.parse(req.body.toString());
    
    // Process based on event type
    switch(event.event) {
      case 'agreement.created':
        await createPaymentMethodAndAgreement(event);
        break;
        
      case 'request.authorized':
        await updateAgreementStatus(event.houseTabzAgreementId, 'active');
        break;
        
      case 'bill.created':
        await handleBillCreated(event);
        break;
        
      case 'bill.updated':
        await handleBillUpdated(event);
        break;
        
      case 'bill.paid':
        await handleBillPaid(event);
        break;
        
      default:
        console.log('Unknown event type:', event.event);
    }
    
    // Always return 200 quickly
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// 🔒 CRITICAL: Verify webhook signature
function verifyWebhookSignature(payload, timestamp, signature, secret) {
  // Check if signature has sha256= prefix
  if (!signature || !signature.startsWith('sha256=')) {
    return false;
  }
  
  // Create expected signature
  const signedPayload = \`\${timestamp}.\${payload}\`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  const expectedSignatureWithPrefix = \`sha256=\${expectedSignature}\`;
  
  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'utf8'),
    Buffer.from(expectedSignatureWithPrefix, 'utf8')
  );
}

async function createPaymentMethodAndAgreement(event) {
  // Create payment method entry
  const paymentMethod = await db.PaymentMethods.create({
    type: 'housetabz',
    last4: '1234',
    brand: 'HouseTabz',
    userId: getUserIdFromTransaction(event.transactionId)
  });
  
  // Create HouseTabz agreement entry
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

async function handleBillCreated(event) {
  // Handle bill.created event
  console.log('Bill created:', event.externalBillId);
}

async function handleBillUpdated(event) {
  // Handle bill.updated event
  console.log('Bill updated:', event.externalBillId);
}

async function handleBillPaid(event) {
  // Update bill status to paid
  await db.Bills.update(
    { status: 'paid', paidAt: new Date() },
    { where: { externalId: event.externalBillId } }
  );
}

function getUserIdFromTransaction(transactionId) {
  // Extract user ID from your transaction ID format
  return 'user_123';
}

app.listen(3000, () => console.log('Webhook server running on port 3000'));`;

  const pythonWebhookExample = `# Python webhook handler with signature verification
import hmac
import hashlib
import json
import time
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks/housetabz', methods=['POST'])
def handle_webhook():
    try:
        # Get webhook secret from environment
        webhook_secret = os.getenv('HOUSETABZ_WEBHOOK_SECRET')
        
        # Get signature headers
        timestamp = request.headers.get('housetabz-timestamp')
        signature = request.headers.get('housetabz-signature')
        
        # Get raw payload
        payload = request.get_data()
        
        # Verify signature (CRITICAL for security)
        if not verify_webhook_signature(payload, timestamp, signature, webhook_secret):
            return jsonify({'error': 'Invalid signature'}), 401
        
        # Parse JSON after verification
        event = json.loads(payload.decode('utf-8'))
        
        # Process based on event type
        if event['event'] == 'agreement.created':
            create_payment_method_and_agreement(event)
        elif event['event'] == 'request.authorized':
            update_agreement_status(event['houseTabzAgreementId'], 'active')
        elif event['event'] == 'bill.created':
            handle_bill_created(event)
        elif event['event'] == 'bill.updated':
            handle_bill_updated(event)
        elif event['event'] == 'bill.paid':
            handle_bill_paid(event)
        
        return jsonify({'received': True}), 200
        
    except Exception as e:
        print(f'Webhook error: {e}')
        return jsonify({'error': str(e)}), 400

def verify_webhook_signature(payload, timestamp, signature, secret):
    """Verify webhook signature"""
    if not signature or not signature.startswith('sha256='):
        return False
    
    # Create expected signature
    signed_payload = f"{timestamp}.{payload.decode('utf-8')}"
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        signed_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    expected_signature_with_prefix = f"sha256={expected_signature}"
    
    # Use constant-time comparison
    return hmac.compare_digest(signature, expected_signature_with_prefix)

def create_payment_method_and_agreement(event):
    # Your database logic here
    pass

def update_agreement_status(agreement_id, status):
    # Your database logic here
    pass

def handle_bill_created(event):
    print(f"Bill created: {event.get('externalBillId')}")

def handle_bill_updated(event):
    print(f"Bill updated: {event.get('externalBillId')}")

def handle_bill_paid(event):
    # Update bill status to paid
    print(f"Bill paid: {event.get('externalBillId')}")

if __name__ == '__main__':
    app.run(debug=True, port=3000)`;

  // Updated webhook event examples with missing events
  const agreementCreatedExample = `{
  "event": "agreement.created",
  "timestamp": "2025-05-25T22:46:44.607Z",
  "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
  "externalAgreementId": null,
  "transactionId": "OCTOPUS-1748204777548",
  "serviceName": "Octopus Energy - Octo12",
  "serviceType": "energy",
  "estimatedAmount": null,
  "status": "pending"
}`;

  const requestAuthorizedExample = `{
  "event": "request.authorized",
  "timestamp": "2025-05-25T04:04:04.480Z",
  "houseTabzAgreementId": "9ff8a4b5-6150-40cc-b31b-1eb17f3c2e16",
  "externalAgreementId": null,
  "transactionId": "OCTOPUS-1748145774864",
  "status": "authorized",
  "serviceName": "Octopus Energy - Octo12",  
  "serviceType": "energy"
}`;

  const billCreatedExample = `{
  "event": "bill.created",
  "timestamp": "2025-05-26T10:30:15.123Z",
  "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
  "externalAgreementId": "AGREEMENT-001",
  "externalBillId": "BILL-MAY-2025-001",
  "billId": 66,
  "amount": 150.00,
  "totalAmount": 156.00,
  "dueDate": "2025-06-15T00:00:00.000Z",
  "billingPeriod": "May 2025",
  "chargesCreated": 3,
  "status": "pending"
}`;

  const billUpdatedExample = `{
  "event": "bill.updated",
  "timestamp": "2025-05-26T14:22:33.456Z",
  "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
  "externalAgreementId": "AGREEMENT-001",
  "externalBillId": "BILL-MAY-2025-001",
  "billId": 66,
  "amount": 175.00,
  "totalAmount": 181.50,
  "dueDate": "2025-06-20T00:00:00.000Z",
  "status": "pending",
  "updatedFields": ["amount", "dueDate"]
}`;

  const billPaidExample = `{
  "event": "bill.paid",
  "timestamp": "2025-05-26T16:45:22.789Z",
  "houseTabzAgreementId": "a16aee5b-8378-4db0-a5c6-c9b8aac9f2fb",
  "externalAgreementId": "AGREEMENT-001",
  "externalBillId": "BILL-MAY-2025-001",
  "amountPaid": 181.50,
  "paymentDate": "2025-05-26T16:45:22.789Z"
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
            <NavItem 
              icon={<Shield className="w-5 h-5" />}
              title="Security & Verification"
              isActive={activeSection === 'security'}
              onClick={() => navigateTo('security')}
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
                <NavItem 
                  icon={<Shield className="w-5 h-5" />}
                  title="Security & Verification"
                  isActive={activeSection === 'security'}
                  onClick={() => navigateTo('security')}
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
                  Receive real-time updates from HouseTabz using secure webhooks
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  HouseTabz uses webhooks to notify your system about events that happen within the HouseTabz platform. 
                  This allows you to automate your systems in response to these events, such as creating payment methods and agreements
                  when a customer chooses to pay with HouseTabz.
                </p>
                
                <h3 className="font-medium text-gray-900 mb-3">Key Integration Events</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Your system will receive these webhook events during the HouseTabz integration lifecycle:
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">agreement.created</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Customer chooses HouseTabz payment
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">request.authorized</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      All housemates approve the agreement
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">bill.created</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      New bill created for the agreement
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">bill.updated</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Bill details modified (amount, due date)
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2" style={{ color: '#34d399' }}>
                      <Bell className="w-5 h-5 mr-2" />
                      <h4 className="font-medium">bill.paid</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Bill fully paid by all housemates
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <h3 className="font-medium mb-2 text-red-800 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Critical
                  </h3>
                  <p className="text-xs md:text-sm text-red-800">
                    All webhooks are signed with HMAC-SHA256. You MUST verify webhook signatures to ensure they're from HouseTabz and haven't been tampered with. See the Security section below.
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                  <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Webhook Flow</h3>
                  <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-4">
                    When a customer uses the "Pay with HouseTabz" button, your system will receive webhooks in this sequence:
                  </p>
                  <ol className="list-decimal list-inside text-xs md:text-sm text-gray-700 space-y-1 md:space-y-2 ml-2 md:ml-4">
                    <li><strong>agreement.created</strong> - Create payment method and agreement entry (status: 'pending')</li>
                    <li><strong>request.authorized</strong> - Update agreement status to 'active' after all housemates approve</li>
                    <li><strong>bill.created</strong> - Sent when you create new bills via the API</li>
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
                    <li><strong>Verify webhook signatures (REQUIRED for security)</strong></li>
                    <li>Respond quickly with a 200 status code</li>
                    <li>Process events asynchronously</li>
                  </ul>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">Python Webhook Handler</div>
                      <button 
                        onClick={() => copyToClipboard(pythonWebhookExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {pythonWebhookExample}
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
                    <li><strong>Subscribe to Events:</strong> Select the events you want to receive (all events recommended).</li>
                    <li><strong>Save Configuration:</strong> Click "Save" to complete the registration and receive your webhook secret.</li>
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

            {/* Security Section */}
            <section 
              ref={securityRef} 
              id="security" 
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <SectionHeader 
                icon={<Shield className="w-6 h-6" />}
                title="Security & Verification"
                subtitle="Verify webhook signatures for security"
              />
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Critical Security Requirement
                    </h3>
                    <p className="text-sm text-red-800">
                      You MUST verify webhook signatures to ensure webhooks are actually from HouseTabz and haven't been tampered with. 
                      Failing to verify signatures leaves your system vulnerable to malicious webhook attacks.
                    </p>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Webhook Signature Verification</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Every HouseTabz webhook includes signature headers that you must verify:
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Signature Headers</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                      <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">housetabz-timestamp</code>: Unix timestamp when the webhook was sent</li>
                      <li><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">housetabz-signature</code>: HMAC-SHA256 signature with sha256= prefix</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Signature Verification Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-bold text-green-600">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Extract signature headers</p>
                          <p className="text-sm text-gray-600">Get timestamp and signature from request headers</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-bold text-green-600">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Create signed payload</p>
                          <p className="text-sm text-gray-600">Combine timestamp and raw request body: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">timestamp + "." + body</code></p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-bold text-green-600">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Generate expected signature</p>
                          <p className="text-sm text-gray-600">Create HMAC-SHA256 using your webhook secret and signed payload</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-bold text-green-600">4</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Compare signatures</p>
                          <p className="text-sm text-gray-600">Use timing-safe comparison to verify signatures match</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-2">Security Best Practices</h3>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                      <li>Always verify signatures before processing webhook events</li>
                      <li>Use timing-safe comparison functions to prevent timing attacks</li>
                      <li>Check timestamp to prevent replay attacks (reject old webhooks)</li>
                      <li>Store webhook secrets securely using environment variables</li>
                      <li>Use raw request body for signature verification (not parsed JSON)</li>
                    </ul>
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
                subtitle="Detailed information about all webhook events"
              />
              
              {/* agreement.created Event */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
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
                </div>
              </div>
              
              {/* request.authorized Event */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">request.authorized Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when all housemates have authorized the HouseTabz agreement. When you receive this event, update the agreement status to 'active'.
                  </p>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">request.authorized Event Example</div>
                      <button 
                        onClick={() => copyToClipboard(requestAuthorizedExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {requestAuthorizedExample}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Next Steps After Authorization</h3>
                    <p className="text-xs md:text-sm text-gray-700">
                      Once you receive the request.authorized event and update the agreement status to active, you can start creating bills for this customer and their housemates using the Bills API.
                    </p>
                  </div>
                </div>
              </div>

              {/* bill.created Event */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">bill.created Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when you successfully create a new bill via the Bills API. Use this to confirm bill creation and track the bill lifecycle.
                  </p>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">bill.created Event Example</div>
                      <button 
                        onClick={() => copyToClipboard(billCreatedExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {billCreatedExample}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* bill.updated Event */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">bill.updated Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when you update an existing bill via the Bills API. The event includes which fields were updated.
                  </p>

                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-6">
                    <div className="bg-gray-100 px-3 md:px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-xs md:text-sm font-mono text-gray-600">bill.updated Event Example</div>
                      <button 
                        onClick={() => copyToClipboard(billUpdatedExample)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4">
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-gray-800 font-mono whitespace-pre-wrap">
                          {billUpdatedExample}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* bill.paid Event */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">bill.paid Event</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    This event is sent when a bill has been fully paid by all housemates. Update your bill status to 'paid' and record the payment details.
                  </p>

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
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 md:p-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <h3 className="font-medium mb-2" style={{ color: '#34d399' }}>Payment Reconciliation</h3>
                    <p className="text-xs md:text-sm text-gray-700">
                      When you receive a bill.paid event, this indicates that the bill has been successfully paid in full by all housemates. You should update your internal systems to reflect this payment and reconcile the financial transaction.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Footer */}            
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

export default WebhookSetup;