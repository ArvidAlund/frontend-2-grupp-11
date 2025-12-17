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

const getGenericHabits = () => {
    const habits = getHabits();
    return habits.filter(habit => habit.userId === null);
}

const createInitialHabits = () => {
    const initialHabits = [
        { id: 1, userId: null, title: 'Drink Water', description: 'Drink at least 8 glasses of water daily', repetitions: 8, priority: 'high', completed: false },
        { id: 2, userId: null, title: 'Exercise', description: 'Engage in physical activity for at least 30 minutes', repetitions: 5, priority: 'medium', completed: false },
        { id: 3, userId: null, title: 'Read a Book', description: 'Read for at least 20 minutes', repetitions: 3, priority: 'low', completed: false },
        { id: 4, userId: null, title: 'Meditate', description: 'Practice mindfulness meditation for 10 minutes', repetitions: 7, priority: 'medium', completed: false },
        { id: 5, userId: null, title: 'Sleep Early', description: 'Go to bed before 11 PM', repetitions: 6, priority: 'high', completed: false },
        { id: 6, userId: null, title: 'Healthy Eating', description: 'Eat at least 5 servings of fruits and vegetables', repetitions: 5, priority: 'high', completed: false },
        { id: 7, userId: null, title: 'Learn Something New', description: 'Spend 15 minutes learning a new skill or topic', repetitions: 4, priority: 'low', completed: false },
        { id: 8, userId: 1, title: 'Gratitude Journal', description: 'Write down 3 things you are grateful for', repetitions: 7, priority: 'low', completed: false },
        { id: 9, userId: 1, title: 'Walk the Dog', description: 'Take your dog for a walk', repetitions: 5, priority: 'medium', completed: false },
    ];
    localStorage.setItem('habits', JSON.stringify(initialHabits));
    return initialHabits;
}

const createHabit = ({userId, title, description, repetitions, priority}) => {
    const habits = getHabits();
    const newHabit = {
        id: habits.length > 0 ? Math.max(...habits.map(habit => habit.id)) + 1 : 1,
        userId,
        title,
        description,
        repetitions,
        priority,
        completed: false,
    };
    habits.push(newHabit);
    localStorage.setItem('habits', JSON.stringify(habits));
    return { success: true, habit: newHabit  };
}

const updateHabit = (userId, id, updatedFields) => {
    const habits = getHabits();
    const habitIndex = habits.findIndex(habit => habit.id === id && habit.userId === userId);
    if (habitIndex) {
        habits[habitIndex] = { ...habits[habitIndex], ...updatedFields };
        localStorage.setItem('habits', JSON.stringify(habits));
        return { success: true, habit: habits[habitIndex] };
    }
    return { success: false, message: 'Habit not found' };
}

const deleteHabit = (userId, id) => {
    const habits = getHabits();
    const updatedHabits = habits.filter(habit => !(habit.id === id && habit.userId === userId));
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    return { success: true };
}

const markHabitAsCompleted = (userId, id) => {
    return updateHabit(userId, id, { completed: true });
}

export { getHabits, createHabit, updateHabit, deleteHabit, markHabitAsCompleted, getHabistsByUser, getGenericHabits };