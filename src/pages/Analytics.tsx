import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useRequireAuth } from '@/hooks/useAuth';
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Star,
  Calendar,
} from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { toast } from 'sonner';
import type { Analytics as AnalyticsType } from '@/types';
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

export function Analytics() {
  const { loading: authLoading } = useRequireAuth();
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics data');
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

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Failed to load analytics data</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      icon: MessageSquare,
      label: 'Total Messages',
      value: analytics?.totalMessages.toLocaleString() || '0',
      description: 'Last 30 days',
    },
    {
      icon: Users,
      label: 'Total Conversations',
      value: analytics?.totalConversations.toString() || '0',
      description: 'Unique customers',
    },
    {
      icon: TrendingUp,
      label: 'Response Rate',
      value: `${analytics?.responseRate || 0}%`,
      description: 'Average response rate',
    },
    {
      icon: Clock,
      label: 'Avg Response Time',
      value: analytics?.avgResponseTime || 'N/A',
      description: 'Time to first reply',
    },
    {
      icon: Star,
      label: 'Customer Satisfaction',
      value: analytics?.customerSatisfaction.toFixed(1) || '0.0',
      description: 'Out of 5 stars',
    },
    {
      icon: Calendar,
      label: 'Active Today',
      value: analytics?.activeConversations.toString() || '0',
      description: 'Currently active chats',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your WhatsApp business performance and customer engagement
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass-card p-6 hover-glow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Message Trend */}
          <Card className="glass-card p-6 hover-glow">
            <h2 className="text-xl font-semibold mb-6">Message Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.messagesData || []}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#667eea"
                  strokeWidth={2}
                  name="Sent"
                />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#25D366"
                  strokeWidth={2}
                  name="Received"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Daily Activity */}
          <Card className="glass-card p-6 hover-glow">
            <h2 className="text-xl font-semibold mb-6">Daily Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.messagesData || []}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="sent" fill="#667eea" name="Sent" />
                <Bar dataKey="received" fill="#25D366" name="Received" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights */}
        <Card className="glass-card p-6 hover-glow">
          <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="font-medium">Response rate improved by 12.5%</p>
                <p className="text-sm text-muted-foreground">
                  Your automated replies are helping customers get faster responses
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <p className="font-medium">Peak hours: 2 PM - 6 PM</p>
                <p className="text-sm text-muted-foreground">
                  Most customer messages arrive during afternoon hours
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <p className="font-medium">Top inquiry: Product pricing</p>
                <p className="text-sm text-muted-foreground">
                  Consider adding more auto-replies about pricing and plans
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Video walkthrough / demo — fills the card and matches rounded corners */}
        <Card className="glass-card p-0 overflow-hidden hover-glow">
          <div className="analytics-video w-full h-64 md:h-96 lg:h-80 relative">
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
            <h3 className="text-lg font-semibold mb-1">Analytics Walkthrough</h3>
            <p className="text-sm text-muted-foreground">A short demo showcasing response time tracking, engagement graphs, and conversion metrics.</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
