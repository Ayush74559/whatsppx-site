import crypto from 'crypto';

// Production-ready Vercel serverless webhook handler.
// Place this file at the repository root as /webhook.js

export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (req.method === 'GET') {
    const mode = req.query?.['hub.mode'] ?? req.query?.mode;
    const token = req.query?.['hub.verify_token'] ?? req.query?.verify_token ?? req.query?.token;
    const challenge = req.query?.['hub.challenge'] ?? req.query?.challenge ?? '';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(200).end(String(challenge ?? ''));
      return;
    }

    res.status(403).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('Incoming WhatsApp webhook event:', JSON.stringify(req.body));
    } catch (e) {
      console.log('Incoming WhatsApp webhook event (non-serializable payload)');
    }
    res.status(200).json({ success: true });
    return;
  }

  res.status(405).end();
}