import { useState } from "react";

export default function EditTodos({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState(todo.category);
  const [time, setTime] = useState(todo.time);
  const [deadline, setDeadline] = useState(todo.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...todo,
      title,
      description,
      category,
      time,
      deadline,
    });
  };

  return (
    <form className="todo-card todo-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      {/* ✅ KATEGORI VID REDIGERA */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="hälsa">Hälsa</option>
        <option value="jobb">Jobb</option>
        <option value="nöje">Nöje</option>
        <option value="hushåll">Hushåll</option>
      </select>

      <div className="todo-actions">
        <button type="submit">Spara</button>
        <button type="button" onClick={onCancel}>
          Avbryt
        </button>
      </div>
    </form>
  );
}
