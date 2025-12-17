import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getHabistsByUser, getHabits } from "../lib/habits";
import { Plus } from "lucide-react";
import HabitContainer from "../components/habits/habitContainer";

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const Habits = () => {
    const [habits, setHabits] = useState([]);
    const [openHabitModal, setOpenHabitModal] = useState(false);
    const [updatingHabit, setUpdatingHabit] = useState(null);
    const [userId, setUserId] = useState(); 

    useEffect(() => {
        const getHabitsFromStorage = () => {
            const user = isUserLoggedIn();
            if (user.valid) {
                setUserId(user.id);
                const habits = getHabistsByUser(user.id);
                setHabits(habits);
            } else {
                const habits = getHabits();
                setHabits(habits);
            }
        };
        getHabitsFromStorage();
    }, []);

    const sortedHabits = [...habits].sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
    <section className="grid md:grid-cols-[1fr_2fr] gap-20 mt-10 h-full">
      {/* SIDOPANEL */}
      <aside>
        <div className="flex flex-col items-start gap-4 p-4">
          <button
            className="bg-[#004a75] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex w-full items-center justify-center"
            onClick={() => setOpenHabitModal(true)}
          >
            <Plus className="inline-block mr-2" />
            <p>Skapa</p>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex flex-col gap-4 justify-center items-center md:block">
        {!openHabitModal && updatingHabit === null && sortedHabits.length > 0 && (
          sortedHabits.map((habit) => (
            <HabitContainer
              key={habit.id}
              habit={habit}
              onClick={() => setUpdatingHabit(habit)}
            />
          ))
        )}
        {openHabitModal && (
          <CreateHabitModal
            onClose={(updatedHabits) => {
              setOpenHabitModal(false);
              if (updatedHabits) {
                setHabits(updatedHabits);
              }
            }}
          />
        )}
        {updatingHabit !== null && (
          <EditHabitModal
            habit={updatingHabit}
            onClose={(updatedHabits) => {
              setUpdatingHabit(null);
              if (updatedHabits) {
                setHabits(updatedHabits);
                } 
            }}
          />
        )}
      </main>
    </section>
  );
}

export default Habits;