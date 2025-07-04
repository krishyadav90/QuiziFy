import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve((_req) => {
  return new Response(
    JSON.stringify({ message: "pong 🏓" }),
    { headers: { "Content-Type": "application/json" } },
  );
});
