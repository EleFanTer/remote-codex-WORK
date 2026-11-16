# Remote Codex Workstation

A cloud-first creative workstation designed to unify writing, media, AI production, and private remote tooling behind one secure iPhone-first interface.

## What is included

- iPhone-first dashboard shell
- secure login flow and auth checks
- OpenAI-compatible AI route with graceful fallback
- media upload support
- workflow queue and approval actions
- consent gate for voice, playlist, library, and media actions
- private service access model for VS Code, KasmVNC, and Wetty

## Private service gateway

The app now contains a protected service-access layer designed to expose only the tools that a valid session is allowed to use.

See `docs/private-services.md` for the policy model and routing notes.

## Development

```bash
npm install
npm run dev
```

The app runs locally with:

- Web UI: `http://localhost:5173`
- API: `http://localhost:4000`

## Environment

```env
OPENAI_API_KEY=your-key
OPENAI_MODEL=gpt-4o-mini
```

## Production direction

This product is designed to behave like a single cloud workstation while using backend-controlled private services for:

- coding
- remote desktop access
- terminal access
- media processing
- AI-assisted writing and creative flows

All destructive or library-changing actions require explicit review and consent.
