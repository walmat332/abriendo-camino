import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jtseqrtsjeanhiiicrdp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0c2VxcnRzamVhbmhpaWljcmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjk2NDEsImV4cCI6MjEwMzk0NTY0MX0.h6xj2pQu8UJo9ibF_Ug2cMCZ3oQ9kMWBvpraSQL-h-4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)