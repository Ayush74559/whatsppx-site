import dotenv from 'dotenv';
import crypto from 'crypto';

// Load local environment variables for dev. (Vercel provides env vars in production.)
dotenv.config();

export default async function handler(req, res) {
  try {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "whatsappx2025";

    if (req.method === "GET") {
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      // Avoid logging secret values directly
      console.log("VERIFY REQUEST:", { mode, token: token ? '***' : undefined });

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("✅ Webhook verified");
        return res.status(200).send(challenge);
      }

      return res.status(403).json({ success: false, error: 'verification_failed' });
    }

    if (req.method === "POST") {
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

      console.log("📩 Incoming Event:", JSON.stringify(req.body, null, 2));

      // Validate webhook payload
      const body = req.body;
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

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'method_not_allowed' });

  } catch (err) {
    console.error("WEBHOOK CRASH:", err);
    return res.status(500).json({ success: false, error: 'internal_server_error' });
  }
}

// Local dev helper: when LOCAL_DEV=true is set (see package.json "dev" script)
// start an Express server so you can test GET/POST against /api/webhook locally.
if (process.env.LOCAL_DEV) {
  (async () => {
    try {
      const expressImport = await import('express');
      const express = expressImport.default || expressImport;
      const app = express();
      const PORT = process.env.PORT || 3000;

      app.use(express.json({ limit: '5mb' }));

      // Health
      app.get('/', (req, res) => res.json({ service: 'whatsappx-webhook-backend', ok: true }));

      // Mount the handler at /api/webhook
      app.all('/api/webhook', async (req, res) => {
        try {
          await handler(req, res);
        } catch (err) {
          console.error('Handler error in local express wrapper:', err);
          res.status(500).json({ success: false, error: 'internal_server_error' });
        }
      });

      app.listen(PORT, () => {
        console.log(`✅ Local webhook dev server listening on http://localhost:${PORT}/api/webhook`);
      });
    } catch (err) {
      console.error('Failed to start local dev Express server:', err);
    }
  })();
}
