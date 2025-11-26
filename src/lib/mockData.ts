import { Conversation, Customer, Analytics, AutoReply } from '@/types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    lastMessage: 'Thanks! When can I expect delivery?',
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    unreadCount: 2,
    status: 'active',
    tags: ['hot-lead', 'product-inquiry'],
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43211',
    lastMessage: 'I would like to know more about your services',
    lastMessageTime: new Date(Date.now() - 15 * 60000),
    unreadCount: 1,
    status: 'active',
    tags: ['new-customer'],
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'Amit Patel',
    customerPhone: '+91 98765 43212',
    lastMessage: 'Order confirmed, thank you!',
    lastMessageTime: new Date(Date.now() - 60 * 60000),
    unreadCount: 0,
    status: 'resolved',
    tags: ['customer', 'order-placed'],
  },
  {
    id: '4',
    customerId: 'c4',
    customerName: 'Sneha Reddy',
    customerPhone: '+91 98765 43213',
    lastMessage: 'What are your business hours?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
    unreadCount: 0,
    status: 'pending',
    tags: ['inquiry'],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    tags: ['hot-lead', 'product-inquiry'],
    totalMessages: 24,
    lastContact: new Date(Date.now() - 5 * 60000),
    leadStage: 'qualified',
    notes: 'Interested in premium package. Follow up on Friday.',
  },
  {
    id: 'c2',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    tags: ['new-customer'],
    totalMessages: 8,
    lastContact: new Date(Date.now() - 15 * 60000),
    leadStage: 'contacted',
    notes: 'First-time inquiry about services.',
  },
  {
    id: 'c3',
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit@example.com',
    tags: ['customer', 'order-placed'],
    totalMessages: 45,
    lastContact: new Date(Date.now() - 60 * 60000),
    leadStage: 'converted',
    notes: 'Regular customer. Very satisfied.',
  },
  {
    id: 'c4',
    name: 'Sneha Reddy',
    phone: '+91 98765 43213',
    tags: ['inquiry'],
    totalMessages: 3,
    lastContact: new Date(Date.now() - 2 * 60 * 60000),
    leadStage: 'new',
  },
];

export const mockAnalytics: Analytics = {
  totalMessages: 1247,
  totalConversations: 89,
  activeConversations: 23,
  responseRate: 94.5,
  avgResponseTime: '2m 34s',
  customerSatisfaction: 4.7,
  messagesData: [
    { date: '2024-01-15', sent: 45, received: 38 },
    { date: '2024-01-16', sent: 52, received: 44 },
    { date: '2024-01-17', sent: 38, received: 35 },
    { date: '2024-01-18', sent: 65, received: 58 },
    { date: '2024-01-19', sent: 72, received: 64 },
    { date: '2024-01-20', sent: 58, received: 51 },
    { date: '2024-01-21', sent: 48, received: 42 },
  ],
};

export const mockAutoReplies: AutoReply[] = [
  {
    id: '1',
    name: 'Welcome Message',
    trigger: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste'],
    response:
      'Hello! 👋 Welcome to our business. How can I help you today?\n\nReply with:\n1️⃣ Products\n2️⃣ Services\n3️⃣ Support\n4️⃣ Talk to a human',
    enabled: true,
  },
  {
    id: '2',
    name: 'Business Hours',
    trigger: 'keyword',
    keywords: ['hours', 'timing', 'open', 'close'],
    response:
      '🕒 Our business hours:\nMonday - Saturday: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM\n\nWe reply within 2 hours during business hours!',
    enabled: true,
  },
  {
    id: '3',
    name: 'Away Message',
    trigger: 'away',
    response:
      "Thanks for your message! We're currently unavailable but will get back to you within 24 hours. For urgent matters, please call us at +91 98765 43210.",
    enabled: false,
  },
  {
    id: '4',
    name: 'Pricing Inquiry',
    trigger: 'keyword',
    keywords: ['price', 'cost', 'pricing', 'plan'],
    response:
      '💰 Our pricing plans:\n\n✨ Starter - ₹499/month\n🚀 Business - ₹999/month\n💎 Pro - ₹1,999/month\n⭐ Lifetime - ₹2,999 (one-time)\n\nWould you like more details about any plan?',
    enabled: true,
  },
];
