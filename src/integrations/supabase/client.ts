
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ybuilhatpkadjmivdvvc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWlsaGF0cGthZGptaXZkdnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDI4MjgsImV4cCI6MjA1OTA3ODgyOH0.8f1OH3r-_NnKhU4vFIsmygdWTi17e5f2HYa-TWy1Tdw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
