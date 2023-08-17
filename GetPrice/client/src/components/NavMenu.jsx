// src/components/NavMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const NavMenu = () => {
  const token = localStorage.getItem("jwtToken");
  return (
    <nav className="navbar navbar-expand-sm bg-dark">
       <div className="container-fluid">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addproduct">Add Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/listproducts">List Product</Link>
        </li>
       <li className="nav-item">
       <Logout/>
         </li>
      </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
