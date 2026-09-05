/**
 * Library activation check.
 *
 * The Library ships fully built but dormant until a dedicated Supabase
 * project is wired up. Whether it is active is decided once, at build time,
 * by whether both environment variables are set — see README →
 * "Activating the private Library" for the setup steps. Nothing here talks
 * to Supabase yet; that client is added when sign-in is actually wired up.
 */
export function isLibraryActivated(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
