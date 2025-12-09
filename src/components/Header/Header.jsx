import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sticky navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="logo-link">
          🏡 <span>HomeQuest</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-links">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/properties" onClick={() => setIsMenuOpen(false)}>Properties</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        
        {user ? (
          <>
            {user.role === "owner" && (
              <Link to="/owner-dashboard" onClick={() => setIsMenuOpen(false)}>
                Owner Dashboard
              </Link>
            )}
            {user.role === "tenant" && (
              <Link to="/tenant-dashboard" onClick={() => setIsMenuOpen(false)}>
                Tenant Dashboard
              </Link>
            )}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="login-link">
            Login / Register
          </Link>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
          <Link to="/properties" onClick={() => setIsMenuOpen(false)}>🏘️ Properties</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>📞 Contact</Link>
          
          {user ? (
            <>
              {user.role === "owner" && (
                <Link to="/owner-dashboard" onClick={() => setIsMenuOpen(false)}>
                  👑 Owner Dashboard
                </Link>
              )}
              {user.role === "tenant" && (
                <Link to="/tenant-dashboard" onClick={() => setIsMenuOpen(false)}>
                  📋 Tenant Dashboard
                </Link>
              )}
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="mobile-logout-btn">
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="mobile-login-link">
              🔐 Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
