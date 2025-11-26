import { supabase } from '@/lib/supabase';
import type { Analytics } from '@/types';

class AnalyticsService {
  async getAnalytics(): Promise<Analytics> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    // Get total conversations
    const { count: conversationsCount } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userData.user.id);

    // Get active conversations
    const { count: activeCount } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userData.user.id)
      .eq('status', 'active');

    // Get message count
    const { data: conversations } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', userData.user.id);

    const conversationIds = conversations?.map(c => c.id) || [];
    
    let totalMessages = 0;
    if (conversationIds.length > 0) {
      const { count: messagesCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .in('conversation_id', conversationIds);
      
      totalMessages = messagesCount || 0;
    }

    // Get messages data for the last 7 days
    const messagesData = await this.getMessagesData(conversationIds);

    return {
      totalMessages,
      totalConversations: conversationsCount || 0,
      activeConversations: activeCount || 0,
      responseRate: 95, // This would be calculated from actual response times
      avgResponseTime: '2m 30s',
      customerSatisfaction: 4.8,
      messagesData,
    };
  }

  private async getMessagesData(conversationIds: string[]) {
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      if (conversationIds.length === 0) {
        last7Days.push({
          date: date.toISOString(),
          sent: 0,
          received: 0,
        });
        continue;
      }

      const { data: messages } = await supabase
        .from('messages')
        .select('sender')
        .in('conversation_id', conversationIds)
        .gte('timestamp', date.toISOString())
        .lt('timestamp', nextDay.toISOString());

      const sent = messages?.filter(m => m.sender === 'agent' || m.sender === 'bot').length || 0;
      const received = messages?.filter(m => m.sender === 'customer').length || 0;

      last7Days.push({
        date: date.toISOString(),
        sent,
        received,
      });
    }

    return last7Days;
  }
}

export const analyticsService = new AnalyticsService();
