const getHabits = () => {
    const habits = localStorage.getItem('habits');
    if (!habits) {
        const initialHabits = createInitialHabits();
        localStorage.setItem('habits', JSON.stringify(initialHabits));
        return initialHabits;
    }
    return habits ? JSON.parse(habits) : [];
}

const getHabistsByUser = (userId) => {
    const habits = getHabits();
    return habits.filter(habit => habit.userId === userId);
}

const createInitialHabits = () => {
    const initialHabits = [
        { id: 1, userId: null, title: 'Drink Water', repetitions: 8, priority: 'high', completed: false },
        { id: 2, userId: null, title: 'Exercise', repetitions: 5, priority: 'medium', completed: false },
        { id: 3, userId: null, title: 'Read a Book', repetitions: 3, priority: 'low', completed: false },
    ];
    localStorage.setItem('habits', JSON.stringify(initialHabits));
    return initialHabits;
}

const createHabit = (userId, title, repetitions, priority) => {
    const habits = getHabits();
    const newHabit = {
        id: Date.now(),
        userId,
        title,
        repetitions,
        priority,
        completed: false,
    };
    habits.push(newHabit);
    localStorage.setItem('habits', JSON.stringify(habits));
    return newHabit;
}

const updateHabit = (userId, id, updatedFields) => {
    const habits = getHabits();
    const habitIndex = habits.findIndex(habit => habit.id === id && habit.userId === userId);
    if (habitIndex !== -1) {
        habits[habitIndex] = { ...habits[habitIndex], ...updatedFields };
        localStorage.setItem('habits', JSON.stringify(habits));
        return habits[habitIndex];
    }
    return null;
}

const deleteHabit = (userId, id) => {
    const habits = getHabits();
    const updatedHabits = habits.filter(habit => !(habit.id === id && habit.userId === userId));
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    return updatedHabits;
}

const markHabitAsCompleted = (userId, id) => {
    return updateHabit(userId, id, { completed: true });
}

export { getHabits, createHabit, updateHabit, deleteHabit, markHabitAsCompleted, getHabistsByUser };