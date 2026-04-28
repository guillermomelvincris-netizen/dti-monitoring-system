import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmatcxkizenhuutzzkjm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYXRjeGtpemVuaHV1dHp6a2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjcxNjQsImV4cCI6MjA5MjkwMzE2NH0.BntMbF4x6oVf0yymh_M_lPkDkox1MYHCQdtsSfCXMb8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)