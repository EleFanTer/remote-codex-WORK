import { readTasks, writeTasks } from './storage.js';

export async function processQueuedJobs() {
  const tasks = await readTasks();
  let updated = false;

  for (const task of tasks) {
    if (task.status === 'queued') {
      task.status = 'processing';
      updated = true;
      continue;
    }

    if (task.status === 'processing') {
      task.status = 'needs-review';
      updated = true;
    }
  }

  if (updated) {
    await writeTasks(tasks);
  }
}
