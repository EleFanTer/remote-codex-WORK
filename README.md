# Remote Codex Workstation

A cloud-hosted, iPhone-first creative workstation that brings remote development and media workflows together behind one secure web interface.

> **Status:** Initial architecture and product plan. This repository is currently a starter README; the application, cloud deployment, AI/media integrations, and repository-to-repository automation are not implemented yet.

## Product goal

Use Safari on iPhone as the only supported user interface. Keep at least 90% of interactive compute and media processing in cloud services; the iPhone is the control surface and media preview device, not the workstation. Provide one place to work with writing, lyrics, books, poetry, audio, video, photos, and music discovery, with AI assistance and explicit user approval for changes to private libraries.

The named repositories are complementary building blocks, not a complete creative/AI product by themselves:

| Repository | Proposed responsibility |
| --- | --- |
| [`remote-codex-workstation`](https://github.com/EleFanTer/remote-codex-workstation) | Product shell, mobile web app, authentication, workflow orchestration, and integration APIs. |
| [`vscode`](https://github.com/EleFanTer/vscode) | Remote code editor/development experience. Integrate as a separately deployed browser-accessible service; do not fork or rebuild VS Code as the product UI. |
| [`KasmVNC`](https://github.com/EleFanTer/KasmVNC) | Optional browser-based access to a cloud Linux desktop for applications that need a GUI. Its documented product is browser-native; do not add native VNC-client support. |
| [`wetty`](https://github.com/EleFanTer/wetty) | Optional browser terminal for authenticated, restricted administrative/development tasks. Keep it private and do not expose an unrestricted shell to the public internet. |

Text correction, transcription, voice generation/cloning, subtitle generation, video correction/upscaling, photo upscaling, and music recommendations require additional AI/media providers or separately operated services. They are **not** capabilities supplied automatically by VS Code, KasmVNC, or WeTTY.

## Proposed architecture

```text
 iPhone Safari / installable web app
                 |
          HTTPS application gateway
                 |
  Workstation web app + API (this repo)
       |          |           |
   AI gateway   Job queue   User library connectors
       |          |           |
 OpenAI API   Cloud media workers/object storage
                         |
             VS Code / KasmVNC / WeTTY
             (private, optional services)
```

- Build a responsive, accessible web app/PWA; treat narrow screens, touch, upload/resume, and media preview as first-class requirements.
- Keep orchestration, storage, databases, and CPU/GPU-heavy jobs in the cloud. Document and measure the 90% target as the fraction of compute-intensive job runtime executed by cloud workers, excluding iPhone UI/rendering and capture.
- Put all provider credentials on the server in a managed secret store. The browser must never receive API keys, SSH credentials, or unrestricted service URLs.
- Use a job queue for long-running transcription, generation, and enhancement. Show progress, allow cancellation, and preserve the original media alongside generated versions.
- Use a single sign-on/session boundary and private network or identity-aware proxy for the editor, desktop, and terminal. Apply per-user authorization and audit administrative actions.
- Keep media storage private by default, with explicit retention/deletion controls and quotas.

## ChatGPT / OpenAI integration

The supported integration path should be the **OpenAI API**, called by a server-side adapter in this application. It can provide conversational assistance and, subject to the selected API models and policies, text and multimodal workflows. Store an API key as a cloud secret and add usage limits, logging controls, and user-facing disclosure before sending private text, audio, images, or video to a provider.

A ChatGPT website or ChatGPT subscription is not itself an API endpoint or a credential for this application. Do not automate or scrape the ChatGPT website to act as an integration. Confirm API access, budget, data-retention requirements, and eligible model capabilities before implementation. Specialist services may still be needed for audio cloning, video processing, and music catalog access.

## Privacy, consent, and rights

- Voice cloning must require documented permission from the person whose voice is being modeled. Clearly label generated audio and do not provide impersonation of another person without authorization.
- Analyze only playlists and listening history the user explicitly connects through an authorized provider flow. Do not scrape accounts or bypass provider restrictions. Request approval before writing, deleting, or reordering playlist items.
- Obtain rights to uploaded or processed media. Make provider data handling and retention clear; offer deletion of source files, outputs, and derived data.
- Require confirmation before destructive edits, publishing, sending, or changing external accounts. Keep reversible originals and version history where practical.

## Delivery plan

1. **Foundation:** decide cloud provider, deployment region, identity provider, domain, budget, AI/media vendors, storage retention, and supported music services. Establish threat model and privacy policy.
2. **Secure iPhone shell:** add a responsive authenticated PWA, account/session management, private object uploads, and a cloud job/status API. Validate usability on real iPhone Safari.
3. **First useful workflow:** implement text proofreading and rewriting with before/after comparison, user-controlled prompts, and an OpenAI API adapter. Add tests and cost/rate limits.
4. **Remote workspace:** deploy VS Code as an optional service. Add KasmVNC only for GUI workflows and WeTTY only for tightly restricted administration. Route these behind the same authenticated gateway.
5. **Media jobs:** add transcription/subtitles, image/video enhancement, and speech generation as separate queued provider adapters, each with consent checks and source/output versioning.
6. **Music discovery:** add supported OAuth-based playlist/history import, recommendations, and a review screen. Require a second explicit confirmation for playlist writes.
7. **Production readiness:** monitor cloud-vs-device processing, latency, costs, accessibility, backups, incident response, and deletion/retention behavior before widening access.

## First implementation boundary

The first release should not promise every requested capability at once. A sensible MVP is: **iPhone Safari sign-in → upload or paste text → get a proposed correction → compare and approve/export**. Add media processing and account-writing integrations only after the provider, data, consent, and security decisions above are made.

## Repository integration

Prefer pinned upstream releases/images and documented service APIs over combining the four codebases into one build. Add deployment manifests and CI here only after selecting the cloud provider and confirming supported upstream deployment methods. Keep each service independently upgradeable; do not make a fork of the large VS Code repository a prerequisite for the product shell.
