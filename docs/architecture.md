# Remote Codex Workstation Architecture

## Goal

Create a single, mobile-first cloud workstation that feels like one product while integrating separate services behind the same authenticated shell.

## Core product principles

- Cloud-first compute
- iPhone Safari as the primary interface
- explicit user approval for destructive or library-changing actions
- secure, server-side AI mediation
- private access to VS Code, KasmVNC, and Wetty behind the same auth boundary

## Layered system design

```text
Safari on iPhone
    |
    v
Web app / PWA
    |
    v
Backend API + auth + session layer
    |
    +--> OpenAI / ChatGPT adapter
    +--> Media jobs queue
    +--> Storage and metadata DB
    +--> Protected remote service router
           |
           +--> VS Code (private browser service)
           +--> KasmVNC (private GUI desktop)
           +--> Wetty (private terminal)
```

## Why this separation matters

- The browser should not hold API keys or service credentials.
- AI requests should be mediated by backend-controlled policies.
- Uploads and outputs should be versioned and reviewable.
- Heavy compute should happen in cloud workers, not on the phone.
- Desktop tools should remain optional and private.

## Recommended next product milestone

Build a secure MVP around:

- authenticated dashboard
- AI text-proofing flow
- media upload and job tracking
- approvals before library or playlist writes
- optional private browser tools behind the same session

## Security rules

- No direct browser-to-VM or browser-to-terminal access
- No direct public access to KasmVNC or Wetty from the internet
- All model requests go through server-side policies and quotas
- Maintain user consent logs for voice, lyrics, music, and playlist actions
