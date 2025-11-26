import { supabase } from '@/lib/supabase';
import type { Conversation, Message } from '@/types';

class ConversationService {
  async getConversations(): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('last_message_time', { ascending: false });

    if (error) throw error;
    
    return data.map(conv => ({
      ...conv,
      lastMessageTime: new Date(conv.last_message_time),
    }));
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    
    return data.map(msg => ({
      ...msg,
      conversationId: msg.conversation_id,
      timestamp: new Date(msg.timestamp),
    }));
  }

  async sendMessage(conversationId: string, content: string, sender: 'agent' | 'bot' = 'agent') {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content,
        sender,
        status: 'sent',
      })
      .select()
      .single();

    if (error) throw error;

    // Update conversation last message
    await supabase
      .from('conversations')
      .update({
        last_message: content,
        last_message_time: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    return data;
  }

  async markAsRead(conversationId: string) {
    const { error } = await supabase
      .from('conversations')
      .update({ unread_count: 0 })
      .eq('id', conversationId);

    if (error) throw error;
  }

  async updateTags(conversationId: string, tags: string[]) {
    const { error } = await supabase
      .from('conversations')
      .update({ tags })
      .eq('id', conversationId);

    if (error) throw error;
  }
}

export const conversationService = new ConversationService();
