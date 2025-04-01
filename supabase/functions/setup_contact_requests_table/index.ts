
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // SQL query to create the contact_requests table if it doesn't exist
    const { data: tableData, error: tableError } = await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.contact_requests (
          id SERIAL PRIMARY KEY,
          name TEXT,
          phone TEXT NOT NULL,
          email TEXT,
          message TEXT,
          user_type TEXT NOT NULL DEFAULT 'customer',
          source TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL,
          processed BOOLEAN DEFAULT false,
          processed_at TIMESTAMP WITH TIME ZONE
        );
        
        -- Create index on phone number for faster lookups
        CREATE INDEX IF NOT EXISTS contact_requests_phone_idx ON public.contact_requests (phone);
        
        -- Create index on created_at for date range queries
        CREATE INDEX IF NOT EXISTS contact_requests_created_at_idx ON public.contact_requests (created_at);
      `
    })

    if (tableError) {
      throw tableError
    }

    // Set up RLS policies for the table
    const { data: policyData, error: policyError } = await supabaseClient.rpc('exec_sql', {
      sql: `
        -- Enable Row Level Security
        ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        DO $$
        BEGIN
          -- Drop policies if they exist to avoid errors on recreation
          DROP POLICY IF EXISTS "Allow select for authenticated users only" ON public.contact_requests;
          DROP POLICY IF EXISTS "Allow insert for everyone" ON public.contact_requests;
          DROP POLICY IF EXISTS "Allow update for authenticated users only" ON public.contact_requests;
          
          -- Create new policies
          CREATE POLICY "Allow select for authenticated users only" 
            ON public.contact_requests 
            FOR SELECT 
            TO authenticated 
            USING (true);
          
          CREATE POLICY "Allow insert for everyone" 
            ON public.contact_requests 
            FOR INSERT 
            TO anon 
            WITH CHECK (true);
            
          CREATE POLICY "Allow update for authenticated users only" 
            ON public.contact_requests 
            FOR UPDATE 
            TO authenticated 
            USING (true);
        END
        $$;
      `
    })

    if (policyError) {
      throw policyError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact requests table created successfully with appropriate RLS policies' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
