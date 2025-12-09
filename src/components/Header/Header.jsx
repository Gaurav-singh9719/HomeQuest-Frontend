import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">

        <Link to="/" className="logo">
          🏡 <span>HomeQuest</span>
        </Link>

        <nav className="nav-desktop">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {user && (
            <>
              {user.role === "owner" && <NavLink to="/owner-dashboard">Owner</NavLink>}
              {user.role === "tenant" && <NavLink to="/tenant-dashboard">Tenant</NavLink>}
            </>
          )}
        </nav>

        <div className="auth-buttons-desktop">
          {user ? (
            <button className="logout-btn" onClick={logout}>Logout</button>
          ) : (
            <Link to="/auth" className="login-register-btn">Login / Register</Link>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <div className={`backdrop ${mobileMenuOpen ? "show" : ""}`}
          onClick={() => setMobileMenuOpen(false)}></div>

        <nav className={`nav-mobile ${mobileMenuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>🏠 Home</NavLink>
          <NavLink to="/properties" onClick={() => setMobileMenuOpen(false)}>🏘️ Properties</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>📞 Contact</NavLink>

          {user ? (
            <>
              {user.role === "owner" &&
                <NavLink to="/owner-dashboard" onClick={() => setMobileMenuOpen(false)}>
                  👑 Owner Dashboard
                </NavLink>
              }
              {user.role === "tenant" &&
                <NavLink to="/tenant-dashboard" onClick={() => setMobileMenuOpen(false)}>
                  📋 Tenant Dashboard
                </NavLink>
              }
              <button className="logout-mobile"
                onClick={() => { logout(); setMobileMenuOpen(false); }}>
                🚪 Logout
              </button>
            </>
          ) : (
            <NavLink 
              to="/auth"
              className="login-register-mobile"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔐 Login / Register
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
