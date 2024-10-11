// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xrwvqiceyhbmuptnfbuf.supabase.co'; // Tu Supabase URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Tu API Key desde las variables de entorno

export const supabase = createClient(supabaseUrl, supabaseKey);
