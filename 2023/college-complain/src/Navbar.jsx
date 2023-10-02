import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");
  console.log(user);
  const handleLogout = async () => {
    await sessionStorage.clear();
    await navigate("/HomePage");
  };
  return (
    <div>
      <div className="navbarr">
        {user ? (
          <Link
            //to="/HomePage"
            className="nav-link text-black "
            aria-current="page"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link to={"/LoginForm"} className="btn-get-started">
            Login
          </Link>
        )}

        <Link
          to="/ContactUs"
          className="nav-link text-black "
          aria-current="page"
        >
          Contact Us
        </Link>
        <Link
          to="/AboutUs"
          className="nav-link text-black "
          aria-current="page"
        >
          About Us
        </Link>
        {user ? (
          <Link
            to="/CompForm"
            className="nav-link text-black "
            aria-current="page"
          >
            CompForm
          </Link>
        ) : (
          ""
        )}

        {user === "admin" ? (
          <>
          <Link
            to="/ViewComp"
            className="nav-link text-black "
            aria-current="page"
          >
            ViewComp
          </Link>
          <Link
          to="/ViewUsers"
          className="nav-link text-black "
          aria-current="page"
        >
          ViewUsers
        </Link>
        </>
        ) : (
          ""
        )}
        <Link
          to="/HomePage"
          className="nav-link text-black "
          aria-current="page"
        >
          Home
        </Link>
      </div>
      <div className="container container-top-margin">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
