export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  businessName?: string;
  phoneNumber?: string;
  plan?: 'starter' | 'business' | 'pro' | 'lifetime';
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
  tags?: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: 'customer' | 'bot' | 'agent';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface AutoReply {
  id: string;
  name: string;
  trigger: 'greeting' | 'keyword' | 'away' | 'business_hours';
  keywords?: string[];
  response: string;
  enabled: boolean;
}

export interface Analytics {
  totalMessages: number;
  totalConversations: number;
  activeConversations: number;
  responseRate: number;
  avgResponseTime: string;
  customerSatisfaction: number;
  messagesData: {
    date: string;
    sent: number;
    received: number;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  totalMessages: number;
  lastContact: Date;
  leadStage: 'new' | 'contacted' | 'qualified' | 'converted';
  notes?: string;
}
