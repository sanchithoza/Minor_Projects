import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddUpdateSocietyForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/societies/${id}`)
        .then((response) => {
          const societyData = response.data;
          setName(societyData.name);
          setAddress(societyData.address);
          setTotalUnits(societyData.totalUnits);
          setAmenities(societyData.amenities);
        })
        .catch((error) => {
          console.error("Error fetching society data:", error);
        });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const societyData = {
      name,
      address,
      totalUnits,
      amenities,
      username,
      password,
    };

    try {
      if (id) {
        // Update existing society
        const response = await axios.put(`/api/societies/${id}`, societyData);
        console.log("Society updated:", response.data);
        alert("Society Updated.");
      } else {
        // Add new society
        const response = await axios.post("/api/societies", societyData);
        console.log("Society added:", response.data);
        alert("Society Added.");
      }
      handleReset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleReset = () => {
    setName("");
    setAddress("");
    setTotalUnits("");
    setAmenities("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <h2>{id ? "Update Society" : "Add New Society"}</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="row">
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
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="totalUnits" className="form-label">
              Total Units:
            </label>
            <input
              type="number"
              className="form-control"
              id="totalUnits"
              value={totalUnits}
              onChange={(e) => setTotalUnits(e.target.value)}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="amenities" className="form-label">
              Amenities:
            </label>
            <input
              type="text"
              className="form-control"
              id="amenities"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value.split(", "))}
            />
            <small className="form-text text-muted">
              Separate amenities with commas.
            </small>
          </div>
          <hr />
          <div className="col-6 p-2">
            <label htmlFor="username" className="form-label">
              User Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-6 p-2">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="btn-group col-4">
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Add"} Society
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

export default AddUpdateSocietyForm;
