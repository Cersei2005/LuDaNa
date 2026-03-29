import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
const SUPABASE_URL = 'https://www.weavefox.cn/api/open/v1/supabase_proxy/1501';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0MjEwNDE2LCJleHAiOjEzMjc0ODUwNDE2fQ.qRqZ7QDA1p2Rl0vcqGQDQw3icdvdPIWQ-aBFTsAFVuY';

// Create a single supabase client for interacting with the database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);