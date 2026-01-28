import { useEffect, useMemo, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

/* ---------- LOGIN ---------- */
function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const clean = username.trim();
    if (!clean) return;
    onLogin(clean);
  }

  return (
    <div className="page">
      <div className="shell">
        <div className="card glass login">
          <div className="brand">
            <span className="brandDot" />
            <span className="brandName">todo-react</span>
          </div>

          <h1 className="title">Iniciá sesión</h1>
          <p className="subtitle">Entrá con tu nombre para guardar tu progreso.</p>

          <form onSubmit={handleSubmit} className="loginForm">
            <label className="field">
              <span>Usuario</span>
              <input
                placeholder="Ej: maira"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <button className="btn primary" type="submit">
              Entrar
            </button>
          </form>

          <p className="hint">Tip: luego podés cerrar sesión cuando quieras.</p>
        </div>
      </div>
    </div>
  );
}

function filterTasks(tasks, filter) {
  if (filter === "completed") return tasks.filter((t) => t.completed);
  if (filter === "pending") return tasks.filter((t) => !t.completed);
  return tasks;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);

  /* ---------- AUTH ---------- */
  const login = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedUser) setUser(savedUser);
  }, []);

  /* ---------- TASKS ---------- */
  const addTask = (text) => {
    const clean = String(text ?? "").trim();
    if (!clean) return;
    setTasks((prev) => [...prev, { text: clean, completed: false }]);
  };

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTaskText = (index, newText) => {
    const clean = String(newText ?? "").trim();
    if (!clean) return;
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, text: clean } : t))
    );
  };

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter]
  );

  const doneCount = tasks.filter((t) => t.completed).length;

  if (!user) return <Login onLogin={login} />;

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar glass">
          <div className="brand">
            <span className="brandDot" />
            <span className="brandName">To-Do</span>
          </div>

          <div className="userBox">
            <span className="userLabel">Usuario</span>
            <span className="userName">{user}</span>
          </div>

          <button className="btn ghost" type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </header>

        <main className="grid">
          <section className="card glass">
            <div className="sectionHead">
              <h1 className="title">Tus tareas</h1>
              <p className="subtitle">
                Total: <b>{tasks.length}</b> · Completadas: <b>{doneCount}</b>
              </p>
            </div>

            <TaskForm addTask={addTask} />

            <div className="filters">
              <button
                type="button"
                className={`chip ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Todas
              </button>
              <button
                type="button"
                className={`chip ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pendientes
              </button>
              <button
                type="button"
                className={`chip ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completadas
              </button>
            </div>

            <div className="listWrap">
              <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                updateTaskText={updateTaskText}
              />
            </div>
          </section>

          <aside className="card glass side">
            <h2 className="sideTitle">Atajos</h2>
            <ul className="sideList">
              <li>✅ Marcá tareas completadas</li>
              <li>✏️ Editá el texto</li>
              <li>🗑️ Eliminá lo que no sirve</li>
            </ul>

            <div className="divider" />

            <h2 className="sideTitle">Sugerencia</h2>
            <p className="muted">
              Probá escribir tareas cortas y accionables: “Enviar mail”, “Ir al gym”.
            </p>
          </aside>
        </main>

        <footer className="footer muted">
          © 2026 · Maira Andara · Todo - React
        </footer>
      </div>
    </div>
  );
}
