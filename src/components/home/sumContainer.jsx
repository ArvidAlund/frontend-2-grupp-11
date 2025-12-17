import { Link } from "react-router-dom";

const SumContainer = ({ titel, link, list, type }) => {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-center mb-2">{titel}</h3>
        <Link to={link} className="text-blue-400 hover:underline">
          Se alla
        </Link>
      </div>
      <ul>
        {list.length > 0 ? (
          list.map((item, index) => (
            <li
              key={index}
              className="border-b border-neutral-700 py-2 grid grid-cols-2 items-center gap-2"
            >
              <p className="truncate">{item.title}</p>
              {type && (
                <p className="text-sm text-neutral-400 text-end">
                  {type === "habit"
                    ? `repetitioner: ${item.repetitions}`
                    : `datum: ${new Date(item.startDate).toLocaleDateString("sv-SE", { year: '2-digit', month: 'short', day: 'numeric' })}`}
                </p>
              )}
            </li>
          ))
        ) : (
          <li className="text-neutral-500 italic">
            Inga {titel.toLowerCase().split(" ")[0]} att visa.
          </li>
        )}
      </ul>
    </div>
  );
};

export default SumContainer;
