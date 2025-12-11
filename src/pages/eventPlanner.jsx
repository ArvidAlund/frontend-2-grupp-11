import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getEventsUserID, getGenericEvents } from "../lib/events";
import CreateEventModal from "../components/events/createEventsModal";
import EventContainer from "../components/events/eventContainer";

const EventPlanner = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
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
          <div className="flex justify-center my-4">
            <button onClick={() => setCreateEventModalOpen(true)}>Skapa event</button>
          </div>
          {events.length > 0 ? (
            <div className="grid grid-cols-2 gap-10 max-w-[800px] mx-auto">
              <div>
              <h3 className="mb-4 border-b-2 border-neutral-700">Kommande Events</h3>
              <ul>
                {events.filter(event => {
                  if (event.endDate >= new Date().toISOString()) {
                    return event;
                  }}).sort((a, b) => new Date(a.endDate) - new Date(b.endDate)).map(event => (
                  <EventContainer key={event.id} event={event} />
                ))}
              </ul>
              </div>
              <div>
              <h3 className="mb-4 border-b-2 border-neutral-700">Tidigare Events</h3>
              <ul>
                {events.filter(event => {
                  if (event.endDate < new Date().toISOString()) {
                    return event;
                  }}).sort((a, b) => new Date(b.endDate) - new Date(a.endDate)).map(event => (
                  <EventContainer event={event} key={event.id} />
                ))}
              </ul>
              </div>
            </div>
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
