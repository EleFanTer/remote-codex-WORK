# Remote Codex Workstation

A cloud-based creative workstation for writing, media, and code, designed for an iPhone-first experience.

## What this repo contains

This repository now includes an initial product skeleton for a private cloud media + AI workstation. The goal is to make the app feel like one product while combining cloud services and private access tools behind the same login.

## Included structure

- `apps/web`: React + Vite iPhone-first web application shell
- `apps/api`: TypeScript Express API to host workflows and AI orchestration
- `packages/shared`: common types for tasks and AI orchestration
- `.env.example`: cloud environment template

## Quick start

```bash
npm install
npm run dev
```

The web dashboard will run on `http://localhost:5173` and the API on `http://localhost:4000`.

## Product direction

This is the initial foundation for:

- iPhone Safari-first interface
- AI-assisted writing and proofreading
- cloud media processing jobs
- private remote VS Code / KasmVNC / Wetty access
- secure ChatGPT/OpenAI integration through the backend
- explicit approvals before playlist or library changes

## Next major steps

1. Add authentication and session handling
2. Add real OpenAI API integration behind the backend
3. Add media upload and job queueing
4. Add private routing for VS Code, KasmVNC, and Wetty
5. Add playlist/library consent workflows

> This is intentionally a starter architecture, not a completed production app.
