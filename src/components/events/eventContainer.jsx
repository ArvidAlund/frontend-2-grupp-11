import { Check } from "lucide-react";

const EventContainer = ({ event, onClick, type }) => {

  return (
    <li
      className={`rounded-xl shadow-md p-6 mb-4 transition text-white select-none cursor-pointer
        bg-[rgb(19,41,54)] border border-transparent hover:border-green-300 grid grid-cols-[2fr_1fr] min-h-40 max-w-[90%]`
      }
      onClick={() => onClick(event)}
    >
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p>{event.description}</p>
      </div>

      <div className="text-neutral-500 flex flex-col justify-between items-end gap-2">
        <p className="font-semibold">Datum: {new Date(event.startDate).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })} - <br /> {new Date(event.endDate).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        <p className="font-semibold">Tid: {new Date(event.startDate).toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })}</p>
        <p className="font-semibold">Plats:</p>

        <div className="flex items-center text-white gap-2 mt-4">
          <p>Status:</p>
          <span className={`h-3 aspect-square rounded-full ring-2 ${type === "coming" ? "ring-green-500" : "ring-neutral-500"} flex items-center justify-center overflow-hidden`}>
            {type === "coming" ? <Check className="w-3 h-3 bg-green-500 rounded-full" /> : null}
          </span>
        </div>
      </div>
    </li>
  );
};

export default EventContainer;
