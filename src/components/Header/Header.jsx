import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          🏡 <span>HomeQuest</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <>
              {user.role === "owner" && <Link to="/owner-dashboard">Owner</Link>}
              {user.role === "tenant" && <Link to="/tenant-dashboard">Tenant</Link>}
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="login-btn">Login</Link>
          )}
        </nav>

        {/* Mobile Nav - VERTICAL STACK */}
        <nav className="nav-mobile">
          <Link to="/" className="nav-item">🏠 Home</Link>
          <Link to="/properties" className="nav-item">🏘️ Properties</Link>
          <Link to="/contact" className="nav-item">📞 Contact</Link>
          {user ? (
            <>
              {user.role === "owner" && (
                <Link to="/owner-dashboard" className="nav-item">👑 Owner</Link>
              )}
              {user.role === "tenant" && (
                <Link to="/tenant-dashboard" className="nav-item">📋 Tenant</Link>
              )}
              <button onClick={logout} className="logout-mobile">🚪 Logout</button>
            </>
          ) : (
            <Link to="/auth" className="nav-item login-mobile">🔐 Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
