import { useState } from "react";
import { createEvent, getEventsUserID } from "../lib/events";


const CreateEventModal = ({onClose, userId}) => {
    const [error, setError] = useState(null);

    const tryCreateEvent = (event) => {
        event.preventDefault();
        if (event.target.startDate.value >= event.target.endDate.value) {
            setError("Slutdatum måste vara efter startdatum.");
            return;
        }
        const res = createEvent(
            userId,
            event.target.title.value,
            event.target.startDate.value,
            event.target.endDate.value,
            event.target.description.value
        );
        if (res.success) {
            const updatedEvents = getEventsUserID(userId);
            onClose(updatedEvents);
        }
    };
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-neutral-800 p-10 rounded-lg text-white">
              <h2>Skapa nytt event</h2>
              <form onSubmit={(e) => tryCreateEvent(e)} className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border">
                <div>
                  <label htmlFor="title">Titel:</label>
                  <input type="text" id="title" placeholder="Titel" required/>
                </div>
                <div>
                  <label htmlFor="startDate">Startdatum:</label>
                  <input type="datetime-local" id="startDate" placeholder="Startdatum" required/>
                </div>
                <div>
                  <label htmlFor="endDate">Slutdatum:</label>
                  <input type="datetime-local" id="endDate" placeholder="Slutdatum" required/>
                </div>
                <div>
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea id="description" placeholder="Beskrivning" required></textarea>
                </div>
                <button type="submit">Skapa</button>
              </form>
              {error && <p className="text-red-500 my-4">{error}</p>}
              <button onClick={() => onClose()}>Stäng</button>
            </div>
          </div>
  );
}

export default CreateEventModal;