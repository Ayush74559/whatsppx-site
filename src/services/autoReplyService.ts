import { supabase } from '@/lib/supabase';
import type { AutoReply } from '@/types';

class AutoReplyService {
  async getAutoReplies(): Promise<AutoReply[]> {
    const { data, error } = await supabase
      .from('auto_replies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createAutoReply(reply: Omit<AutoReply, 'id'>) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('auto_replies')
      .insert({
        user_id: userData.user.id,
        ...reply,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAutoReply(id: string, updates: Partial<AutoReply>) {
    const { data, error } = await supabase
      .from('auto_replies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteAutoReply(id: string) {
    const { error } = await supabase
      .from('auto_replies')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async toggleAutoReply(id: string, enabled: boolean) {
    return this.updateAutoReply(id, { enabled });
  }
}

export const autoReplyService = new AutoReplyService();
