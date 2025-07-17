import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

Deno.serve(async (_req) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .limit(1);

  return new Response(
    JSON.stringify({
      message: "pong 🏓",
      timestamp: new Date().toISOString(),
      db: error ? `error: ${error.message}` : "ok",
    }),
    { headers }
  );
});
