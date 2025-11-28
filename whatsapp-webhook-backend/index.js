import express from 'express';

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025';

// Health check
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook Server Running ✅');
});

// Meta Webhook Verification
app.get('/webhook', (req, res) => {
  console.log('🔍 Verification Request:', req.query);

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook Verified Successfully');
    return res.status(200).send(challenge);
  }

  console.error('❌ Verification Failed - Token:', token);
  return res.status(403).send('Verification failed');
});

// WhatsApp Message Handler
app.post('/webhook', (req, res) => {
  console.log('📨 Incoming Webhook:', JSON.stringify(req.body, null, 2));

  // Process WhatsApp messages
  if (req.body.object === 'whatsapp_business_account') {
    req.body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.field === 'messages') {
          change.value.messages.forEach(message => {
            console.log('💬 New Message:', message);
            // Add your message processing logic here
          });
        }
      });
    });
  }

  res.sendStatus(200);
});

export default app;