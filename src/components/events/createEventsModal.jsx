import { useState } from "react";
import { createEvent, getEventsUserID } from "../../lib/events";
import { X } from "lucide-react";


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
    <div className="flex items-center justify-center">
            <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%]">
              <div className="flex items-center justify-between">
                <h2>Skapa nytt event</h2>
                <X className="cursor-pointer" onClick={() => onClose()}/>
              </div>
              <form onSubmit={(e) => tryCreateEvent(e)} className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border">
                <div>
                  <label htmlFor="title">Titel:</label>
                  <input type="text" id="title" placeholder="Titel" required/>
                </div>
                <div>
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea id="description" placeholder="Beskrivning" required></textarea>
                </div>
                <div className="flex md:flex-row! [&>div]:flex [&>div]:flex-col [&>div]:justify-start [&>div]:items-start justify-evenly items-center [&>div]:gap-2 gap-4 md:gap-0">
                  <div>
                    <label htmlFor="startDate">Startdatum:</label>
                    <input type="datetime-local" id="startDate" placeholder="Startdatum" required/>
                  </div>
                  <div>
                    <label htmlFor="endDate">Slutdatum:</label>
                    <input type="datetime-local" id="endDate" placeholder="Slutdatum" required/>
                  </div>
                </div>
                <button type="submit" className="bg-neutral-600 rounded-[50%] md:ml-[80%]">Lägg till</button>
              </form>
              {error && <p className="text-red-500 my-4">{error}</p>}
            </div>
    </div>
  );
}

export default CreateEventModal;