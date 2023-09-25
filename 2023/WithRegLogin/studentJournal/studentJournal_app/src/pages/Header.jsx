import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./../App.css";
function Header(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setLogin(false)
    console.log(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("username")) {
      console.log("loggedin");
      setLogin(true);
    } else {
      console.log("notlogged in");
      setLogin(false);
      navigate("./login");
    }
  }, []);
  const handleLogout = (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    navigate("./login");
  }
  return (
    <>
      <div className="container-fluid bg-white fixed-top">
        <div className="row">
          <div className="col-6">
            <h1>Student Journal Tracker</h1>
          </div>
          <div className="col-6 pt-2">
            <nav className="nav  justify-content-center">
              <Link
                to="/"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/AddJournal"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                Accept Submission
              </Link>
              <Link
                to="/JournalDetails"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                View Submissions
              </Link>

              {/* <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="container container-top-margin">
        <Outlet />
      </div>
      <div className="fixed-bottom bg-white p-1">
        <div className="row">
          <div className="col-10">
            <h6 className="p-1">
              This Portal lets you maintain Students Journal Submission Records.
            </h6>
          </div>
         <div className="col-2">
         {(login)?(<button className="btn btn-danger" onClick={handleLogout}>Logout</button>):("")}
            
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
