import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/home",
          {
            withCredentials: true,
          },
        );
        setUser(response.data.user);
        console.log(response.data.user);

      } catch (requestError) {
        setError(requestError.response?.data?.message || "Session expired");
        navigate("/login", { replace: true });
      }
    };

    loadUser();

  }, [navigate]);

  

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      toast.success("Logout successful");
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Logout failed");
    } finally {
      navigate("/login", { replace: true });
    }
  };

  if (error || !user) {
    return null;
  }

  return (
    <main className="home-page">
      <nav className="home-nav">
        <a className="brand-mark" href="/home">
          Ideal Creation
        </a>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Log out
        </button>
      </nav>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Your workspace</p>
          <h1>Good to see you, {user.name || "there"}.</h1>
          <p className="hero-text">
            Your account is ready. Pick up where you left off and keep your next
            idea moving.
          </p>
        </div>
        <div className="profile-panel">
          <span className="profile-label">Signed in as</span>
          <strong>{user.email}</strong>
          <span className="profile-status">Account active</span>
        </div>
      </section>

      <section className="home-grid" aria-label="Workspace overview">
        <article className="home-stat home-stat-featured">
          <span className="stat-number">01</span>
          <h2>One place for your next move</h2>
          <p>Keep your projects, contacts, and ideas close at hand.</p>
        </article>
        <article className="home-stat">
          <span className="stat-kicker">Profile</span>
          <h2>Account verified</h2>
          <p>Your email and account access are confirmed.</p>
        </article>
        <article className="home-stat">
          <span className="stat-kicker">Status</span>
          <h2>Ready to build</h2>
          <p>Everything is set for a productive session.</p>
        </article>
      </section>
    </main>
  );
}

export default Home;
