import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'WhatsApp Webhook Server is running',
    timestamp: new Date().toISOString()
  });
});

// Meta Webhook Verification
app.get('/webhook', (req, res) => {
  console.log('🔍 Webhook Verification Request:', req.query);

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!VERIFY_TOKEN) {
    console.error('❌ WHATSAPP_VERIFY_TOKEN not set');
    return res.status(500).send('Server configuration error');
  }

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

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  // Verify request is from Meta (optional but recommended)
  // You can add signature verification here

  if (req.body.object === 'whatsapp_business_account') {
    req.body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.field === 'messages') {
          change.value.messages.forEach(message => {
            console.log('💬 New Message:', message);

            // TODO: Add your message processing logic here
            // - Save to database
            // - Send auto-replies
            // - Trigger workflows
            // - Update CRM
          });
        }
      });
    });
  }

  // Always respond with 200 OK to acknowledge receipt
  res.status(200).send('OK');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;