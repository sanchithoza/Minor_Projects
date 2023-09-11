import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MaintenanceTransactionForm() {
  const { id } = useParams();
  const initialFormData = {
    societyId: "",
    residentId: "",
    date: "",
    month: "",
    year: getCurrentYear(),
    amount: "",
    status: "overdue",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [societies, setSocieties] = useState([]);
  const [residents, setResidents] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }
  useEffect(() => {
    axios
      .get("/api/societies")
      .then((response) => {
        const fetchedSocieties = response.data;
        setSocieties(fetchedSocieties);
      })
      .catch((error) => {
        console.error("Error fetching societies:", error);
      });
    if (id) {
      axios
        .get(`/api/maintenance/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching society data:", error);
        });
    }
  }, [id]);
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "societyId") {
      console.log("inside");
      axios
        .get(`/api/residents/society/${value}`)
        .then((response) => {
          const fetchedResidents = response.data;
          setResidents(fetchedResidents);
        })
        .catch((error) => {
          console.error("Error fetching residents:", error);
        });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        // Update existing society
        const response = await axios.put(`/api/maintenance/${id}`, formData);
        alert("Maintenance record updated.");
        console.log("Maintenance updated:", response.data);
      } else {
        // Add new society
        const response = await axios.post("/api/maintenance", formData);
        alert("Maintenance record added.");
        console.log("Maintenance added:", response.data);
      }

      handleReset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="container">
      <h2>{id ? "Update Maintenance" : "Add New Maintenance"}</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="row">
          <div className="col-6">
            <label htmlFor="societyId" className="form-label">
              Select Society:
            </label>
            <select
              className="form-select"
              id="societyId"
              value={formData.societyId}
              onChange={handleInputChange}
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
            <label htmlFor="residentId" className="form-label">
              Select Resident:
            </label>
            <select
              className="form-select"
              id="residentId"
              value={formData.residentId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select a Resident
              </option>
              {residents.map((resident) => (
                <option key={resident._id} value={resident._id}>
                  {resident.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="date" className="form-label">
              Date of Payment:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="month" className="form-label">
              Select Month:
            </label>
            <select
              className="form-select"
              id="month"
              value={formData.month}
              onChange={handleInputChange}
              required
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="year" className="form-label">
              Year :
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              value={formData.year}
              onChange={handleInputChange}
              min={getCurrentYear() - 2}
              max={getCurrentYear() + 2}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="amount" className="form-label">
              Amount :
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min={0}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              className="form-select"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option key={"paid"} value={"paid"}>
                Paid
              </option>
              <option key={"overdue"} value={"overdue"}>
                Over Due
              </option>
            </select>
          </div>
          <div className="btn-group col-6 mt-3">
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Add"} Maintenance
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

export default MaintenanceTransactionForm;
