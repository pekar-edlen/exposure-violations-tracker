export default async (request, context) => {
  const auth = request.headers.get("authorization");
  const user = Deno.env.get("BASIC_AUTH_USER");
  const pass = Deno.env.get("BASIC_AUTH_PASS");
  const expected = "Basic " + btoa(`${user}:${pass}`);
  if (auth !== expected) {
    return new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
    });
  }
  return context.next();
};
