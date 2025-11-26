import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        login({
          id: data.user.id,
          email: data.user.email!,
          username: data.user.user_metadata?.username || data.user.email!.split('@')[0],
          avatar: data.user.user_metadata?.avatar_url,
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });
if (error) throw error;
      // Supabase will redirect to the OAuth provider. Session handled on redirect back.
    } catch (err: any) {
      console.log(err)
      toast.error(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <div className="auth-video-bg min-h-screen flex items-center justify-center px-4">
      <video
        className="auth-bg-video"
        src="/media/vedios/Untitled%20design.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <Card className="glass-card w-full max-w-md p-8 animate-scale-in relative z-20">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">WhatsAppX</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-4 w-4">
                <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.5-37.2-4.7-55.1H272v104.3h146.9c-6.3 34-25.5 62.8-54.3 82.1v68.1h87.7c51.4-47.3 81.2-117.3 81.2-199.4z"/>
                <path fill="#34a853" d="M272 544.3c73.7 0 135.6-24.4 180.8-66.3l-87.7-68.1c-24.4 16.4-55.6 26-93.1 26-71.6 0-132.3-48.3-154-113.3H29.2v71.2C74.4 489.3 167.8 544.3 272 544.3z"/>
                <path fill="#fbbc04" d="M118 321.6c-11.9-35.6-11.9-73.9 0-109.5V140.9H29.2c-39.5 77.8-39.5 168.4 0 246.2L118 321.6z"/>
                <path fill="#ea4335" d="M272 107.7c39.9-.6 78.3 14 107.5 40.8l80.6-80.6C407.6 24.3 345.7 0 272 0 167.8 0 74.4 55 29.2 140.9l88.8 71.2C139.7 156 200.4 107.7 272 107.7z"/>
              </svg>
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-border flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
