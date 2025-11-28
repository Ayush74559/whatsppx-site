export default function handler(req, res) {
  console.log(`[${new Date().toISOString()}] ${req.method} request received`);

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log(`Mode: ${mode}, Token: ${token}, Challenge: ${challenge}`);

    if (mode === 'subscribe' && token === (process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025')) {
      console.log('Webhook verified');
      res.status(200).send(challenge || '');
    } else {
      console.log('Webhook verification failed');
      res.status(403).send('Forbidden');
    }
    return;
  }

  if (req.method === 'POST') {
    console.log('WhatsApp POST received');
    res.status(200).send('EVENT_RECEIVED');
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).send('Method Not Allowed');
}