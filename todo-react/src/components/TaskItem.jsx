import { useEffect, useState } from "react";

export default function TaskItem({
  task,
  index,
  toggleTask,
  deleteTask,
  editingIndex,
  setEditingIndex,
  updateTaskText,
}) {
  const isEditing = editingIndex === index;
  const [draft, setDraft] = useState(task.text);

  // Cuando entra en modo edición, copiamos el texto actual al draft
  useEffect(() => {
    if (isEditing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft(task.text);
    }
  }, [isEditing, task.text]);

  function startEdit() {
    setDraft(task.text);
    setEditingIndex(index);
  }

  function cancelEdit() {
    setDraft(task.text);
    setEditingIndex(null);
  }

  function saveEdit() {
    const clean = draft.trim();
    if (!clean) return;
    updateTaskText(index, clean);
    setEditingIndex(null);
  }

  return (
    <li className="todoItem">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />

      <div style={{ flex: 1 }}>
        {!isEditing ? (
          <span
            className={`todoText ${task.completed ? "done" : ""}`}
            onClick={() => toggleTask(index)}
            style={{ cursor: "pointer" }}
          >
            {task.text}
          </span>
        ) : (
          <input
            className="todoEditInput"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        )}
      </div>

      {!isEditing ? (
        <>
          <button type="button" className="iconBtn" onClick={startEdit}>
            Editar
          </button>
          <button
            type="button"
            className="iconBtn danger"
            onClick={() => deleteTask(index)}
          >
            Borrar
          </button>
        </>
      ) : (
        <>
          <button type="button" className="iconBtn" onClick={saveEdit}>
            Guardar
          </button>
          <button type="button" className="iconBtn" onClick={cancelEdit}>
            Cancelar
          </button>
        </>
      )}
    </li>
  );
}
