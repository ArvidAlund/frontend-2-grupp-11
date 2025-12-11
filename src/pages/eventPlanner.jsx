import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getEventsUserID, getGenericEvents } from "../lib/events";
import CreateEventModal from "../components/events/createEventsModal";
import EventContainer from "../components/events/eventContainer";
import EditEvent from "../components/events/editEvent";

const EventPlanner = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("coming");
  const [updateEvent, setUpdateEvent] = useState(null);

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
          <div className="flex justify-center gap-8 py-4">
            <button onClick={() => setCreateEventModalOpen(true)}>Skapa event</button>
            <select name="sort" id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="ml-4 *:bg-black">
              <option value="coming">Kommande</option>
              <option value="past">Tidigare</option>
            </select>
          </div>
          {events.length > 0 ? (
            <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
              <h3 className="border-b-2 border-neutral-700">{sortOption === "coming" ? "Kommande Events" : "Tidigare Events"}</h3>
              {sortOption && (
              <ul>
                {events.filter(event => {
                  const now = new Date();
                  const start = new Date(event.startDate);
                  const end = new Date(event.endDate);

                  if (sortOption === "coming") {
                    return start >= now;
                  } else if (sortOption === "past") {
                    return end < now;
                  }
                  return false;
                }).map(event => (
                  <EventContainer key={event.id} event={event} onClick={() => setUpdateEvent(event)} type={sortOption} />
                ))}
              </ul>
              )}
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
        {updateEvent !== null && (
          <EditEvent event={updateEvent} onClose={(updatedEvents) => {
            setUpdateEvent(null);
            if (updatedEvents) {
              setEvents(updatedEvents);
            }
          }} />
        )}
    </section>
  );
};

export default EventPlanner;
