import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>BookHaven</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && <Link to="/favorites">Favorites</Link>}

        {/* If user is logged in, show red Logout button */}
        {user ? (
          <button className="nav-button nav-logout" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-button nav-login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
