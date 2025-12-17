import { updateHabit } from "../../lib/habits";
import SwitchButton from "../ui/switchButton";

const HabitContainer = ({ habit, onClick }) => {

  return (
    <div
      className={`rounded-xl shadow-md p-6 mb-4 transition text-white select-none cursor-pointer
        bg-[rgb(19,41,54)] border border-transparent hover:border-green-300 grid grid-cols-[2fr_1fr] min-h-40 max-w-[90%]`
      }
      onClick={() => onClick(habit)}
    >
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{habit.title}</h3>
        <p>{habit.description}</p>
      </div>

      <div className="text-neutral-500 flex flex-col justify-between items-end gap-2">
        <p>Prioritet: {habit.priority}</p>
        <p>Frekvens: {habit.repetitions}</p>
        <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          <label htmlFor="done">Klar</label>
          <SwitchButton start={habit.completed} onChange={(newValue) => {updateHabit(habit.userId, habit.id, { completed: newValue })}} />
        </div>
      </div>
    </div>
  );
};

export default HabitContainer;
