import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Provide a dummy client or safe fallback to prevent initialization crashes
    return createBrowserClient(
      url || 'https://placeholder-url.supabase.co',
      anonKey || 'placeholder-anon-key'
    );
  }

  return createBrowserClient(url, anonKey);
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    anonKey &&
    !url.includes('placeholder-url') &&
    !anonKey.includes('placeholder') &&
    url.startsWith('http')
  );
}
