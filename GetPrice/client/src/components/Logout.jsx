// src/components/Logout.js
import React from 'react';
import {useNavigate} from 'react-router-dom'
const Logout = () => {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('jwtToken');
    console.log('Logged out');
    navigate("/ ");
    // You can also perform additional cleanup tasks here
  };
  if(token){return (
    <button type="button" className="btn btn-link" onClick={handleLogout}>Logout</button>
  );
}
  
};

export default Logout;

