import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserbyId, isUserLoggedIn, logOutUser } from "../lib/auth";
import { CircleCheck, CircleUser, Menu } from "lucide-react";

const Header = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState();
    const [menuOpen, setMenuOpen] = useState(false);

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

            <div className="flex items-center gap-2 col-start-2">
                <CircleCheck />
                <h4 className="text-lg font-semibold">ProTivity</h4>
            </div>

            <nav className={`${menuOpen ? "absolute top-14 left-0 w-full bg-neutral-800 text-white flex flex-col items-start px-4 py-2 gap-2 md:hidden z-50" : "hidden"} md:flex! md:relative! md:top-0! gap-6 font-semibold text-lg md:gap-8 md:col-auto md:flex-row md:items-center md:justify-center bg-transparent!`}>
                <Link to="/todos">Att göra</Link>
                <Link to="/habits">Vanor</Link>
                <Link to="/event-planner">Event Planner</Link>
            </nav>

            <div className="hidden md:flex items-center gap-4 min-w-20">
                {userId ? (
                <>
                    <span>Hej: {user?.username || "Användare"}</span>
                    <button
                    onClick={() => {
                    logOutUser();
                    setUserId(null);
                    window.location.reload();
                    }}
                    className="hover:underline"
                    >
                    Logga ut
                    </button>
                </>
                ) : (
                <Link to="/login">Logga in</Link>
                )}
            </div>

            <div className="md:hidden col-span-3 flex justify-end">
                {userId ? (
                <CircleUser />
                ) : null}
            </div>

            {/* {menuOpen && (
                <div className="absolute top-14 left-0 w-full bg-neutral-800 text-white flex flex-col items-start px-4 py-2 gap-2 md:hidden z-50">
                    <Link to="/todos" onClick={() => setMenuOpen(false)}>Att göra</Link>
                    <Link to="/habits" onClick={() => setMenuOpen(false)}>Vanor</Link>
                    <Link to="/event-planner" onClick={() => setMenuOpen(false)}>Event Planner</Link>
                    {userId ? (
                        <>
                        <span>Hej: {user?.username || "Användare"}</span>
                        <button
                        onClick={() => {
                            logOutUser();
                            setUserId(null);
                            window.location.reload();
                            }}
                        className="hover:underline"
                        >
                        Logga ut
                        </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Logga in</Link>
                    )}
                </div>
            )} */}
        </header>
    );
};

export default Header;
