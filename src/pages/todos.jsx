import { useState, useEffect } from "react";
import "../index.css";

export default function Todos() {
  // ================== STATE ==================
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hälsa");
  const [time, setTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filterCategory, setFilterCategory] = useState("alla");
  const [sortBy, setSortBy] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ================== LOCAL STORAGE ==================
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ================== FUNCTIONS ==================
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

  // ================== RENDER ==================
  return (
    <div className="todos-page">
      {/* SIDOPANEL */}
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

      {/* HUVUDINNEHÅLL */}
      <main className="main-content">
        {showForm ? (
          <form className="todo-form" onSubmit={addTodo}>
            <input
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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
            {todos.length === 0 ? (
              <p>Inga todos ännu</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="todo-card">
                  <h4>{todo.title}</h4>
                  <p>{todo.description}</p>
                  <small>Deadline: {todo.deadline}</small>

                  {/* TOGGLE SWITCH */}
                  <div className="flex items-center gap-2 mt-2">
                    <label>Klar</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={todo.done}
                        onChange={() => toggleDone(todo.id)}
                      />
                      <div className="w-11 h-6 bg-gray-400 rounded-full transition-colors duration-300 peer-checked:bg-green-500"></div>
                      <div
                        className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full
                        transition-transform duration-300 peer-checked:translate-x-5"
                      ></div>
                    </label>
                  </div>

                  {/* ACTIONS */}
                  <div className="todo-actions">
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
