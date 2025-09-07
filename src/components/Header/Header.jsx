import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>🏡 HomeQuest</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/contact">Contact</Link>

        {user ? (
          <>
            {user.role === "owner" && (
              <Link to="/owner-dashboard">Owner Dashboard</Link>
            )}
            {user.role === "tenant" && (
              <Link to="/tenant-dashboard">Tenant Dashboard</Link>
            )}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
