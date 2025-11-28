import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Webhook verification
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.status(403).send('Forbidden');
      }
    } else {
      res.status(400).send('Bad Request');
    }
  } else if (req.method === 'POST') {
    // Verify request signature
    const signature = req.headers['x-hub-signature-256'];
    const appSecret = process.env.WHATSAPP_APP_SECRET;

    if (!signature || !appSecret) {
      console.error('Missing signature or app secret');
      return res.status(401).send('Unauthorized');
    }

    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature.replace('sha256=', ''), 'hex'), Buffer.from(expectedSignature, 'hex'))) {
      console.error('Invalid signature');
      return res.status(401).send('Unauthorized');
    }

    // Handle WhatsApp events
    const body = req.body;
    console.log('WhatsApp Event:', JSON.stringify(body, null, 2));

    try {
      // Process messages
      if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              await processMessages(change.value.messages);
            }
          }
        }
      }

      res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).send('Method Not Allowed');
  }
}

async function processMessages(messages) {
  try {
    // Get WhatsApp connection
    const { data: connection, error: connError } = await supabase
      .from('whatsapp_connections')
      .select('*')
      .single();

    if (connError || !connection) {
      console.error('No WhatsApp connection found');
      return;
    }

    for (const message of messages) {
      if (message.type === 'text') {
        const from = message.from;
        const text = message.text.body;
        const messageId = message.id;
        const timestamp = new Date(parseInt(message.timestamp) * 1000);

        console.log(`New message from ${from}: ${text}`);

        // Find or create conversation
        let { data: conversation } = await supabase
          .from('conversations')
          .select('*')
          .eq('customer_phone', from)
          .single();

        if (!conversation) {
          // Create new conversation
          const { data: newConv, error: convError } = await supabase
            .from('conversations')
            .insert({
              customer_phone: from,
              customer_name: `Customer ${from.slice(-4)}`,
              last_message: text,
              last_message_time: timestamp.toISOString(),
              status: 'active',
              unread_count: 1,
            })
            .select()
            .single();

          if (convError) {
            console.error('Error creating conversation:', convError);
            continue;
          }
          conversation = newConv;
        } else {
          // Update existing conversation
          await supabase
            .from('conversations')
            .update({
              last_message: text,
              last_message_time: timestamp.toISOString(),
              unread_count: conversation.unread_count + 1,
              updated_at: new Date().toISOString(),
            })
            .eq('id', conversation.id);
        }

        // Store message
        await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            content: text,
            sender: 'customer',
            status: 'received',
            timestamp: timestamp.toISOString(),
          });

        // Check for auto-replies
        const { data: autoReplies } = await supabase
          .from('auto_replies')
          .select('*')
          .eq('enabled', true)
          .order('created_at', { ascending: false });

        for (const reply of autoReplies || []) {
          if (text.toLowerCase().includes(reply.trigger.toLowerCase())) {
            // Send auto-reply
            await sendWhatsAppMessage(from, reply.response, connection.phone_number_id, connection.access_token);
            break;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error processing messages:', error);
  }
}

async function sendWhatsAppMessage(to, message, phoneNumberId, accessToken) {
  try {
    const response = await fetch(`https://graph.facebook.com/v24.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Auto-reply sent successfully');
    } else {
      console.error('Error sending auto-reply:', data);
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}