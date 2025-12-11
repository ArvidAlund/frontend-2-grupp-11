import { useState } from "react";
import { deleteEvent, updateEvent } from "../../lib/events";

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
            onClose(res.events);
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-neutral-800 p-10 rounded-lg text-white">
                <h2>Redigera event: {event.title}</h2>
                <form className="flex flex-col gap-8 my-4 *:flex *:flex-col [&>div]:text-start [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:border" onSubmit={(e) => handleUpdate(e)}>
                    <div>
                        <label htmlFor="title">Titel:</label>
                        <input type="text" id="title" defaultValue={event.title} required/>
                    </div>
                    <div>
                        <label htmlFor="startDate">Startdatum:</label>
                        <input type="datetime-local" id="startDate" defaultValue={formatDateForInput(event.startDate)} required/>
                    </div>
                    <div>
                        <label htmlFor="endDate">Slutdatum:</label>
                        <input type="datetime-local" id="endDate" defaultValue={formatDateForInput(event.endDate)} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Beskrivning:</label>
                        <textarea id="description" defaultValue={event.description} required></textarea>
                    </div>
                    <button type="submit" className="bg-green-500! hover:bg-green-700! text-white font-bold py-2 px-4 rounded">Spara ändringar</button>
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