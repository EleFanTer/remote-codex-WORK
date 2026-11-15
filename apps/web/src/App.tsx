import { useEffect, useState } from 'react';

type Task = {
  id: string;
  type: string;
  title: string;
  status: string;
  createdAt: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState('Rewrite this text with a clearer, warmer tone.');
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks ?? []))
      .catch(() => setTasks([]));
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context: 'iPhone-first creative workstation' })
    });

    const result = await response.json();
    setReply(result.reply ?? 'No reply generated yet.');
  };

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Private cloud workstation</p>
          <h1>Remote Codex Workstation</h1>
        </div>
        <button className="primary">Open workspace</button>
      </header>

      <main className="grid">
        <section className="panel hero">
          <h2>Creative command center</h2>
          <p>
            Text, voice, music, photos, videos, and code all flow into one approved cloud environment.
          </p>

          <div className="prompt-box">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
            />
            <button className="primary" onClick={handleSubmit}>Run AI workflow</button>
          </div>

          {reply && (
            <div className="reply-box">
              <strong>AI result</strong>
              <p>{reply}</p>
            </div>
          )}
        </section>

        <aside className="panel">
          <h3>Available tools</h3>
          <ul className="tool-list">
            <li>VS Code</li>
            <li>KasmVNC</li>
            <li>Wetty</li>
            <li>AI text correction</li>
            <li>Media enhancement</li>
            <li>Library review</li>
          </ul>
        </aside>
      </main>

      <section className="panel tasks-panel">
        <div className="section-head">
          <h3>Workflow queue</h3>
          <span>Cloud jobs</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No active jobs.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <div>
                  <p className="task-type">{task.type}</p>
                  <h4>{task.title}</h4>
                </div>
                <span className={`tag ${task.status}`}>{task.status}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
