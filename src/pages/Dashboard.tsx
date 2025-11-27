import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useRequireAuth } from '@/hooks/useAuth';
import { MessageSquare, Users, TrendingUp, Clock, BarChart, Zap } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { conversationService } from '@/services/conversationService';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toast } from 'sonner';
import type { Analytics, Conversation } from '@/types';

export function Dashboard() {
  const { user, loading: authLoading } = useRequireAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [analyticsData, conversationsData] = await Promise.all([
        analyticsService.getAnalytics(),
        conversationService.getConversations(),
      ]);
      setAnalytics(analyticsData);
      setConversations(conversationsData.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      icon: MessageSquare,
      label: 'Total Messages',
      value: analytics?.totalMessages.toLocaleString() || '0',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: Users,
      label: 'Active Conversations',
      value: analytics?.activeConversations.toString() || '0',
      change: '+8.2%',
      positive: true,
    },
    {
      icon: TrendingUp,
      label: 'Response Rate',
      value: `${analytics?.responseRate || 0}%`,
      change: '+3.1%',
      positive: true,
    },
    {
      icon: Clock,
      label: 'Avg Response Time',
      value: analytics?.avgResponseTime || 'N/A',
      change: '-15%',
      positive: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 white-intense">
            Welcome back, <span className="white-intense">{user?.username}</span>!
          </h1>
          <p className="apple-body white-intense">
            Here's what's happening with your WhatsApp business today.
          </p>
        </div>

        {/* Video demo: fills card and matches rounded corners */}
        <Card className="glass-card p-0 overflow-hidden hover-glow">
          <div className="analytics-video w-full h-48 md:h-64 lg:h-72 relative">
            <video
              src="/media/vedios/Analytics.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="analytics-video__media"
              aria-hidden
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">Real-time insights</h3>
            <p className="text-sm text-muted-foreground">Track response times, engagement, and conversion metrics at a glance.</p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass-card p-6 hover-glow animate-scale-in">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.positive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm white-intense mb-1">{stat.label}</p>
                <p className="text-3xl font-bold white-intense">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Message Activity */}
          <Card className="glass-card p-6 hover-glow">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold white-intense">Message Activity</h2>
            </div>
            {analytics && analytics.messagesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.messagesData}>
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#667eea"
                    strokeWidth={2}
                    dot={{ fill: '#667eea' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="received"
                    stroke="#25D366"
                    strokeWidth={2}
                    dot={{ fill: '#25D366' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No message data yet
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card p-6 hover-glow">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold white-intense">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <p className="font-medium mb-1 white-intense">Set up auto-replies</p>
                <p className="text-sm white-intense">
                  Automate responses to common questions
                </p>
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <p className="font-medium mb-1 white-intense">View conversations</p>
                <p className="text-sm white-intense">
                  Check active customer chats
                </p>
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <p className="font-medium mb-1 white-intense">Send broadcast</p>
                <p className="text-sm white-intense">
                  Message multiple customers at once
                </p>
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <p className="font-medium mb-1 white-intense">Manage CRM</p>
                <p className="text-sm white-intense">
                  Update customer information and tags
                </p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
