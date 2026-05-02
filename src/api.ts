// Quotes API client.
//
// FIXME: hardcoded localhost upstream — works on the original
// developer's laptop, breaks in any deployed environment. Should be
// driven by VITE_API_URL.
const API_URL = "http://localhost:3001/api";

// FIXME: hardcoded session token — dev-only, MUST not ship to prod.
// Vite inlines anything reachable at build time, so this ends up in
// the generated bundle visible to anyone who opens DevTools.
const API_TOKEN = "dev-token-1234567890abcdef";

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export async function fetchQuotes(): Promise<Quote[]> {
  const resp = await fetch(`${API_URL}/quotes`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  if (!resp.ok) throw new Error(`fetch quotes: ${resp.status}`);
  return resp.json();
}
