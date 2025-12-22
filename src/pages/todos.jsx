import { useEffect, useState } from "react";
import "../index.css";
import EditTodos from "../components/todos/editTodos";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hälsa");
  const [time, setTime] = useState("");
  const [deadline, setDeadline] = useState("");

  const [filterCategory, setFilterCategory] = useState("alla");
  const [sortBy, setSortBy] = useState("");

  const [showForm, setShowForm] = useState(false);

  /* ---------- LOCAL STORAGE ---------- */
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ---------- CRUD ---------- */
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

  const saveEditedTodo = (updatedTodo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setEditingTodo(null);
  };

  /* ---------- FILTER + SORT ---------- */
  let filteredTodos = [...todos];

  if (filterCategory !== "alla") {
    filteredTodos = filteredTodos.filter((t) => t.category === filterCategory);
  }

  if (sortBy === "deadline") {
    filteredTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  if (sortBy === "time") {
    filteredTodos.sort((a, b) => a.time - b.time);
  }

  if (sortBy === "status") {
    filteredTodos.sort((a, b) => a.done - b.done);
  }

  /* ---------- UI ---------- */
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
                <option value="">Ingen</option>
                <option value="deadline">Deadline</option>
                <option value="time">Tidsestimat</option>
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

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="hälsa">Hälsa</option>
              <option value="jobb">Jobb</option>
              <option value="nöje">Nöje</option>
              <option value="hushåll">Hushåll</option>
            </select>

            <button type="submit">Lägg till</button>
          </form>
        ) : (
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p>Inga todos ännu</p>
            ) : (
              filteredTodos.map((todo) =>
                editingTodo?.id === todo.id ? (
                  <EditTodos
                    key={todo.id}
                    todo={todo}
                    onSave={saveEditedTodo}
                    onCancel={() => setEditingTodo(null)}
                  />
                ) : (
                  <div
                    key={todo.id}
                    className="todo-card"
                    onClick={() => setEditingTodo(todo)}
                  >
                    <div className="todo-header">
                      <div>
                        <h4>{todo.title}</h4>
                        <p>{todo.description}</p>
                        <small>Deadline: {todo.deadline}</small>
                      </div>

                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={todo.done}
                          onChange={() => toggleDone(todo.id)}
                        />
                        <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-green-500"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full peer-checked:translate-x-5 transition-transform"></div>
                      </label>
                    </div>

                    <div className="todo-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTodo(todo.id);
                        }}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
