import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../lib/auth";
import { getEventsUserID, getGenericEvents } from "../lib/events";
import CreateEventModal from "../components/events/createEventsModal";
import EventContainer from "../components/events/eventContainer";
import EditEvent from "../components/events/editEvent";
import { Plus } from "lucide-react";

const EventPlanner = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("coming");
  const [updateEvent, setUpdateEvent] = useState(false);

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
    <section className="grid md:grid-cols-[1fr_2fr] gap-20 mt-10">
      <aside>
        <div className="flex flex-col items-start gap-4 p-4">
          <button
            className="bg-[#004a75] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex w-full items-center justify-center"
            onClick={() => setCreateEventModalOpen(true)}
          >
            <Plus className="inline-block mr-2" />
            <p>Skapa</p>
          </button>
          <div>
            <label htmlFor="sort" className="block mb-2 text-white font-semibold">
              Filtrera
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-md *:bg-black"
            >
              <option value="coming">Kommande</option>
              <option value="past">Tidigare</option>
            </select>
          </div>
        </div>
      </aside>
      <main className="flex flex-col justify-center items-center md:block">
        {!createEventModalOpen && !updateEvent && events.length !== 0 && (
          <>
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
          </>
        )}
        {createEventModalOpen && (
          <CreateEventModal
            onClose={(updatedEvents) => {
            setCreateEventModalOpen(false);
            if (updatedEvents) {
              setEvents(updatedEvents);
            }
          }}
          />
        )}
        {updateEvent && (
          <EditEvent
            event={updateEvent}
            onClose={(updatedEvents) => {
            setUpdateEvent(null);
            if (updatedEvents) {
              setEvents(updatedEvents);
            }
          }}
          />
        )}
      </main>
    </section>
  );
};

export default EventPlanner;
