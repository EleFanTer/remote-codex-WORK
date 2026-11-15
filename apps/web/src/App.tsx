import { useEffect, useMemo, useState } from 'react';

type Task = {
  id: string;
  type: string;
  title: string;
  status: string;
  createdAt: string;
};

type Service = {
  name: string;
  url: string;
  enabled: boolean;
};

const AU = 'http://localhost:4000';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('remote-codex-token'));
  const [user, setUser] = useState<{ user: string; email: string; role: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [message, setMessage] = useState('Rewrite this copy into a cleaner, premium style for an iPhone-first audience.');
  const [reply, setReply] = useState('');
  const [email, setEmail] = useState('demo@remote-codex.local');

  const enabledServices = useMemo(
    () => services.filter((service) => service.enabled),
    [services]
  );

  useEffect(() => {
    if (!token) return;

    fetch(`${AU}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setUser(data?.user ?? null));

    fetch(`${AU}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks ?? []))
      .catch(() => setTasks([]));

    fetch(`${AU}/api/services`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setServices(data.services ?? []))
      .catch(() => setServices([]));
  }, [token]);

  const login = async () => {
    const response = await fetch(`${AU}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'demo-password' })
    });

    const data = await response.json();
    const nextToken = data.token ?? null;
    setToken(nextToken);
    if (nextToken) {
      localStorage.setItem('remote-codex-token', nextToken);
    }
  };

  const logout = async () => {
    if (!token) return;

    await fetch(`${AU}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    setToken(null);
    setUser(null);
    localStorage.removeItem('remote-codex-token');
  };

  const handleSubmit = async () => {
    if (!token) return;

    const response = await fetch(`${AU}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message, context: 'iPhone-first creative workstation' })
    });

    const result = await response.json();
    setReply(result.reply ?? 'No reply generated yet.');
  };

  const addJob = async () => {
    if (!token) return;

    const response = await fetch(`${AU}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: 'New text polish job', type: 'text' })
    });

    const result = await response.json();
    setTasks((prev) => [result.task, ...prev]);
  };

  const approveJob = async (id: string) => {
    if (!token) return;

    const response = await fetch(`${AU}/api/jobs/${id}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      setTasks((prev) => prev.map((task) => task.id === id ? { ...task, status: 'done' } : task));
    }
  };

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Private cloud workstation</p>
          <h1>Remote Codex Workstation</h1>
        </div>
        <div className="header-actions">
          {!user ? (
            <>
              <input value={email} onChange={(event) => setEmail(event.target.value)} />
              <button className="primary" onClick={login}>Sign in</button>
            </>
          ) : (
            <>
              <span className="user-pill">{user.email}</span>
              <button className="ghost" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </header>

      <main className="grid">
        <section className="panel hero">
          <h2>Creative command center</h2>
          <p>
            Writing, audio, image, video, and music discovery all flow through one private cloud workflow with explicit approval gates.
          </p>

          <div className="prompt-box">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
            />
            <div className="button-row">
              <button className="primary" onClick={handleSubmit} disabled={!token}>Run AI workflow</button>
              <button className="secondary" onClick={addJob} disabled={!token}>Create cloud job</button>
            </div>
          </div>

          {reply && (
            <div className="reply-box">
              <strong>AI result</strong>
              <p>{reply}</p>
            </div>
          )}
        </section>

        <aside className="panel">
          <h3>Private access tools</h3>
          <ul className="tool-list">
            {enabledServices.length === 0 ? (
              <li>Authentication required to discover active services.</li>
            ) : (
              enabledServices.map((service) => (
                <li key={service.name}>
                  <span>{service.name}</span>
                  <a href={service.url} target="_blank" rel="noreferrer">Open</a>
                </li>
              ))
            )}
          </ul>
        </aside>
      </main>

      <section className="panel tasks-panel">
        <div className="section-head">
          <h3>Workflow queue</h3>
          <span>{tasks.length} jobs</span>
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
                <div className="task-actions">
                  <span className={`tag ${task.status}`}>{task.status}</span>
                  {task.status !== 'done' && (
                    <button className="ghost small" onClick={() => approveJob(task.id)}>Approve</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
