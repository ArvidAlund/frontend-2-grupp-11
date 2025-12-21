import { useState } from "react";
import "../index.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hälsa");
  const [time, setTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filterStatus, setFilterStatus] = useState("alla");
  const [filterCategory, setFilterCategory] = useState("alla");
  const [sortBy, setSortBy] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        category,
        time,
        deadline,
        done: false,
      },
    ]);
    setTitle("");
    setDescription("");
    setTime("");
    setDeadline("");
    setShowForm(false);
  };

  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const newTitle = prompt("Ny titel:", todo.title);
    const newDescription = prompt("Ny beskrivning:", todo.description);
    setTodos(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              title: newTitle || t.title,
              description: newDescription || t.description,
            }
          : t
      )
    );
  };

  const filteredTodos = todos; // Här kan du lägga till filtrering/sortering senare

  return (
    <div className="todos-page">
      {/* SIDOPANEL TILL VÄNSTER */}
      <aside className="sidebar">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Avbryt" : "Skapa"}
        </button>

        {!showForm && (
          <>
            <div className="filter-section">
              <h3>Kategorier</h3>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="alla">Alla</option>
                <option value="hälsa">Hälsa</option>
                <option value="jobb">Jobb</option>
                <option value="nöje">Nöje</option>
                <option value="hushåll">Hushåll</option>
              </select>
            </div>

            <div className="sort-section">
              <h3>Sortera</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Ingen sortering</option>
                <option value="deadline">Deadline</option>
                <option value="time">Tid</option>
                <option value="status">Status</option>
              </select>
            </div>
          </>
        )}
      </aside>

      {/* HUVUDINNEHÅLL TILL HÖGER */}
      <main className="main-content">
        {showForm ? (
          <form className="todo-form" onSubmit={addTodo}>
            <input
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Tidsestimat"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit">Lägg till</button>
          </form>
        ) : (
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p>Inga todos ännu</p>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-card ${todo.done ? "active" : ""}`}
                >
                  <h4>{todo.title}</h4>
                  <p>{todo.description}</p>
                  <small>Deadline: {todo.deadline}</small>
                  <div className="todo-actions">
                    <button onClick={() => toggleDone(todo.id)}>✔</button>
                    <button onClick={() => editTodo(todo.id)}>✏</button>
                    <button onClick={() => deleteTodo(todo.id)}>🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
