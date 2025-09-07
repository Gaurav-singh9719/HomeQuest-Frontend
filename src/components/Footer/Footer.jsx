import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} RentRover. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
