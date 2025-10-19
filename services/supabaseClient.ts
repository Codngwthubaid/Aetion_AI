import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase_link = import.meta.env.NEXT_SUPABASE_LINK;
const anon_key = import.meta.env.ANON_KEY

const supabase = createClient(
    supabase_link,
    anon_key
)