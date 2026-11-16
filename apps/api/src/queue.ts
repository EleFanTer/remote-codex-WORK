import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { WorkflowTask } from '@remote-codex/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storageDir = path.join(__dirname, '..', '..', 'storage');
const tasksPath = path.join(storageDir, 'tasks.json');
const consentsPath = path.join(storageDir, 'consents.json');

const seedTasks: WorkflowTask[] = [
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

const seedConsents = [] as Array<{
  id: string;
  type: 'voice' | 'playlist' | 'library' | 'media';
  granted: boolean;
  timestamp: string;
  note: string;
}>;

async function ensureStorage() {
  await fs.promises.mkdir(storageDir, { recursive: true });

  if (!fs.existsSync(tasksPath)) {
    await fs.promises.writeFile(tasksPath, JSON.stringify(seedTasks, null, 2));
  }

  if (!fs.existsSync(consentsPath)) {
    await fs.promises.writeFile(consentsPath, JSON.stringify(seedConsents, null, 2));
  }
}

export async function readTasks(): Promise<WorkflowTask[]> {
  await ensureStorage();

  const raw = await fs.promises.readFile(tasksPath, 'utf8');
  try {
    return JSON.parse(raw) as WorkflowTask[];
  } catch {
    return seedTasks;
  }
}

export async function writeTasks(tasks: WorkflowTask[]) {
  await ensureStorage();
  await fs.promises.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
}

export async function readConsents() {
  await ensureStorage();

  const raw = await fs.promises.readFile(consentsPath, 'utf8');
  try {
    return JSON.parse(raw) as Array<{
      id: string;
      type: 'voice' | 'playlist' | 'library' | 'media';
      granted: boolean;
      timestamp: string;
      note: string;
    }>;
  } catch {
    return seedConsents;
  }
}

export async function writeConsents(consents: Array<{
  id: string;
  type: 'voice' | 'playlist' | 'library' | 'media';
  granted: boolean;
  timestamp: string;
  note: string;
}>) {
  await ensureStorage();
  await fs.promises.writeFile(consentsPath, JSON.stringify(consents, null, 2));
}
