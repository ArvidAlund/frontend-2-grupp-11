import { useState } from "react";
import { deleteEvent, getEventsUserID, updateEvent } from "../../lib/events";
import { X } from "lucide-react";

const formatDateForInput = (date) => {
  const d = new Date(date);
  return d.toISOString().slice(0,16);
};


const EditEvent = ({event, onClose}) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = () => {
        const res = deleteEvent(event.id, event.userId);
        if (res.success){
            const user = event.userId;
            const updatedEvents = getEventsUserID(user);
            onClose(updatedEvents);
        } else {
            console.error("Failed to delete event:", res.message);
        }
    }

    const handleUpdate = (e) => {
    e.preventDefault();
    if (e.target.startDate.value >= e.target.endDate.value) {
        setError("Slutdatum måste vara efter startdatum.");
        return;
    }
    const updatedEvent = {
        id: event.id,
        userId: event.userId,
        title: e.target.title.value,
        startDate: new Date(e.target.startDate.value).toISOString(),
        endDate: new Date(e.target.endDate.value).toISOString(),
        description: e.target.description.value,
    };

    const res = updateEvent(updatedEvent);
    if (res.success) {
        onClose(res.events);
    } else {
        console.error("Failed to update event:", res.message);
    }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-neutral-900 p-10 rounded-lg text-white w-[90%]">
                <div className="flex items-center justify-between">
                <h2>Uppdatera event</h2>
                <X className="cursor-pointer" onClick={() => onClose()}/>
              </div>
              <form onSubmit={(e) => handleUpdate(e)} className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border">
                <div>
                  <label htmlFor="title">Titel:</label>
                  <input type="text" id="title" placeholder="Titel" required defaultValue={event.title} />
                </div>
                <div>
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea id="description" placeholder="Beskrivning" required defaultValue={event.description}></textarea>
                </div>
                <div className="flex md:flex-row! [&>div]:flex [&>div]:flex-col [&>div]:justify-start [&>div]:items-start justify-evenly items-center [&>div]:gap-2 gap-4 md:gap-0">
                  <div>
                    <label htmlFor="startDate">Startdatum:</label>
                    <input type="datetime-local" id="startDate" placeholder="Startdatum" required defaultValue={formatDateForInput(event.startDate)} />
                  </div>
                  <div>
                    <label htmlFor="endDate">Slutdatum:</label>
                    <input type="datetime-local" id="endDate" placeholder="Slutdatum" required defaultValue={formatDateForInput(event.endDate)} />
                  </div>
                </div>
                <button type="submit" className="bg-green-500 rounded-[50%]">Uppdatera</button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => onClose()} className="">Stäng</button>
                    <button className="bg-red-500! hover:bg-red-700!" onClick={() => setDeleteConfirm(true)}>Radera event</button>
                </div>
            </div>
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                    <div className="bg-neutral-800 p-10 rounded-lg text-white">
                        <h2>Är du säker på att du vill radera detta event?</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button onClick={() => setDeleteConfirm(false)} className="">Avbryt</button>
                            <button className="bg-red-500! hover:bg-red-700!" onClick={handleDelete}>Radera</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default EditEvent;