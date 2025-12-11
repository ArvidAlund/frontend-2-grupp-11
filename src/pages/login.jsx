import { Link } from "react-router-dom";
import { loginUser } from "../lib/auth";
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
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Logga in
        </h2>
        <form className="space-y-5" onSubmit={tryLogin}>
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black ${
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Skriv ditt lösenord"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Har du inget konto?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Skapa konto
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
