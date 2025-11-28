const express = require('express');

const app = express();
app.use(express.json());

// Verify token
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025';

// App secret for signature verification (replace with your actual app secret)
const APP_SECRET = process.env.WHATSAPP_APP_SECRET || 'your_app_secret_here';

// Function to verify signature
function verifySignature(req, res, buf) {
  const signature = req.get('X-Hub-Signature-256');
  if (!signature) {
    console.error('No signature provided');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(buf, 'utf8')
    .digest('hex');

  const signatureHash = signature.split('=')[1];

  if (!crypto.timingSafeEqual(Buffer.from(signatureHash, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
    console.error('Signature verification failed');
    return false;
  }

  return true;
}

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('Webhook verification request received');
  console.log(`Mode: ${mode}, Token: ${token}, Challenge: ${challenge}`);

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('Webhook verification failed: token mismatch');
      res.sendStatus(403);
    }
  } else {
    console.log('Webhook verification failed: missing parameters');
    res.sendStatus(400);
  }
});

// Webhook message endpoint
app.post('/webhook', express.raw({ type: 'application/json', verify: verifySignature }), (req, res) => {
  try {
    const body = JSON.parse(req.body);
    console.log('Message received:', JSON.stringify(body, null, 2));

    // Check if this is a WhatsApp message
    if (body.object === 'whatsapp_business_account') {
      body.entry.forEach(entry => {
        entry.changes.forEach(change => {
          if (change.field === 'messages') {
            change.value.messages.forEach(message => {
              console.log('New message:', message);
              // Process the message here
              // e.g., send reply, store in database, etc.
            });
          }
        });
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.sendStatus(500);
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook Server is running');
});

// Export for Vercel
module.exports = app;