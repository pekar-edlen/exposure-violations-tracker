// =====================================================================
// Netlify Function – פרוקסי ל-Google Apps Script
// פותר בעיות CORS על iOS Safari / iPad
// =====================================================================

exports.handler = async function(event) {
  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!SCRIPT_URL) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'GOOGLE_SCRIPT_URL not configured' })
    };
  }

  const params = event.queryStringParameters || {};
  const qs = new URLSearchParams(params).toString();
  const targetUrl = SCRIPT_URL + (qs ? '?' + qs : '');

  try {
    const response = await fetch(targetUrl, {
      redirect: 'follow',
      headers: { 'User-Agent': 'NetlifyProxy/1.0' }
    });
    const text = await response.text();

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders(),
      body: JSON.stringify({ error: err.message })
    };
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };
}
