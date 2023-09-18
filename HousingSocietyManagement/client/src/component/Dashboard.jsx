import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const userRole = localStorage.getItem("userRole")
   let residentId = localStorage.getItem("userResidentId");
  const showReport = async (id)=>{
    navigate(`/resident-maintenance-report/${id}`);
  }
  return (
    (isLoggedIn) ? <div className="container">
    <h1>Welcome to Housing Society Management App</h1>
    <p>This is the main page of your app.</p>
     {(userRole === "resident") ?  <button
        className="btn btn-success btn-sm"
        onClick={() => showReport(residentId)}
        title = "View Details"
      >
        <i className="fa fa-table"></i>
      </button>:""}
  </div> : <LoginForm /> 
  );
}

export default Dashboard;
