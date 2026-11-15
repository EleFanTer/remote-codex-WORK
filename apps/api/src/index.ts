import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import type { AiRequest, AiResponse, WorkflowTask } from '@remote-codex/shared';

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: true }));
app.use(express.json({ limit: '50mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'remote-codex-workstation-api' });
});

app.get('/api/tasks', (_req, res) => {
  const tasks: WorkflowTask[] = [
    {
      id: 'task-001',
      type: 'text',
      title: 'Proofread and rewrite article',
      status: 'needs-review',
      createdAt: new Date().toISOString(),
      userId: 'demo-user'
    },
    {
      id: 'task-002',
      type: 'audio',
      title: 'Clean and transcribe voice memo',
      status: 'queued',
      createdAt: new Date().toISOString(),
      userId: 'demo-user'
    },
    {
      id: 'task-003',
      type: 'video',
      title: 'Upscale raw clip',
      status: 'processing',
      createdAt: new Date().toISOString(),
      userId: 'demo-user'
    }
  ];

  res.json({ tasks });
});

app.post('/api/ai/chat', async (req, res) => {
  const body = req.body as Partial<AiRequest>;
  const message = body.message ?? 'Start a new creative workflow.';
  const context = body.context ?? 'This is a private cloud workstation.';

  const payload: AiResponse = {
    reply: `Working on: "${message}". Context: ${context}. This backend is ready to connect to a real ChatGPT/OpenAI provider when credentials and policies are configured.`,
    model: 'chatgpt-orchestrator-stub',
    createdAt: new Date().toISOString()
  };

  res.json(payload);
});

app.listen(port, () => {
  console.log(`Remote Codex Workstation API listening on http://localhost:${port}`);
});
