import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserbyId, isUserLoggedIn, logOutUser } from "../lib/auth";
import { CircleCheck, CircleUser, Menu } from "lucide-react";

const Header = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const checkUserStatus = () => {
        const res = isUserLoggedIn();
        if (res.valid) {
            setUserId(res.id);
            const user = getUserbyId(res.id);
            setUser(user);
        }
        };
        checkUserStatus();
    }, []);

    return (
        <header className="text-white px-4 py-2 grid grid-cols-3 md:flex items-center justify-between">

            <button
            className="md:hidden bg-transparent! border-0! p-0! focus:outline-none!"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            >
                <Menu />
            </button>

            <Link to="/" className="flex items-center gap-2 col-start-2">
                <CircleCheck />
                <h4 className="text-lg font-semibold">ProTivity</h4>
            </Link>

            <nav className={`${menuOpen ? "absolute top-14 left-0 w-full bg-[#242424] text-white flex flex-col items-start px-4 py-2 gap-2 md:hidden z-50" : "hidden"} md:flex! md:relative! md:top-0! gap-6 font-semibold text-lg md:gap-8 md:col-auto md:flex-row md:items-center md:justify-center md:bg-transparent!`}>
                <Link to="/todos">Att göra</Link>
                <Link to="/habits">Vanor</Link>
                <Link to="/event-planner">Event Planner</Link>
            </nav>

            <div className="col-start-3 flex justify-end">
                {userId ? (
                    <div className="flex gap-2 relative" onClick={() => setOpen(!open)}>
                    <p className="w-20 truncate select-none cursor-pointer">{user?.username || "Användare"}</p>
                    <CircleUser />
                    {open && (
                        <div className="absolute top-8 right-0 bg-neutral-800 p-2 rounded-md flex flex-col gap-2 transition duration-200 w-full items-center">
                        <button
                            className="font-normal text-sm text-red-500 p-0!"
                            onClick={() => {
                            logOutUser();
                            window.location.reload();
                            }}
                        >
                            Logga ut
                        </button>
                        </div>
                    )}
                    </div>
                ) : <Link to="/login" className=" text-white px-4 py-2 rounded-md transition">Logga in</Link>}
            </div>

        </header>
    );
};

export default Header;
