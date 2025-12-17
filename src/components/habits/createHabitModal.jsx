// Struktur:
// { id, userId, title, description, repetitions, priority, completed }

import { useState } from "react";
import { createHabit } from "../../lib/habits";
import { X } from "lucide-react";

const CreateHabitModal = ({ onClose, userId }) => {
  const [error, setError] = useState(null);

  const tryCreateHabit = (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const repetitions = parseInt(e.target.repetitions.value, 10);
    const priority = e.target.priority.value;

    if (!title || !description) {
      setError("Titel och beskrivning måste fyllas i.");
      return;
    }

    const res = createHabit({
      userId,
      title,
      description,
      repetitions,
      priority,
    });

    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Misslyckades med att skapa habit.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%]">
        <div className="flex items-center justify-between">
          <h2>Skapa ny habit</h2>
          <X className="cursor-pointer" onClick={() => onClose()} />
        </div>

        <form
          onSubmit={tryCreateHabit}
          className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border"
        >
          <div>
            <label htmlFor="title">Titel:</label>
            <input type="text" id="title" placeholder="Titel" required />
          </div>

          <div>
            <label htmlFor="description">Beskrivning:</label>
            <textarea id="description" placeholder="Beskrivning" required></textarea>
          </div>

          <div>
            <label htmlFor="repetitions">Antal repetitioner:</label>
            <input type="number" id="repetitions" min="1" defaultValue="1" />
          </div>

          <div>
            <label htmlFor="priority">Prioritet:</label>
            <select id="priority" defaultValue="medium" className="*:bg-black">
              <option value="high">Hög</option>
              <option value="medium">Medium</option>
              <option value="low">Låg</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-neutral-600 rounded-full px-4 py-2 md:ml-[80%]"
          >
            Lägg till
          </button>
        </form>

        {error && <p className="text-red-500 my-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateHabitModal;
