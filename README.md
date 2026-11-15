# Remote Codex Workstation

A cloud-first creative workstation designed to unify writing, media, AI production, and private remote tooling behind one secure iPhone-first interface.

## Project shape

- `apps/web` – iPhone-first product shell and dashboard
- `apps/api` – Express API, sessions, workflow tasks, AI orchestration endpoints
- `packages/shared` – shared types and project-level contracts
- `docs/architecture.md` – architecture and integration notes

## Current status

This repository is now scaffolded with:

- dashboard UI shell
- mock authentication flow
- protected task endpoints
- AI chat route stub
- private service registry
- workflow queue and approval actions

## Next implementation steps

1. Replace the stub AI route with a real OpenAI API adapter
2. Add real session persistence and policy checks
3. Add task/job storage and queue processing
4. Add media upload and storage workflows
5. Add private reverse-proxy routing for VS Code, KasmVNC, and Wetty
6. Add explicit consent flows for library and playlist changes

## Development

```bash
npm install
npm run dev
```

The app runs locally with:

- Web UI: `http://localhost:5173`
- API: `http://localhost:4000`

> This is still a starter product foundation, not a final production implementation.
