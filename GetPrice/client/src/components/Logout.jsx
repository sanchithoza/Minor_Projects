// src/components/Logout.js
import React from "react";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
const Logout = () => {
  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem("jwtToken");
    console.log("Logged out");
    setTimeout(() => {
      navigate("/ ");
    }, 2000);
    
    // You can also perform additional cleanup tasks here
  };
  if (token) {
    var decoded = jwt_decode(token);
    console.log(decoded);
    return (
      <div className="">
        <span className="text-white"> Welcome : {decoded.userName}</span>
        <button type="button" className="btn btn-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }
};

export default Logout;
