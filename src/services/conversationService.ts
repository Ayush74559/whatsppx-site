import { supabase } from '@/lib/supabase';
import type { Conversation, Message } from '@/types';

class ConversationService {
  async getConversations(): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_time', { ascending: false });

      if (error) throw error;

      return data.map(conv => ({
        ...conv,
        lastMessageTime: new Date(conv.last_message_time),
      }));
    } catch (error) {
      console.warn('Supabase not available, using mock conversations:', error);
      // Return mock data for development/demo
      return this.getMockConversations();
    }
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

  private getMockConversations(): Conversation[] {
    return [
      {
        id: '1',
        customerId: 'cust_1',
        customerName: 'John Doe',
        customerPhone: '+1234567890',
        lastMessage: 'Hello, I need help with my order',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: 'active',
        unreadCount: 2,
        tags: ['order', 'urgent'],
      },
      {
        id: '2',
        customerId: 'cust_2',
        customerName: 'Jane Smith',
        customerPhone: '+1234567891',
        lastMessage: 'Thank you for the quick response!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'active',
        unreadCount: 0,
        tags: ['satisfied'],
      },
      {
        id: '3',
        customerId: 'cust_3',
        customerName: 'Bob Johnson',
        customerPhone: '+1234567892',
        lastMessage: 'When will my package arrive?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        status: 'active',
        unreadCount: 1,
        tags: ['shipping'],
      },
      {
        id: '4',
        customerId: 'cust_4',
        customerName: 'Alice Brown',
        customerPhone: '+1234567893',
        lastMessage: 'Product inquiry',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        status: 'resolved',
        unreadCount: 0,
        tags: ['inquiry'],
      },
      {
        id: '5',
        customerId: 'cust_5',
        customerName: 'Charlie Wilson',
        customerPhone: '+1234567894',
        lastMessage: 'Great service!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'resolved',
        unreadCount: 0,
        tags: ['positive'],
      },
    ];
  }
}

export const conversationService = new ConversationService();
