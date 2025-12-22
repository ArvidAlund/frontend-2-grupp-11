import { useState, useEffect } from "react";
import { isUserLoggedIn, getUserbyId } from "../lib/auth";
import { CalendarDays, CircleCheck, CircleUser, ClipboardPenLine, ListChecks } from "lucide-react";
import LoginRegister from "../components/loginRegister/loginRegister";
import SumContainer from "../components/home/sumContainer";
import { getHabitsSortedByRepetitions } from "../lib/habits";
import { getEventsUpcoming } from "../lib/events";

const Home = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [habitsList, setHabitsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    const checkUserStatus = () => {
      const res = isUserLoggedIn();
      if (res.valid) {
        setUserId(res.id);
        const user = getUserbyId(res.id);
        setUsername(user.username);
      }
      setLoading(false);
    };
    const getQuote = async () => {
      try {
        const response = await fetch("http://103.177.249.170:5000/quote");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuote(data.text);
        setAuthor(data.author.name);
      } catch (err) {
        console.error("Fetch failed:", err);
      }

    };

    const fetchTodos = () => {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const filteredTodos = todos.filter(todo => !todo.done).splice(0, 3);
      setTodosList(filteredTodos);
    };

    checkUserStatus();
    getQuote();
    fetchTodos();
  }, []);

  useEffect(() => {
    const habitRes = getHabitsSortedByRepetitions(userId);
    if (habitRes.success) {
      setHabitsList(habitRes.habits);
      console.log(habitRes.habits);
    }
    
    const eventRes = getEventsUpcoming(userId);
    if (eventRes.success) {
      setEventsList(eventRes.events);
      console.log(eventRes.events);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-[94vh] flex flex-col justify-center items-center">
      {!userId ? (
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 md:w-2/3 md:aspect-video md:bg-neutral-900 md:p-5 md:rounded-lg items-center w-[95vw] md:max-w-200 md:max-h-300">
          <div className="relative *:text-blue-800 *:absolute w-full h-full">
            <CircleUser className="top-1/2 left-1/2 -translate-1/2 scale-400" />
            <CircleCheck className="left-2/3 top-10 scale-250 -rotate-45"/>
            <ListChecks className="left-10 top-30 scale-300 rotate-45"/>
            <CalendarDays className="left-10 top-2/3 scale-150 rotate-12"/>
            <ClipboardPenLine className="right-10 bottom-10 scale-300 rotate-12"/>
          </div>
          <div className="bg-neutral-800 rounded-md w-full h-full">
            <LoginRegister />
          </div>
        </div>
      ) : (
          <div className="md:max-w-1/2 max-w-[95vw] text-center">
            <h1>Välkommen {username}!</h1>
            <p className="mt-4 italic text-neutral-400">"{quote}"</p>
            <p className="text-neutral-500 mt-2">- {author}</p>
          </div>
      )}
      <div className="grid md:grid-cols-3 mt-10 gap-6 md:w-2/3 w-[95vw]">
        <SumContainer titel="Todo" link="/todos" list={todosList} type="todo"/>
        <SumContainer titel="Vanor" link="/habits" list={habitsList} type="habit"/>
        <SumContainer titel="Event Planner" link="/event-planner" list={eventsList} type="event"/>
      </div>
    </section>
  )
};

export default Home