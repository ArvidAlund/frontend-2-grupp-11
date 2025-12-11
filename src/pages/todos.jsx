import { useState } from "react";

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

  // -----------------------------
  // CREATE
  // -----------------------------
  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title,
      description,
      category,
      time: Number(time),
      deadline,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
    setCategory("hälsa");
    setTime("");
    setDeadline("");
  };

  // -----------------------------
  // UPDATE / DELETE / TOGGLE
  // -----------------------------
  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
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

  // -----------------------------
  // FILTER & SORT
  // -----------------------------
  const filteredTodos = todos
    .filter((t) => {
      if (filterStatus === "gjorda") return t.done;
      if (filterStatus === "ej") return !t.done;
      return true;
    })
    .filter((t) =>
      filterCategory !== "alla" ? t.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortBy === "deadline")
        return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "time") return a.time - b.time;
      if (sortBy === "status") return a.done - b.done;
      return 0;
    });

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="hälsa">Hälsa</option>
          <option value="nöje">Nöje</option>
          <option value="hushåll">Hushåll</option>
          <option value="jobb">Jobb</option>
        </select>
        <input
          type="number"
          placeholder="Tidsestimat (min)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Lägg till</button>
      </form>

      <h3>Filtrera</h3>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="alla">Alla</option>
        <option value="gjorda">Slutförda</option>
        <option value="ej">Ej slutförda</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="alla">Alla kategorier</option>
        <option value="hälsa">Hälsa</option>
        <option value="nöje">Nöje</option>
        <option value="hushåll">Hushåll</option>
        <option value="jobb">Jobb</option>
      </select>

      <h3>Sortera</h3>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Ingen sortering</option>
        <option value="deadline">Deadline</option>
        <option value="time">Tidsestimat</option>
        <option value="status">Status</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> ({todo.category})<br />
            {todo.description}
            <br />
            Tidsestimat: {todo.time} min
            <br />
            Deadline: {todo.deadline}
            <br />
            Status: {todo.done ? "✔ Klar" : "❌ Ej klar"}
            <br />
            <button onClick={() => toggleDone(todo.id)}>
              Markera som klar
            </button>
            <button onClick={() => editTodo(todo.id)}>Redigera</button>
            <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
