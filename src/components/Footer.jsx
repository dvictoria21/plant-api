import React from 'react';
import './Footer.css'; // Import the Footer.css file

function Footer() {
  return (
    <div className="footer"> {/* Use className to apply styles */}
      &copy; {new Date().getFullYear()} Plant API. All rights reserved.
    </div>
  );
}

export default Footer;
