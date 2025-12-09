import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
          {user && (
            <>
              {user.role === "owner" && <Link to="/owner-dashboard">Owner</Link>}
              {user.role === "tenant" && <Link to="/tenant-dashboard">Tenant</Link>}
            </>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="auth-buttons-desktop">
          {user ? (
            <button onClick={logout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/auth" className="login-btn">Login</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            🏠 Home
          </Link>
          <Link to="/properties" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            🏘️ Properties
          </Link>
          <Link to="/contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            📞 Contact
          </Link>
          {user ? (
            <>
              {user.role === "owner" && (
                <Link to="/owner-dashboard" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
                  👑 Owner Dashboard
                </Link>
              )}
              {user.role === "tenant" && (
                <Link to="/tenant-dashboard" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
                  📋 Tenant Dashboard
                </Link>
              )}
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }} 
                className="logout-mobile"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="nav-item login-mobile" onClick={() => setMobileMenuOpen(false)}>
              🔐 Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
