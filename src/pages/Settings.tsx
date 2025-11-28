import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRequireAuth } from '@/hooks/useAuth';
import { Save, User, Building2, Phone, CreditCard, CheckCircle2, XCircle } from 'lucide-react';
import { whatsappService } from '@/services/whatsappService';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { mapSupabaseUser } from '@/lib/auth';
import { toast } from 'sonner';

export function Settings() {
  const { user, loading: authLoading } = useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState({
    phone_number_id: '',
    business_account_id: '',
    access_token: '',
    webhook_verify_token: '',
    is_connected: false,
  });
  const { user: authUser, login: setAuthUser } = useAuthStore();

  const [profile, setProfile] = useState({
    username: authUser?.username || '',
    email: authUser?.email || '',
  });

  useEffect(() => {
    loadConnection();
  }, []);

  const loadConnection = async () => {
    try {
      const data = await whatsappService.getConnection();
      if (data) {
        setConnection({
          phone_number_id: data.phone_number_id || '',
          business_account_id: data.business_account_id || '',
          access_token: data.access_token || '',
          webhook_verify_token: data.webhook_verify_token || '',
          is_connected: data.is_connected,
        });
      }
    } catch (error) {
      console.error('Error loading connection:', error);
    }
  };

  const handleSaveConnection = async () => {
    setLoading(true);
    try {
      await whatsappService.updateConnection(connection);
      toast.success('WhatsApp settings saved successfully');
    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : 'Failed to save settings'));
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    try {
      const isConnected = await whatsappService.testConnection();
      await whatsappService.updateConnection({ is_connected: isConnected });
      setConnection(prev => ({ ...prev, is_connected: isConnected }));
      toast.success('Connection test successful!');
    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : 'Connection test failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Prepare payload for Supabase updateUser
      const payload: any = { data: { username: profile.username } };
      // If email changed, include it (Supabase will send confirmation email if required)
      if (profile.email && profile.email !== authUser?.email) {
        payload.email = profile.email;
      }

      const { data, error } = await supabase.auth.updateUser(payload);
      if (error) throw error;

      // Update local auth store with new user data
      if (data?.user) {
        const mapped = mapSupabaseUser(data.user as any);
        setAuthUser(mapped);
      } else {
        // Fallback: re-fetch session and update
        const sessionRes = await supabase.auth.getSession();
        if (sessionRes.data?.session?.user) {
          setAuthUser(mapSupabaseUser(sessionRes.data.session.user));
        }
      }

      toast.success('Profile updated successfully');
    } catch (err: unknown) {
      console.error('Error updating profile', err);
      toast.error((err instanceof Error ? err.message : 'Failed to update profile'));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and WhatsApp business settings
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile(p => ({ ...p, username: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={handleSaveProfile} disabled={loading} className="bg-gradient-primary">
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </Card>

        {/* WhatsApp Connection */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">WhatsApp Cloud API</h2>
            </div>
            <Badge
              variant={connection.is_connected ? 'default' : 'secondary'}
              className={connection.is_connected ? 'bg-green-500' : ''}
            >
              {connection.is_connected ? (
                <><CheckCircle2 className="w-4 h-4 mr-1" /> Connected</>
              ) : (
                <><XCircle className="w-4 h-4 mr-1" /> Not Connected</>
              )}
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone_number_id">Phone Number ID</Label>
                <Input
                  id="phone_number_id"
                  value={connection.phone_number_id}
                  onChange={(e) => setConnection({ ...connection, phone_number_id: e.target.value })}
                  placeholder="123456789012345"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="business_account_id">Business Account ID</Label>
                <Input
                  id="business_account_id"
                  value={connection.business_account_id}
                  onChange={(e) => setConnection({ ...connection, business_account_id: e.target.value })}
                  placeholder="123456789012345"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="access_token">Access Token</Label>
              <Input
                id="access_token"
                type="password"
                value={connection.access_token}
                onChange={(e) => setConnection({ ...connection, access_token: e.target.value })}
                placeholder="EAAxxxxxxxxxxxxxxxxx"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="webhook_verify_token">Webhook Verify Token</Label>
              <Input
                id="webhook_verify_token"
                value={connection.webhook_verify_token}
                onChange={(e) => setConnection({ ...connection, webhook_verify_token: e.target.value })}
                placeholder="your_verify_token"
                className="mt-1"
              />
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-400 mb-2 font-medium">📖 Setup Instructions:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Go to Meta for Developers and create a Business App</li>
                <li>Add WhatsApp product and get your Phone Number ID</li>
                <li>Generate a permanent access token from the Business Settings</li>
                <li>Configure webhook settings with your verify token</li>
              </ol>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleSaveConnection} disabled={loading} className="bg-gradient-primary">
                <Save className="w-5 h-5 mr-2" />
                {loading ? 'Saving...' : 'Save Settings'}
              </Button>
              <Button onClick={handleTestConnection} disabled={loading} variant="outline">
                Test Connection
              </Button>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Subscription</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-semibold">Current Plan: Starter</p>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
