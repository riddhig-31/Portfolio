import { createClient } from '@supabase/supabase-js'

const env = (import.meta as any).env
const url = env.VITE_SUPABASE_URL as string
const anonKey = env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anonKey) {
  console.warn(
    'Supabase env vars are missing. Copy .env.example to .env and fill in your project URL and anon key.',
  )
}

export const supabase = createClient(url, anonKey)