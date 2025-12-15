import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { CalendarDays, CircleCheck, CircleUser, ClipboardPenLine, ListChecks } from "lucide-react";
import LoginRegister from "../components/loginRegister/loginRegister";

const Home = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = () => {
      const res = isUserLoggedIn();
      if (res.valid) {
        setUserId(res.id);
      }
      setLoading(false);
    };
    checkUserStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-[94vh] flex justify-center md:items-center">
      {!userId && (
        <div className="md:grid md:grid-cols-2 md:w-2/3 aspect-video md:bg-neutral-900 md:p-5 md:rounded-lg items-center w-[95vw] md:max-w-200 md:max-h-300">
          <div className="relative *:text-blue-800 *:absolute w-full md:h-full h-1/3">
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
      )}
    </section>
  )
};

export default Home