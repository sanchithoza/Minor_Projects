// src/components/NavBar.js (or any other component)
import React from 'react';
import Logout from './Logout';

const NavBar = () => {
  return (
    <nav>
      {/* Other navigation links */}
      <Logout />
    </nav>
  );
};

export default NavBar;
