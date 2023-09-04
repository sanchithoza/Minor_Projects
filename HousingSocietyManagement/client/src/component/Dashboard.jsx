import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Dashboard() {
  return (
    <div className="container">
      <h1>Welcome to Housing Society Management App</h1>
      <p>This is the main page of your app.</p>
      {/* <Link to="/add-resident" className="btn btn-primary">Add New Resident</Link> */}
      {(!localStorage.userRole) ? <LoginForm /> : ""}
    </div>
  );
}

export default Dashboard;
