export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    res.sendStatus(403);
  }

  if (req.method === 'POST') {
    // WhatsApp Message Handler
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

    return res.status(200).send('OK');
  }

  // Method not allowed
  return res.status(405).send('Method not allowed');
}