const EventContainer = ({ event }) => {
  const isPast = new Date(event.endDate) < new Date();

  return (
    <li
      className={`rounded-lg shadow-md p-4 mb-4 transition text-black select-none cursor-pointer
        ${isPast ? "bg-neutral-100 text-neutral-500 hover:bg-neutral-200" : "bg-white hover:shadow-lg hover:bg-neutral-300"}`
      }
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full 
            ${isPast ? "bg-neutral-300 text-neutral-600" : "bg-green-100 text-green-700"}`
          }
        >
          {isPast ? "Avslutat" : "Kommande"}
        </span>
      </div>

      <p className="text-sm mb-3">{event.description}</p>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Från:</span>{" "}
          {new Date(event.startDate).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Till:</span>{" "}
          {new Date(event.endDate).toLocaleString()}
        </p>
      </div>
    </li>
  );
};

export default EventContainer;
