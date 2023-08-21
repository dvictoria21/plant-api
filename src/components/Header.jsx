import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          Plant API
        </Link>
        <div className="links">
          <Link to="/families" className="link">
            Plant Families
          </Link>
          <Link to="/genera" className="link">
            Plant Genera
          </Link>
          <Link to="/species" className="link">
            Plant Species
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
