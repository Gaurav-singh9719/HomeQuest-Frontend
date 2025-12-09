// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        shadow ? "bg-white/90 shadow-sm backdrop-blur" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-blue-600 hover:opacity-80"
        >
          Radhika SolarTech
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[15px] transition hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Login/Register Button */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm
                       hover:bg-blue-600 hover:text-white transition-all"
          >
            Login / Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-gray-700 text-lg transition hover:text-blue-600"
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-2 px-6 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm
                       hover:bg-blue-600 hover:text-white transition-all"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
