import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserbyId, isUserLoggedIn, logOutUser } from "../lib/auth";


const Header = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState();

    useEffect(() => {
        const checkUserStatus = () => {
            const res = isUserLoggedIn();
            if (res.valid){
                setUserId(res.id);
                const user = getUserbyId(res ? res.id : null);
                setUser(user);
            }

        }
        checkUserStatus();
    }, []);
  return (
    <header className="h-12 min-w-full flex items-center justify-between gap-8 bg-neutral-900 px-4 text-lg">
        <nav className="flex gap-6">
            <Link to="/">Hem</Link>
            <Link to="/todos">Att-göra</Link>
            <Link to="/habits">Vanor</Link>
            <Link to="/event-planner">Event Planner</Link>
        </nav>

        {userId ? (
            <div className="flex items-center justify-between gap-4 w-1/4">
                <span>Hej: {user ? user.username : "Användare"}</span>
                <button onClick={() => {
                    logOutUser()
                    setUserId(null);
                    window.location.reload();
                    }} className="bg-transparent! border-0! hover:border-0!">Logga ut</button>
            </div>
        ) : (
            <Link to="/login">Logga in</Link>
        )}
    </header>
  );
}

export default Header;