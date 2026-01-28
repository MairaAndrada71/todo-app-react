import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    addTask(clean);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todoInput"
      />
      <button type="submit" className="btn primary">
        Agregar
      </button>
    </form>
  );
}
