import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — SERVER ONLY.
 * Bypasses RLS; used by admin server actions to write articles and
 * upload images. Never import this into a Client Component.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase admin not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
