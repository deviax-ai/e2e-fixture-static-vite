# vite-quotes-spa

Tiny Vite + React quotes board. Pure static SPA — `vite build`
produces a `dist/` of HTML/CSS/JS that any static server (nginx,
Caddy, Netlify, an S3 bucket) can host as-is.

## Run locally

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Why this fixture exists

Phase 1 simplest-pillar of the
[Deviax](https://github.com/deviax-ai/aura_deploy) E2E fixture matrix.

Exercises the **simplest path through the deploy pipeline:** static
asset build, no DB, no managed dependencies, no migrations. The
shipped Dockerfile (which Deviax must generate from scratch — none is
checked in) should be a multi-stage build that ends in nginx serving
`dist/`.

## Seeded "vibe-problems"

| File | What's wrong |
|---|---|
| `src/api.ts` line 5 | `API_URL` hardcoded to `http://localhost:3001/api` — works on the dev's laptop only. Should be `import.meta.env.VITE_API_URL`. |
| `src/api.ts` line 10 | `API_TOKEN` hardcoded — Vite inlines `VITE_*` vars at build time, so this token ends up in the public JS bundle. The "fix" is wiring a backend proxy, not just rotating the token. |
| `vite.config.ts` line 7 | `host: "localhost"` in dev server — fine in dev, but the same file is sometimes copied into prod configs by mistake. |
| no `Dockerfile` | Deviax must generate one. Expected: multi-stage `node:20 → nginx:alpine`. |
| no health endpoint | Static apps don't have one — but the generated nginx config should at least serve `/index.html` reliably and return 2xx for `/`. |

`expected.json` declares:

```jsonc
"assert": {
  "outcome": "success",
  "url_status_class": "2xx",
  "url_status_after_1h": "not_5xx"
}
```

## License

MIT.
