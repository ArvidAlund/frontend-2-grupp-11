import { useState } from "react"
import Login from "./login.jsx"
import Register from "./register.jsx";


const LoginLogout = () => {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className="w-full p-4 flex flex-col gap-4 justify-center items-center">
            <div>
                <p className="text-neutral-400">
                    <span 
                    className={`${showLogin ? "underline font-semibold  text-white select-none" : "cursor-pointer"} mr-2`} 
                    onClick={() => setShowLogin(true)}
                    >Logga in</span> 
                    / 
                    <span 
                    className={`${!showLogin ? "underline font-semibold text-white select-none" : "cursor-pointer"} ml-2`} 
                    onClick={() => setShowLogin(false)}
                    >Skapa konto</span>
                </p>
            </div>
            {showLogin ? (
                <Login />
            ) : (
                <Register />
            )}
        </div>
    );
}

export default LoginLogout;