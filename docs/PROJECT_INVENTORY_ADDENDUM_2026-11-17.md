# PROJECT INVENTORY ADDENDUM — 2026-11-17

## Firecrawl MCP configuration merged into main

- Pull request #2 (https://github.com/EleFanTer/remote-codex-WORK/pull/2) was marked ready for review and squash-merged into `main`.
- Merge commit: `ad9ed55d34fb63b9fe383bfabfde02e4762d8da6`.
- Verified on GitHub `main`: `.codex/config.toml` exists with project-scoped server `firecrawl`, URL `https://mcp.firecrawl.dev/v2/mcp`, enabled, startup timeout 30s, tool timeout 120s, and tool approval mode `prompt`.
- This uses Firecrawl's keyless hosted tier. It does not add or expose an API key. Tool availability and rate limits are controlled by Firecrawl's keyless tier.
- **Runtime status: NOT YET VERIFIED.** The configuration is committed to GitHub `main`, but no connected Codespace shell action is available through the current GitHub connector. Therefore no `git pull`, Codex project trust, MCP startup, or `codex mcp list` verification has been performed.
- Next verification sequence in the selected Codespace `crispy-space-bassoon-rxgpvq446gg3w79v`: update checkout to `main`; confirm `.codex/config.toml`; open/trust the repository in Codex; run `codex mcp list`; test a read-only Firecrawl search/scrape. Do not print or request credentials.
- The ChatGPT Firecrawl connector and the Codex project-scoped Firecrawl MCP are separate integrations. A working ChatGPT Firecrawl connector does not prove the Codespace MCP runtime is active.
