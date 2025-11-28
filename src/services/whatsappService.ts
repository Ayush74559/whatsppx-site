import { supabase } from '@/lib/supabase';

export interface WhatsAppConnection {
  id: string;
  user_id: string;
  phone_number_id?: string;
  business_account_id?: string;
  access_token?: string;
  webhook_verify_token?: string;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

class WhatsAppService {
  async getConnection(): Promise<WhatsAppConnection | null> {
    const { data, error } = await supabase
      .from('whatsapp_connections')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching connection:', error);
      return null;
    }

    return data;
  }

  async updateConnection(connectionData: Partial<WhatsAppConnection>) {
    const existing = await this.getConnection();

    if (existing) {
      const { data, error } = await supabase
        .from('whatsapp_connections')
        .update({ ...connectionData, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('whatsapp_connections')
        .insert({
          user_id: userData.user.id,
          ...connectionData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  async subscribeToWebhooks(businessAccountId: string, systemUserToken: string): Promise<boolean> {
    try {
      // Call backend API to avoid CORS issues
      const response = await fetch('http://localhost:3002/api/subscribe-webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessAccountId,
          systemUserToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success === true) {
        console.log('✅ Successfully subscribed to webhooks');
        return true;
      } else {
        console.error('❌ Failed to subscribe to webhooks:', data);
        return false;
      }
    } catch (error) {
      console.error('❌ Error subscribing to webhooks:', error);
      return false;
    }
  }

  async testConnection(phoneNumberId?: string, accessToken?: string): Promise<boolean> {
    try {
      // If no parameters provided, get from stored connection
      if (!phoneNumberId || !accessToken) {
        const connection = await this.getConnection();
        if (!connection?.phone_number_id || !connection?.access_token) {
          return false;
        }
        phoneNumberId = connection.phone_number_id;
        accessToken = connection.access_token;
      }

      // Test connection by fetching phone number info
      const response = await fetch(`https://graph.facebook.com/v24.0/${phoneNumberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.id) {
        console.log('✅ WhatsApp API connection test successful');
        return true;
      } else {
        console.error('❌ WhatsApp API connection test failed:', data);
        return false;
      }
    } catch (error) {
      console.error('❌ Error testing WhatsApp connection:', error);
      return false;
    }
  }
}

export const whatsappService = new WhatsAppService();
