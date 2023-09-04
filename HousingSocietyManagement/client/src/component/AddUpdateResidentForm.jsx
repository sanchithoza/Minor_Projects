import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResidentFormComponent() {
  const { id } = useParams();
  const [societyId, setSocietyId] = useState("");
  const [name, setName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [societies, setSocieties] = useState([]);

  
  useEffect(() => {
    if(localStorage.userSocietyId){
           setSocietyId(localStorage.userSocietyId)
      }
    axios
      .get((localStorage.userSocietyId ? `/api/societies/${localStorage.userSocietyId}` : "/api/societies"))
      .then((response) => {
        const fetchedSocieties = response.data;
        setSocieties(fetchedSocieties);
      })
      .catch((error) => {
        console.error("Error fetching societies:", error);
      });
    if (id) {
      axios
        .get(`/api/residents/${id}`)
        .then((response) => {
          const residentData = response.data;
          setSocietyId(residentData.societyId);
          setName(residentData.name);
          setUnitNumber(residentData.unitNumber);
          setContactNumber(residentData.contactNumber || "");
          setEmail(residentData.email || "");
          setMoveInDate(residentData.moveInDate);
          setIsOwner(residentData.isOwner);
        })
        .catch((error) => {
          console.error("Error fetching resident data:", error);
        });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const residentData = {
      societyId,
      name,
      unitNumber,
      contactNumber,
      email,
      moveInDate,
      isOwner,
    };

    try {
      if (id) {
        // Update existing resident
        const response = await axios.put(`/api/residents/${id}`, residentData);
        console.log("Resident updated:", response.data);
        alert("Resident updated.");
      } else {
        // Add new resident
        const response = await axios.post("/api/residents", residentData);
        console.log("Resident added:", response.data);
        alert("Resident added.");
      }
      handleReset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleReset = () => {
    setSocietyId("");
    setName("");
    setUnitNumber("");
    setContactNumber("");
    setEmail("");
    setMoveInDate("");
    setIsOwner("");
  };

  return (
    <div className="container">
      <h2>{id ? "Update Resident" : "Add New Resident"}</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="row">
        {/* Society ID (if applicable, otherwise remove this field) */}
        <div className="col-6">
          <label htmlFor="societyId" className="form-label">
            Select Society:
          </label>
          <select
            className="form-select"
            id="societyId"
            value={societyId}
            onChange={(e) => setSocietyId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a society
            </option>
            {societies.map((society) => (
              <option key={society._id} value={society._id}>
                {society.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="col-6">
          <label htmlFor="unitNumber" className="form-label">
            Unit Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="unitNumber"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            required
          />
        </div>

        <div className="col-6">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="col-6">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-6">
          <label htmlFor="moveInDate" className="form-label">
            Move-In Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="moveInDate"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            required
          />
        </div>

        <div className="form-check p-4 col-6">
          <input
            type="checkbox"
            className="form-check-input"
            id="isOwner"
            checked={isOwner}
            onChange={(e) => setIsOwner(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isOwner">
            Is Owner
          </label>
        </div>
        <div className="col-6"></div>
        <div className="btn-group col-6">
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Add"} Resident
          </button>
          <button type="reset" className="btn btn-warning">
            Reset
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default ResidentFormComponent;
