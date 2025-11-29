import dotenv from 'dotenv';
import crypto from 'crypto';

// Load .env during local dev; Vercel provides env vars in production
dotenv.config();

export default function handler(req, res) {
  // WhatsApp Webhook Handler for Vercel Serverless

  if (req.method === 'GET') {
    // Meta Webhook Verification
    try {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      console.log('Verification attempt:', { mode, token: token ? '***' : undefined });

      const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025';

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ WEBHOOK_VERIFIED successfully');
        res.status(200).send(challenge);
      } else {
        console.log('❌ Verification failed - invalid mode or token');
          res.status(403).json({ success: false, error: 'verification_failed' });
      }
    } catch (error) {
      console.error('Error during verification:', error);
      res.status(500).send('Internal Server Error');
    }

  } else if (req.method === 'POST') {
    // Handle incoming WhatsApp messages
    try {
      // Validate signature
      const signature = req.headers['x-hub-signature-256'];
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
      if (accessToken && signature) {
        const expectedSignature = 'sha256=' + crypto.createHmac('sha256', accessToken).update(JSON.stringify(req.body)).digest('hex');
        if (signature !== expectedSignature) {
          console.log('❌ Invalid signature');
          return res.status(401).json({ success: false, error: 'invalid_signature' });
        }
      }

      const body = req.body;

      console.log('📨 Received WhatsApp webhook:', JSON.stringify(body, null, 2));

      // Validate webhook payload
      if (!body || !body.object) {
        console.log('❌ Invalid webhook payload');
        return res.status(400).json({ success: false, error: 'invalid_payload' });
      }

      // Process entries if they exist
      if (body.entry && Array.isArray(body.entry)) {
        body.entry.forEach(entry => {
          if (entry.messaging && Array.isArray(entry.messaging)) {
            entry.messaging.forEach(message => {
              console.log('💬 Message received:', {
                from: message.sender?.id,
                message: message.message?.text?.body,
                timestamp: message.timestamp
              });
            });
          }
        });
      }

      // Always respond with 200 OK to acknowledge receipt
      res.status(200).json({ success: true });

    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      res.status(500).json({ success: false, error: 'internal_server_error' });
    }

  } else {
    console.log('❌ Unsupported method:', req.method);
    res.status(405).json({ success: false, error: 'method_not_allowed' });
  }
}