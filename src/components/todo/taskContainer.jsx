import SwitchButton from "../ui/switchButton";

const TaskContainer = ({ task, onClick }) => {

  const updateTask = async (newDoneStatus) => {
    try {
      const todos = localStorage.getItem("todos");
      const todosArray = todos ? JSON.parse(todos) : [];

      const updatedTodos = todosArray.map((t) =>
        t.id === task.id ? { ...t, done: newDoneStatus } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className={`rounded-xl shadow-md p-6 mb-4 transition text-white select-none
        bg-[rgb(19,41,54)] border border-transparent hover:border-green-300 grid grid-cols-[2fr_1fr] min-h-40 max-w-[90%] cursor-pointer`}
      onClick={() => onClick(task)}
    >
      {/* Vänster sida */}
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p>{task.description}</p>
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

        <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          <label htmlFor="done">Klar</label>
          <SwitchButton start={task.done} onChange={(newValue) => {updateTask(newValue)}} />
        </div>

      </div>
    </div>
  );
};

export default TaskContainer;
