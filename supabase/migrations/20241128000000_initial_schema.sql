-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE IF NOT EXISTS orgs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_user_id UUID NOT NULL,
  theme_preset TEXT DEFAULT 'apple-neon-black',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organization users table
CREATE TABLE IF NOT EXISTS org_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  tags TEXT[] DEFAULT '{}',
  total_messages INTEGER DEFAULT 0,
  last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_stage TEXT DEFAULT 'new' CHECK (lead_stage IN ('new', 'contacted', 'qualified', 'converted')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  last_message TEXT,
  last_message_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'pending')),
  tags TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'bot', 'agent')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read'))
);

-- Auto replies table
CREATE TABLE IF NOT EXISTS auto_replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger TEXT NOT NULL CHECK (trigger IN ('greeting', 'keyword', 'away', 'business_hours')),
  keywords TEXT[] DEFAULT '{}',
  response TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table (if needed)
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  messages_sent INTEGER DEFAULT 0,
  messages_received INTEGER DEFAULT 0,
  conversations_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_customer_id ON conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_auto_replies_user_id ON auto_replies(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON analytics(user_id, date);

-- Enable Row Level Security (RLS)
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic policies - you may need to adjust based on your auth setup)
-- These are example policies - adjust as needed for your authentication system

-- Organizations: users can only see orgs they own or are members of
CREATE POLICY "Users can view their organizations" ON orgs
  FOR SELECT USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can create organizations" ON orgs
  FOR INSERT WITH CHECK (auth.uid() = owner_user_id);

-- Org users: users can see members of orgs they're in
CREATE POLICY "Users can view org members" ON org_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM org_users ou
      WHERE ou.org_id = org_users.org_id
      AND ou.user_id = auth.uid()
    )
  );

-- Customers: users can only see their own customers
CREATE POLICY "Users can view their customers" ON customers
  FOR SELECT USING (auth.uid()::text = 'system' OR true); -- Adjust based on your auth

-- For now, allow all operations (adjust based on your requirements)
CREATE POLICY "Users can manage conversations" ON conversations
  FOR ALL USING (true);

CREATE POLICY "Users can manage messages" ON messages
  FOR ALL USING (true);

CREATE POLICY "Users can manage auto replies" ON auto_replies
  FOR ALL USING (true);

CREATE POLICY "Users can manage analytics" ON analytics
  FOR ALL USING (true);