import { Check } from "lucide-react";

const TaskContainer = ({ task }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 mb-4 transition text-white select-none
        bg-[rgb(19,41,54)] border border-transparent hover:border-green-300 grid grid-cols-[2fr_1fr] min-h-40 max-w-[90%] cursor-pointer`}
    >
      {/* Vänster sida */}
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm italic">Kategori: {task.category}</p>
      </div>

      {/* Höger sida */}
      <div className="text-neutral-400 flex flex-col justify-between items-end gap-2">
        <p className="font-semibold">
          Deadline:{" "}
          {task.deadline
            ? new Date(task.deadline).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Ingen"}
        </p>
        <p className="font-semibold">Tidsestimat: {task.time} min</p>

        <div className="flex items-center text-white gap-2 mt-4">
          <p>Status:</p>
          <span
            className={`h-3 aspect-square rounded-full ring-2 ${
              task.done ? "ring-green-500" : "ring-neutral-500"
            } flex items-center justify-center overflow-hidden`}
          >
            {task.done ? (
              <Check className="w-3 h-3 bg-green-500 rounded-full" />
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
