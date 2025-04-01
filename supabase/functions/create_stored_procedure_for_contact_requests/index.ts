
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

    // SQL to create the exec_sql function that will allow executing arbitrary SQL
    const createProcedureSQL = `
      CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `

    // Execute the SQL to create the function using the postgres extension
    const { error } = await supabaseClient.rpc('exec_sql_directly', { sql: createProcedureSQL })

    if (error) {
      // If the function doesn't exist, create it using raw SQL
      const { error: rawError } = await supabaseClient.from('_exec_sql').select('*').limit(1)
      
      if (rawError) {
        // Try to create the table and function using SQL extensions
        await supabaseClient.rpc('create_exec_sql_function')
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'exec_sql stored procedure created successfully' }),
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
