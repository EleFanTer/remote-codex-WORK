import { createServer } from 'http';
import { AddressInfo } from 'net';

export type TaskType = 'text' | 'audio' | 'image' | 'video' | 'music';

export type WorkflowTask = {
  id: string;
  type: TaskType;
  title: string;
  status: 'queued' | 'processing' | 'done' | 'needs-review';
  createdAt: string;
  userId?: string;
};

export type AiRequest = {
  message: string;
  context?: string;
};

export type AiResponse = {
  reply: string;
  model: string;
  createdAt: string;
};

export type RemoteService = {
  name: 'vscode' | 'kasmvnc' | 'wetty';
  url: string;
  enabled: boolean;
};

export function formatTaskStatus(status: WorkflowTask['status']): string {
  return status.replace('-', ' ');
}

export function getHostPort(server: ReturnType<typeof createServer>): number {
  const address = server.address() as AddressInfo | null;
  return address?.port ?? 0;
}
