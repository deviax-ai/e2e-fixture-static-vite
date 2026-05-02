import { useEffect, useState } from "react";
import { fetchQuotes, type Quote } from "./api";

const LOCAL_QUOTES: Quote[] = [
  { id: 1, text: "Premature optimization is the root of all evil.", author: "Knuth" },
  { id: 2, text: "Make it work, make it right, make it fast.", author: "Beck" },
  { id: 3, text: "There are 2 hard things in CS: cache invalidation, naming, and off-by-one errors.", author: "Karlton (paraphrased)" },
];

export default function App() {
  const [quotes, setQuotes] = useState<Quote[]>(LOCAL_QUOTES);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes()
      .then(setQuotes)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "40px auto", padding: 24 }}>
      <h1>Daily Quotes</h1>
      {error && <p style={{ color: "#c33" }}>API offline — showing local fallback ({error})</p>}
      <ul>
        {quotes.map((q) => (
          <li key={q.id} style={{ marginBottom: 12 }}>
            <em>"{q.text}"</em> — {q.author}
          </li>
        ))}
      </ul>
    </main>
  );
}
