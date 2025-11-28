export default function handler(req, res) {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      console.log(`GET params: mode=${mode}, token=${token}, challenge=${challenge}`);

      if (mode === 'subscribe' && token === (process.env.WHATSAPP_VERIFY_TOKEN || 'whatsappx2025')) {
        console.log('✅ Webhook verified successfully');
        return res.status(200).send(challenge || '');
      } else {
        console.log('❌ Webhook verification failed');
        return res.status(403).send('Forbidden');
      }
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      console.log('📨 WhatsApp POST received:', JSON.stringify(body, null, 2));

      // Basic validation
      if (body.object === 'whatsapp_business_account') {
        console.log('✅ Valid WhatsApp business account event');
      }

      return res.status(200).send('EVENT_RECEIVED');
    }

    console.log(`❌ Method ${req.method} not allowed`);
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).send('Method Not Allowed');

  } catch (error) {
    console.error('💥 Webhook error:', error);
    return res.status(500).send('Internal Server Error');
  }
}