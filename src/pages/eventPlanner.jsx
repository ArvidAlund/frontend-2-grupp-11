import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getEventsUserID, getGenericEvents, createEvent } from "../lib/events";
import CreateEventModal from "../components/createEventsModal";

const EventPlanner = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("coming");
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = isUserLoggedIn();
        if (user && user.id) {
          setUserId(user.id);
        } else {
          setUserId(null);
        }
        let res
        if (!user || !user.id) {
          res = getGenericEvents();
        } else {
          res = getEventsUserID(user.id);
        }
        setEvents(res);
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <section className="text-center">
      <h1 className="mb-10 text-center font-bold">Event Planner</h1>
        <div>
          <h2>{userId ? "Dina Events" : "Generella Events"}</h2>
          <div className="flex justify-between my-4">
            <button onClick={() => setCreateEventModalOpen(true)}>Skapa event</button>
            <select name="filter" id="filter" className="*:bg-black" onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="coming">Kommande</option>
              <option value="past">Tidigare</option>
            </select>
          </div>
          {events.length > 0 ? (
            <ul>
              {events.sort((a, b) => {
                if (filter === "past") {
                  return new Date(a.startDate) - new Date(b.startDate);
                } else if (filter === "coming") {
                  return new Date(b.startDate) - new Date(a.startDate);
                }
                return 0;
              }).map((event) => (
                <li key={event.id} className="border-b py-2">
                  <h3 className="mb-2">{event.title}</h3>
                  <p>{event.description}</p>
                  <p>
                    Från: {new Date(event.startDate).toLocaleString()} <br /> Till: {new Date(event.endDate).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Inga events hittade</p>
          )}
        </div>
        {createEventModalOpen && (
          <CreateEventModal onClose={(updatedEvents) => {
            setCreateEventModalOpen(false);
            if (updatedEvents) {
              setEvents(updatedEvents);
            }
          }} userId={userId} />
        )}
    </section>
  );
};

export default EventPlanner;
