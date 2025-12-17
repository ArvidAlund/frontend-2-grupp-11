import { useState } from "react";
import { X } from "lucide-react";
import { updateHabit, deleteHabit } from "../../lib/habits";

const EditHabit = ({ habit, onClose }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    const res = deleteHabit(habit.userId, habit.id);
    if (res.success) {
      onClose();
    } else {
      console.error("Failed to delete event:", res.message);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updates = {
      title: e.target.title.value,
      description: e.target.description.value,
      repetitions: parseInt(e.target.repetitions.value, 10),
      priority: e.target.priority.value,
    };

    const res = updateHabit(
      habit.userId,
      habit.id,
      updates
    );
    if (res.success) {
        onClose();
    } else {
      console.error("Failed to update event:", res.message);
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%]">
        <div className="flex items-center justify-between">
          <h2>Redigera habit</h2>
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
              defaultValue={habit.title}
            />
          </div>

          <div>
            <label htmlFor="description">Beskrivning:</label>
            <textarea
              id="description"
              placeholder="Beskrivning"
              required
              defaultValue={habit.description}
            ></textarea>
          </div>

          <div>
            <label htmlFor="repetitions">Antal repetitioner:</label>
            <input
              type="number"
              id="repetitions"
              min="1"
              defaultValue={habit.repetitions}
            />
          </div>

          <div>
            <label htmlFor="priority">Prioritet:</label>
            <select id="priority" defaultValue={habit.priority} className="*:bg-black">
              <option value="high">Hög</option>
              <option value="medium">Medium</option>
              <option value="low">Låg</option>
            </select>
          </div>

          <button type="submit" className="bg-green-500 rounded-full px-4 py-2">
            Uppdatera
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button onClick={() => onClose()}>Stäng</button>
          <button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => setDeleteConfirm(true)}
          >
            Radera event
          </button>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-neutral-800 p-10 rounded-lg text-white">
            <h2>Är du säker på att du vill radera detta event?</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button onClick={() => setDeleteConfirm(false)}>Avbryt</button>
              <button
                className="bg-red-500 hover:bg-red-700"
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

export default EditHabit;
