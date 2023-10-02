import React, {  useEffect } from "react";
import {  useNavigate, Link } from "react-router-dom";
function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if(!sessionStorage.getItem("username")){
      navigate("/login")
    }
  },[])
  const handleLogout = (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    navigate("/login")
  }
  return (
    <>
      <div className="container-fluied">
        <div className="row bg-dark text-white">
          <div className="col-12 text-center ">
            <h1 className="display-1">Student complain Management</h1>
          </div>
        </div>
        {(sessionStorage.getItem("username"))?(
            <div className="row p-1">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          ):("")}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center bg-secondary p-3">
            <h3 className="display-4">
              To Add a complain
              <br /> Click the Button Bellow
            </h3>
            <Link
              role="button"
              to="/Addcomplain"
              className="btn btn-dark text-white btn-lg"
            >
              Add complain
            </Link>
          </div>
          <hr />
          <div className="col-12 text-center  bg-white p-3">
            <h3 className="display-4 text-dark">
              To View complains
              <br /> Click this Button
            </h3>
            <Link
              role="button"
              to="/Viewcomplain"
              className="btn btn-dark text-white btn-lg"
            >
              View Submitted complains
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
