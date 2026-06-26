import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a client-side Supabase connection instance.
 * Automatically utilizes the environment tokens declared in `.env.local`.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}