import crypto from 'crypto';

// Production-ready Vercel serverless webhook handler
// Place this file at repository root as `/webhook.js`

export default async function handler(req, res) {
  try {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025';
    const APP_SECRET = process.env.WHATSAPP_APP_SECRET || '';

    // GET — Meta verification
    if (req.method === 'GET') {
      const mode = req.query?.['hub.mode'];
      const token = req.query?.['hub.verify_token'];
      const challenge = req.query?.['hub.challenge'];

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(String(challenge ?? ''));
      }

      return res.status(403).json({ success: false, error: 'verification_failed' });
    }

    // POST — incoming events
    if (req.method === 'POST') {
      const body = req.body ?? {};

      // Optional signature validation if APP_SECRET is provided
      if (APP_SECRET) {
        const signature = (req.headers['x-hub-signature-256'] || req.headers['x-hub-signature'] || '').toString();
        if (!signature) {
          console.warn('Missing signature header');
          return res.status(401).json({ success: false, error: 'missing_signature' });
        }
        const expected = 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(JSON.stringify(body)).digest('hex');
        try {
          const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
          if (!ok) {
            console.warn('Invalid signature');
            return res.status(401).json({ success: false, error: 'invalid_signature' });
          }
        } catch (e) {
          console.warn('Signature validation failed', e);
          return res.status(401).json({ success: false, error: 'invalid_signature' });
        }
      }

      // Log payload
      try {
        console.log('Incoming WhatsApp webhook event:', JSON.stringify(body));
      } catch (err) {
        console.log('Incoming WhatsApp webhook event (non-serializable payload)');
      }

      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, error: 'invalid_payload' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'method_not_allowed' });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ success: false, error: 'internal_server_error' });
  }
}
