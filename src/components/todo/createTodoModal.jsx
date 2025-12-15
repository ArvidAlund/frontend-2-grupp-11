import { useState } from "react";
import { X } from "lucide-react";

const CreateTodoModal = ({ onClose, }) => {
  const [error, setError] = useState(null);

  const tryCreateTodo = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const time = e.target.time.value;
    const deadline = e.target.deadline.value;

    if (!title || !deadline) {
      setError("Titel och deadline måste anges.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      description,
      category,
      time: Number(time),
      deadline,
      done: false,
    };

    onClose(newTodo); // skicka tillbaka den nya todo
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%]">
        <div className="flex items-center justify-between">
          <h2>Skapa ny todo</h2>
          <X className="cursor-pointer" onClick={() => onClose()} />
        </div>

        <form
          onSubmit={tryCreateTodo}
          className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border"
        >
          <div>
            <label htmlFor="title">Titel:</label>
            <input type="text" id="title" placeholder="Titel" required />
          </div>

          <div>
            <label htmlFor="description">Beskrivning:</label>
            <textarea id="description" placeholder="Beskrivning"></textarea>
          </div>

          <div>
            <label htmlFor="category">Kategori:</label>
            <select id="category" defaultValue="hälsa" className="*:bg-black">
              <option value="hälsa">Hälsa</option>
              <option value="nöje">Nöje</option>
              <option value="hushåll">Hushåll</option>
              <option value="jobb">Jobb</option>
            </select>
          </div>

          <div>
            <label htmlFor="time">Tidsestimat (min):</label>
            <input type="number" id="time" placeholder="Tidsestimat" required />
          </div>

          <div>
            <label htmlFor="deadline">Deadline:</label>
            <input type="date" id="deadline" required />
          </div>

          <button
            type="submit"
            className="bg-neutral-600 rounded-[50%] md:ml-[80%] px-4 py-2"
          >
            Lägg till
          </button>
        </form>

        {error && <p className="text-red-500 my-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateTodoModal;
