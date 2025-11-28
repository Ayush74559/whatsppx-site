import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    let mounted = true;

    async function handleCallback() {
      try {
        const url = window.location.href;
        const hasCode = new URL(url).searchParams.get('code');

        // If using the PKCE code flow, exchange the code for a session.
        // Guard for SDK versions where exchangeCodeForSession may not exist.
        if (hasCode) {
          const anyAuth = (supabase.auth as any);
          if (typeof anyAuth.exchangeCodeForSession === 'function') {
            try {
              const { error } = await anyAuth.exchangeCodeForSession(url);
              if (error) throw error;
            } catch (ex: unknown) {
              // Common PKCE issue: missing code_verifier stored in localStorage
              // or storage cleared between redirect. Handle gracefully by
              // attempting to read an existing session before failing.
              console.error('[AuthCallback] exchangeCodeForSession failed:', ex);

              // Check if we already have a valid session
              const fallback = await supabase.auth.getSession();
              if (fallback?.data?.session) {
                // session exists despite exchange failure; continue
                if (!mounted) return;
                setStatus('success');
                navigate('/dashboard', { replace: true });
                return;
              }

              // If we reached here, the exchange truly failed due to missing
              // verifier or other PKCE issue. Surface a helpful message and
              // redirect back to login so user can retry.
              console.warn('[AuthCallback] PKCE exchange failed, redirecting to login');
              if (!mounted) return;
              setStatus('error');
              toast.error('Authentication failed. Please try signing in again.');
              navigate('/login', { replace: true });
              return;
            }
          }
        }

        // Ensure session is available after redirect.
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No active session after OAuth redirect');
        }

        if (!mounted) return;
        setStatus('success');
        // Navigate to dashboard (or desired post-login route)
        navigate('/dashboard', { replace: true });
      } catch (err: unknown) {
        console.error('[AuthCallback] OAuth handling failed:', err);
        if (!mounted) return;
        setStatus('error');
        toast.error((err instanceof Error ? err.message : 'Sign-in failed. Please try again.'));
        navigate('/login', { replace: true });
      }
    }

    handleCallback();
    return () => { mounted = false; };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="glass-card w-full max-w-md p-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{status === 'loading' ? 'Completing sign-in…' : status === 'success' ? 'Signed in' : 'Sign-in failed'}</h1>
          <p className="text-muted-foreground">
            {status === 'loading' && 'Please wait while we finalize your authentication.'}
            {status === 'success' && 'Redirecting to your dashboard…'}
            {status === 'error' && 'Redirecting to the login page…'}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default AuthCallback;
