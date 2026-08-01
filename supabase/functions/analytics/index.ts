import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { JWT } from "npm:google-auth-library@9.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Get the Service Account JSON from environment variables
    const serviceAccountJsonStr = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
    if (!serviceAccountJsonStr) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set in Edge Function secrets.');
    }

    const serviceAccount = JSON.parse(serviceAccountJsonStr);
    
    // The user's Google Search Console property URL
    const siteUrl = 'https://www.hotelserenepraia.in/'; 
    
    // 2. Authenticate using google-auth-library
    const client = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const accessToken = await client.getAccessToken();

    // 3. Query Search Console API for the last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const startDate = thirtyDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const makeQuery = async (dimensions: string[], rowLimit: number) => {
      const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions,
          rowLimit,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`Search Console API Error (${dimensions}):`, data);
        throw new Error(data.error?.message || `Failed to fetch ${dimensions} data`);
      }
      return data;
    };

    // Fetch chart data (by date) and top queries (by query)
    const [chartData, queryData] = await Promise.all([
      makeQuery(['date'], 30),
      makeQuery(['query'], 10)
    ]);

    // 4. Return combined data to the React frontend
    return new Response(JSON.stringify({ chartData, queryData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in analytics function:", error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
