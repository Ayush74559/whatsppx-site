export default async function handler(req, res) {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      console.log(`GET params: mode=${mode}, token=${token}, challenge=${challenge}`);

      const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025';

      if (mode === 'subscribe' && token === verifyToken) {
        console.log('✅ Webhook verified successfully');
        res.status(200).send(challenge || '');
      } else {
        console.log('❌ Webhook verification failed');
        res.status(403).send('Forbidden');
      }
    } else if (req.method === 'POST') {
      console.log('📨 WhatsApp POST received');

      const body = req.body || {};
      console.log('Body:', JSON.stringify(body));

      if (body.object === 'whatsapp_business_account') {
        console.log('✅ Valid WhatsApp event');
        // Process messages here if needed
      }

      res.status(200).send('EVENT_RECEIVED');
    } else {
      console.log(`❌ Method ${req.method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('💥 Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
}