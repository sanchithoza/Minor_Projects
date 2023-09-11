import React from "react";

import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

function Dashboard() {
  const { isLoggedIn } = useAuth();
  return (
    (isLoggedIn) ? <div className="container">
    <h1>Welcome to Housing Society Management App</h1>
    <p>This is the main page of your app.</p>
     
  </div> : <LoginForm /> 
  );
}

export default Dashboard;
