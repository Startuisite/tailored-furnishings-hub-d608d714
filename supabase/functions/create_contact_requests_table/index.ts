
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

    // SQL to create the contact_requests table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS contact_requests (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT,
        phone TEXT NOT NULL,
        email TEXT,
        message TEXT,
        user_type TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        processed BOOLEAN DEFAULT FALSE,
        processed_at TIMESTAMP WITH TIME ZONE
      );
    `

    // Execute the SQL to create the table
    const { error } = await supabaseClient.rpc('exec_sql', { sql: createTableSQL })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, message: 'contact_requests table created successfully' }),
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
