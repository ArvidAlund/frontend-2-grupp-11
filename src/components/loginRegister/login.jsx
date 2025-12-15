import { Link } from "react-router-dom";
import { loginUser } from "../../lib/auth";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = loginUser({ username, password });

    if (result.loggedIn) {
      window.location.href = "/";
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
      <div className="w-full">
        <form className="space-y-5 [&>div>input]:text-neutral-400" onSubmit={tryLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Användarnamn
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:border-transparent focus:ring-green-400 focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Skriv ditt användarnamn"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:border-transparent focus:ring-green-400 focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Skriv ditt lösenord"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-10"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
  );
};

export default Login;
