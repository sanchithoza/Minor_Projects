import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const userRole = sessionStorage.getItem("userRole")
   let residentId = sessionStorage.getItem("userResidentId");
  const [lifetimeCollection,setLifetimeCollection] = useState(0);
  const [yearCollection,setYearCollection] = useState(0); 
  const [monthCollection,setMonthCollection] = useState(0);
  const showReport = async (id)=>{
    navigate(`/resident-maintenance-report/${id}`);
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const societyId = sessionStorage.getItem("userSocietyId");
      const response = await axios.get(`/api/maintenance/society/totalCollection/${societyId}`);
      console.log(response.data);
      setLifetimeCollection(response.data);
     // setFilteredResidents(response.data);
    
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
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
