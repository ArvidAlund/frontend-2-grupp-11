import { useState, useEffect, useMemo } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getGenericHabits, getHabistsByUser } from "../lib/habits";
import { Plus } from "lucide-react";
import HabitContainer from "../components/habits/habitContainer";
import EditHabit from "../components/habits/editHabit";
import CreateHabitModal from "../components/habits/createHabitModal";

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
                const habits = getGenericHabits();
                setHabits(habits);
            }
        };
        getHabitsFromStorage();
    }, []);

    const sortedHabits = useMemo(() => {
        if (!Array.isArray(habits)) return [];
        return [...habits].sort((a, b) => {
            const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (diff !== 0) return diff;
            return a.id - b.id;
        });
    }, [habits]);

    const updateHabits = () => {
        if (userId) {
            const updatedHabits = getHabistsByUser(userId);
            setHabits(updatedHabits);
        } else {
            const updatedHabits = getGenericHabits();
            setHabits(updatedHabits);
        }
    }



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
            userId={userId}
            onClose={() => {
              setOpenHabitModal(false);
              updateHabits();
            }}  
          />
        )}

        {updatingHabit !== null && (
          <EditHabit
            habit={updatingHabit}
            onClose={() => {
              setUpdatingHabit(null);
              updateHabits();
            }}  
          />
        )}
      </main>
    </section>
  );
}

export default Habits;