import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xitslksepjveunhrhjeh.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdHNsa3NlcGp2ZXVuaHJoamVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDQ4MzUsImV4cCI6MjA2OTc4MDgzNX0.Pt1ItM4GOH1uFgXC61q6cQ0nFakTCOwVQh14VWuy-aI'; // ganti dengan API Key lu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
