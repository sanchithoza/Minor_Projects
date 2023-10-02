import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const handleLogout = (event)=>{
    event.preventDefault();
    sessionStorage.clear();
    navigate('/');
  }
  return (
    <>
      <header>
        <h1>Hostel Management System</h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {(sessionStorage.getItem("userrole") === "admin")?<><li>
              <Link
                to="/AddViewRoomDetails"
                aria-current="page"
              >
                Room Details
              </Link>
            </li>
            <li>
            <Link
              to="/ViewBooking"
              aria-current="page"
            >
              Booking Details
            </Link>
          </li></>:""}
            {(sessionStorage.getItem("username"))?(<><li>
              <Link
                to="/NewBooking"
                aria-current="page"
              >
                Book Now
              </Link>
            </li>
            
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li></>):(<>
            <li>
              <Link
                to="/Register"
                
                aria-current="page"
              >
                Registration
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                
                aria-current="page"
              >
                Login
              </Link>
            </li></>)}
            
          </ul>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}
