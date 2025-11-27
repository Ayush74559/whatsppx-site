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

  async testConnection(): Promise<boolean> {
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }
}

export const whatsappService = new WhatsAppService();
