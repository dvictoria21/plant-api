import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Plant API. All rights reserved.
    </div>
  );
}

export default Footer;
