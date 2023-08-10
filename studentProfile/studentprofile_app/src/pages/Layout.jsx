import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = (props) => {
  const [islogin, setIsLogin] = useState("Login");

  return (
    <>
      <div className="container-fluied">
        <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              {props.name}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Student Profile
                  </a>
                  <ul
                    className="dropdown-menu bg-secondary"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/AddStudent" className="nav-link">
                        Add Student
                      </Link>
                    </li>
                    <li>
                      <Link to="/StudentDetails" className="nav-link">
                        Student Details
                      </Link>
                    </li>
                  </ul>
                </li>
                <li></li>
                <li></li>
                <li>
                  <Link to="/Register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet className="pageOutlet" />
    </>
  );
};

export default Layout;
