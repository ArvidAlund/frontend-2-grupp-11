import { useState } from "react";
import { X } from "lucide-react";
import SwitchButton from "../ui/switchButton";

const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10); // yyyy-MM-dd för <input type="date">
};

const EditTodoModal = ({ todo, onClose, onUpdate, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    onDelete(todo.id);
    onClose();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTodo = {
      ...todo,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      time: Number(e.target.time.value),
      deadline: e.target.deadline.value,
      done: e.target.done.checked,
    };

    if (!updatedTodo.title || !updatedTodo.deadline) {
      setError("Titel och deadline måste anges.");
      return;
    }

    onUpdate(updatedTodo);
    onClose();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%] max-w-lg">
        <div className="flex items-center justify-between">
          <h2>Uppdatera todo</h2>
          <X className="cursor-pointer" onClick={() => onClose()} />
        </div>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border"
        >
          <div>
            <label htmlFor="title">Titel:</label>
            <input
              type="text"
              id="title"
              placeholder="Titel"
              required
              defaultValue={todo.title}
            />
          </div>
          <div>
            <label htmlFor="description">Beskrivning:</label>
            <textarea
              id="description"
              placeholder="Beskrivning"
              defaultValue={todo.description}
            ></textarea>
          </div>
          <div>
            <label htmlFor="category">Kategori:</label>
            <select id="category" defaultValue={todo.category}>
              <option value="hälsa">Hälsa</option>
              <option value="nöje">Nöje</option>
              <option value="hushåll">Hushåll</option>
              <option value="jobb">Jobb</option>
            </select>
          </div>
          <div>
            <label htmlFor="time">Tidsestimat (min):</label>
            <input
              type="number"
              id="time"
              placeholder="Tidsestimat"
              defaultValue={todo.time}
            />
          </div>
          <div>
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              required
              defaultValue={formatDateForInput(todo.deadline)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 rounded-[50%] px-4 py-2 self-end"
          >
            Uppdatera
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button onClick={() => onClose()} className="">
            Stäng
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
            onClick={() => setDeleteConfirm(true)}
          >
            Radera todo
          </button>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-neutral-800 p-10 rounded-lg text-white">
            <h2>Är du säker på att du vill radera denna todo?</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 rounded-md bg-neutral-600"
              >
                Avbryt
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Radera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodoModal;
