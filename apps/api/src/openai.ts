import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { AiRequest, AiResponse, WorkflowTask } from '@remote-codex/shared';
import { generateAiReply } from './openai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'storage', 'uploads');
const consentDir = path.join(__dirname, '..', '..', 'storage', 'consents');

fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(consentDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
    cb(null, `${timestamp}-${safeName}`);
  }
});

const upload = multer({ storage });
const app = express();
const port = Number(process.env.PORT ?? 4000);

const sessions = new Map<string, { user: string; email: string; role: string; createdAt: string }>();
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

const consentRecords: Record<string, { id: string; type: 'voice' | 'playlist' | 'library' | 'media'; granted: boolean; timestamp: string; note: string }> = {};
const services = [
  { name: 'vscode', url: 'https://vscode.example.internal', enabled: true },
  { name: 'kasmvnc', url: 'https://kasmvnc.example.internal', enabled: true },
  { name: 'wetty', url: 'https://wetty.example.internal', enabled: false }
] as const;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '100mb' }));

function authRequired(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !sessions.has(token)) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  next();
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'remote-codex-workstation-api' });
});

app.post('/auth/login', (req, res) => {
  const { email = 'demo@remote-codex.local', password = 'demo-password' } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const token = `demo-session-${Math.random().toString(36).slice(2)}`;
  sessions.set(token, {
    user: 'demo-user',
    email,
    role: 'owner',
    createdAt: new Date().toISOString()
  });

  res.json({
    token,
    user: {
      user: 'demo-user',
      email,
      role: 'owner'
    }
  });
});

app.post('/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (token) {
    sessions.delete(token);
  }

  res.json({ ok: true });
});

app.get('/auth/me', authRequired, (req, res) => {
  const authHeader = req.headers.authorization ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const user = token ? sessions.get(token) : undefined;

  res.json({ user: user ?? null });
});

app.get('/api/services', authRequired, (_req, res) => {
  res.json({ services });
});

app.get('/api/tasks', authRequired, (_req, res) => {
  res.json({ tasks });
});

app.post('/api/jobs', authRequired, (req, res) => {
  const { title, type } = req.body ?? {};

  const newTask: WorkflowTask = {
    id: `task-${Date.now()}`,
    type: (type ?? 'text') as WorkflowTask['type'],
    title: title ?? 'New creative task',
    status: 'queued',
    createdAt: new Date().toISOString(),
    userId: 'demo-user'
  };

  tasks.unshift(newTask);
  res.status(201).json({ task: newTask });
});

app.post('/api/uploads', authRequired, upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: 'File upload is required.' });
    return;
  }

  res.json({
    ok: true,
    file: {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    }
  });
});

app.post('/api/consent', authRequired, (req, res) => {
  const { type, granted, note } = req.body ?? {};

  if (!type || !['voice', 'playlist', 'library', 'media'].includes(type)) {
    res.status(400).json({ error: 'Consent type is required.' });
    return;
  }

  const id = `consent-${Date.now()}`;
  consentRecords[id] = {
    id,
    type,
    granted: Boolean(granted),
    timestamp: new Date().toISOString(),
    note: note ?? 'User granted approval for the requested cloud action.'
  };

  const consentPath = path.join(consentDir, `${id}.json`);
  fs.writeFileSync(consentPath, JSON.stringify(consentRecords[id], null, 2));

  res.status(201).json({ consent: consentRecords[id] });
});

app.get('/api/consent', authRequired, (_req, res) => {
  res.json({ consents: Object.values(consentRecords) });
});

app.post('/api/ai/chat', authRequired, async (req, res) => {
  const body = req.body as Partial<AiRequest>;
  const message = body.message ?? 'Start a new creative workflow.';
  const context = body.context ?? 'This is a private cloud workstation.';

  try {
    const completion = await generateAiReply(message, context);
    res.json(completion);
  } catch (error) {
    console.error('AI request failed', error);
    res.status(500).json({
      reply: 'The AI service is temporarily unavailable. The cloud workflow is ready to retry when the provider is configured.',
      model: 'fallback-orchestrator',
      createdAt: new Date().toISOString()
    } satisfies AiResponse);
  }
});

app.post('/api/jobs/:id/approve', authRequired, (req, res) => {
  const task = tasks.find((entry) => entry.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task not found.' });
    return;
  }

  task.status = 'done';
  res.json({ ok: true, task });
});

app.listen(port, () => {
  console.log(`Remote Codex Workstation API listening on http://localhost:${port}`);
});
