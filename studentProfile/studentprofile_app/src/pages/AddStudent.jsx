import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function AddStudent(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [record, setRecord] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    gender: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    country: "",
    course: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getStudentProfile", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data[0]);
          if (response.data[0].course === "BCA") {
            document
              .getElementById("rdbBca")
              .setAttribute("checked", "checked");
          } else {
            document
              .getElementById("rdbMca")
              .setAttribute("checked", "checked");
          }
          if (response.data[0].gender === "male") {
            document
              .getElementById("rdbMale")
              .setAttribute("checked", "checked");
          } else {
            document
              .getElementById("rdbFemale")
              .setAttribute("checked", "checked");
          }

          await response.data[0];
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
        });
    } else {
      setRecord({
        firstname: "",
        lastname: "",
        dob: "",
        email: "",
        gender: "",
        address: "",
        pincode: "",
        state: "",
        city: "",
        country: "",
        course: "",
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
  };
  const handleRdbClick = async (e) => {
    e.target.setAttribute("checked", "checked");
  };
  const handleSubmit = async (e) => {
    console.log(record);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:7000/addStudent",
      record
    );
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
  };
  const handleUpdate = async (e) => {
    axios
      .patch(`http://localhost:7000/updateStudentProfile/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Add New Student Profile</h1>
        </div>
      </div>
      <form className="bg-light p-4 m-auto" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>First Name</p>
          </div>
          <div className="col-lg-5">
            <input
              name="firstname"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="First Name"
              required
              value={record.firstname}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Last Name</p>
          </div>
          <div className="col-lg-5">
            <input
              name="lastname"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="Last Name"
              required
              value={record.lastname}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Date of Birth</p>
          </div>
          <div className="col-lg-5">
            <input
              onChange={handleChange}
              onBlur={handleChange}
              type="date"
              className="form-control"
              name="dob"
              id="dob"
              required
              value={record.dob}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Email id </p>
          </div>
          <div className="col-lg-5">
            <input
              name="email"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="Email id"
              required
              value={record.email}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Gender</p>
          </div>
          <div className="col-lg-5 d-flex">
            <div className="form-check">
              <input
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                id="rdbMale"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                id="rdbFemale"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Address</p>
          </div>
          <div className="col-lg-7">
            <textarea
              className="form-control"
              rows="5"
              name="address"
              onChange={handleChange}
              onBlur={handleChange}
              value={record.address}
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Pin code</p>
          </div>
          <div className="col-lg-5">
            <input
              name="pincode"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="Pin code"
              required
              value={record.pincode}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>State </p>
          </div>
          <div className="col-lg-5">
            <input
              name="state"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="State"
              required
              value={record.state}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>City </p>
          </div>
          <div className="col-lg-5">
            <input
              name="city"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="City"
              required
              value={record.city}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Country </p>
          </div>
          <div className="col-lg-5">
            <input
              name="country"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              placeholder="Country"
              required
              value={record.country}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Courses</p>
          </div>
          <div className="col-lg-5 d-flex">
            <div className="form-check">
              <input
                name="course"
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                id="rdbBca"
                value="BCA"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                BCA
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                name="course"
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                id="rdbMca"
                value="MCA"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                MCA
              </label>
            </div>
          </div>
        </div>
        {showAdd ? (
          <button type="submit" className="btn btn-primary">
            Add Student
          </button>
        ) : (
          ""
        )}

        {showUpdate ? (
          <button onClick={handleUpdate} className="btn btn-warning">
            Update Student
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
export default AddStudent;
