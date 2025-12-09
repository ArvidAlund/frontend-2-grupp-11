import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../functions/userStatus";

const EventPlanner = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = isUserLoggedIn();
        if (user && user.id) {
          setUserId(user.id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      {userId ? (
        <p>Welcome back, user {userId}!</p>
      ) : (
        <p>Please log in to plan your events.</p>
      )}
    </div>
  );
};

export default EventPlanner;
