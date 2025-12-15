import { useState } from "react";
import { Plus } from "lucide-react";
import CreateTodoModal from "../components/todo/createTodoModal";
import TaskContainer from "../components/todo/taskContainer";

// exempeldata att använda som startlista
const initialTodos = [
  {
    id: 1,
    title: "Morgonträning",
    description: "Spring 3 km eller gör ett kort styrkepass hemma.",
    category: "hälsa",
    time: 30,
    deadline: "2025-12-20",
    done: false,
  },
  {
    id: 2,
    title: "Handla mat",
    description: "Köp ingredienser till middagen: pasta, tomater, ost.",
    category: "hushåll",
    time: 45,
    deadline: "2025-12-16",
    done: false,
  },
  {
    id: 3,
    title: "Skicka rapport",
    description: "Sammanställ veckorapporten och maila till chefen.",
    category: "jobb",
    time: 60,
    deadline: "2025-12-17",
    done: false,
  },
  {
    id: 4,
    title: "Filmkväll",
    description: "Se en ny film med vänner.",
    category: "nöje",
    time: 120,
    deadline: "2025-12-19",
    done: false,
  },
];


export default function Todos() {
  const [todos, setTodos] = useState(initialTodos);
  const [filterStatus, setFilterStatus] = useState("alla");
  const [filterCategory, setFilterCategory] = useState("alla");
  const [sortBy, setSortBy] = useState("");
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [updatingTodoId, setUpdatingTodoId] = useState(false);

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
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === "time") return a.time - b.time;
      if (sortBy === "status") return Number(a.done) - Number(b.done);
      return 0;
    });

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <section className="grid md:grid-cols-[1fr_2fr] gap-20 mt-10">
      {/* SIDOPANEL */}
      <aside>
        <div className="flex flex-col items-start gap-4 p-4">
          <button
            className="bg-[#004a75] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex w-full items-center justify-center"
            onClick={() => setOpenTodoModal(true)}
          >
            <Plus className="inline-block mr-2" />
            <p>Skapa</p>
          </button>

          {/* FILTER */}
          <div className="w-full">
            <label className="block mb-2 font-semibold">Filtrera</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-md border p-2 *:bg-black"
            >
              <option value="alla">Alla</option>
              <option value="gjorda">Slutförda</option>
              <option value="ej">Ej slutförda</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-md border p-2 mt-2 *:bg-black"
            >
              <option value="alla">Alla kategorier</option>
              <option value="hälsa">Hälsa</option>
              <option value="nöje">Nöje</option>
              <option value="hushåll">Hushåll</option>
              <option value="jobb">Jobb</option>
            </select>
          </div>

          {/* SORTERING */}
          <div className="w-full">
            <label className="block mb-2 font-semibold">Sortera</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border p-2 *:bg-black"
            >
              <option value="">Ingen sortering</option>
              <option value="deadline">Deadline</option>
              <option value="time">Tidsestimat</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex flex-col gap-4">
        {!openTodoModal && !updatingTodoId && filteredTodos.length > 0 && (
          filteredTodos.map((todo) => (
            <TaskContainer
              key={todo.id}
              task={todo}
              onClick={() => toggleDone(todo.id)}
              type={todo.done ? "past" : "coming"}
            />
          ))
        )}
        {openTodoModal && (
          <CreateTodoModal
            onClose={(updatedTodos) => {
              setOpenTodoModal(false);
              if (updatedTodos) {
                setTodos(updatedTodos);
              }
            }}
          />
        )}
      </main>
    </section>
  );
}
