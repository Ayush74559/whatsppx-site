import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/types';

function mapSupabaseUser(user: any): User {
  return {
    id: user.id,
    email: user.email!,
    username: user.user_metadata?.username || user.email!.split('@')[0],
    avatar: user.user_metadata?.avatar_url,
    businessName: user.user_metadata?.business_name,
    phoneNumber: user.user_metadata?.phone_number,
    plan: user.user_metadata?.plan || 'starter',
  };
}

export function useAuth() {
  const { user, loading, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) {
        login(mapSupabaseUser(session.user));
      }
      if (mounted) setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        login(mapSupabaseUser(session.user));
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        logout();
        setLoading(false);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        login(mapSupabaseUser(session.user));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [login, logout, setLoading]);

  return { user, loading, logout };
}

export function useRequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  return { user, loading };
}
