import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  editingIndex,
  setEditingIndex,
  updateTaskText
}) {
  if (!tasks.length) {
  return <p className="subtitle">No hay tareas para mostrar.</p>;
}

return (
  <ul className="todoList">
    {tasks.map((task, index) => (
      <TaskItem
        key={`${task.text}-${index}`}
        task={task}
        index={index}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        updateTaskText={updateTaskText}
      />
    ))}
  </ul>
);

}

export default TaskList;
