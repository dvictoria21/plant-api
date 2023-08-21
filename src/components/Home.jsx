import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the Home.css file

export default function Home() {
  return (
    <div className="container"> {/* Use className to apply styles */}
      <h1 className="title">Welcome to the Plant API</h1>
      <p className="subtitle">
        Explore information about plant families, genera, and species with our API.
        Click on the links below to get started!
      </p>
      <div className="links">
        <Link to="/families" className="link">
          View Plant Families
        </Link>
        <Link to="/genera" className="link">
          View Plant Genera
        </Link>
        <Link to="/species" className="link">
          View Plant Species
        </Link>
      </div>
    </div>
  );
}
