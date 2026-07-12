export default async (request, context) => {
  const auth = request.headers.get("authorization");
  const expected = "Basic " + btoa("harigot_nitur:Winter-Violet-40");
  if (auth !== expected) {
    return new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
    });
  }
  return context.next();
};
