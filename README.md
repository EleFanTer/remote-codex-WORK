:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #020817;
  color: #e2e8f0;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
}

body {
  background:
    radial-gradient(circle at top, rgba(59, 130, 246, 0.28), transparent 25%),
    linear-gradient(180deg, #020817 0%, #0f172a 100%);
}

button, textarea, select, input {
  font: inherit;
}

.shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 8px 0 24px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-actions input,
select,
textarea {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 10px;
  color: white;
}

.header-actions input,
select {
  padding: 0.8rem 0.9rem;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #7dd3fc;
}

h1, h2, h3, h4, p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.panel {
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.78);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.35);
  padding: 20px;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.primary, .secondary, .ghost {
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

.primary {
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: white;
}

.secondary {
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
}

.ghost {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: #e2e8f0;
}

.small {
  padding: 0.55rem 0.8rem;
  font-size: 0.75rem;
}

.user-pill {
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  background: rgba(14, 165, 233, 0.12);
  color: #a5f3fc;
  font-size: 0.8rem;
}

.button-row,
.upload-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.prompt-box,
.consent-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

textarea {
  border-radius: 16px;
  padding: 14px 16px;
  resize: vertical;
}

.reply-box {
  border: 1px solid rgba(59, 130, 246, 0.34);
  border-radius: 16px;
  background: rgba(30, 41, 59, 0.5);
  padding: 16px;
}

.tool-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.tool-list li,
.consent-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 12px;
  padding: 12px 14px;
}

.tool-list a {
  color: #7dd3fc;
  text-decoration: none;
}

.consent-list {
  margin-top: 20px;
}

.tasks-panel {
  margin-top: 20px;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.task-list {
  display: grid;
  gap: 12px;
}

.task-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  background: rgba(15, 23, 42, 0.68);
}

.task-type {
  margin-bottom: 8px;
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.38rem 0.8rem;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.tag.queued { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
.tag.processing { background: rgba(96, 165, 250, 0.15); color: #93c5fd; }
.tag.done { background: rgba(34, 197, 94, 0.15); color: #86efac; }
.tag.needs-review { background: rgba(244, 114, 182, 0.14); color: #f9a8d4; }

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
