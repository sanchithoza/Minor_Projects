import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addrequest(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    category: "",
    details: "",
    location: "",
    date: "",
    priority: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getmaintenanceregister", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data[0]);
          if (response.data[0].priority === "high") {
            document
              .getElementById("rdbHigh")
              .setAttribute("checked", "checked");
          } else if (response.data[0].priority === "medium") {
            document
              .getElementById("rdbMedium")
              .setAttribute("checked", "checked");
          } else if (response.data[0].priority === "low") {
            document
              .getElementById("rdbLow")
              .setAttribute("checked", "checked");
          }
          await response.data[0];
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
        });
    } else {
      setRecord({
        category: "",
        details: "",
        location: "",
        date: "",
        priority: "",
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
    e.preventDefault();
    /* const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    const fileupload = await axios.post(
      "http://localhost:7000/uploadcomplain",
      formData
    );
    console.log(fileupload);
    if (fileupload.data.code == 200) {
      console.log(fileName);*/
    let data = record;
    console.log(data);
    const response = await axios.post(
      "http://localhost:7000/Addmaintenanceregister",
      data
    );
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
    /* } else {
      alert("Unable to upload file .");
    }*/
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:7000/updatemaintenanceregister/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewrequest`);
      });
  };

  return (
    <>
      <div className="container-fluied">
        <div className="row bg-danger p-3">
          <div className="col-7 text-center text-white">
            <h1 className="display-6">New Maintenance Request</h1>
          </div>
          <div className="col-5 btn-group">
            <Link role="button" to="/" className="btn btn-warning btn-lg">
              Home
            </Link>
            <Link
              role="button"
              to="/Viewrequest"
              className="btn btn-warning btn-lg"
            >
              View Requests
            </Link>
          </div>
        </div>
      </div>
      <div className="container text-white text-center">
        <form
          encType="multipart/form-data"
          className="alert alert-danger bg-gradient p-4 m-auto"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <p>Maintenance Request Category</p>
            </div>
            <div className="col-lg-6">
              <input
                name="category"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.category}
                list="category"
                autoComplete="off"
              />
              <datalist id="category">
                <option value="Electrical" />
                <option value="Computer" />
                <option value="Furniture" />
                <option value="Plumbing" />
              </datalist>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <p>Detailed Discreption of work</p>
            </div>
            <div className="col-lg-6">
              <textarea
                name="details"
                rows="3"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.details}
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <p>Date of Request</p>
            </div>
            <div className="col-lg-6">
              <input
                onChange={handleChange}
                type="date"
                className="form-control"
                name="date"
                id="date"
                required
                value={record.date}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <p>Maintenance Required at (Location)</p>
            </div>
            <div className="col-lg-6">
              <textarea
                className="form-control"
                rows="2"
                name="location"
                onChange={handleChange}
                value={record.location}
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <p>Request Priority</p>
            </div>
            <div className="col-lg-5 d-flex">
              <div className="form-check">
                <input
                  onChange={handleChange}
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  value="high"
                  id="rdbHigh"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  High
                </label>
              </div>
              <div className="form-check mx-3">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  value="medium"
                  id="rdbMedium"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Medium
                </label>
              </div>
              <div className="form-check mx-3">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  value="low"
                  id="rdbLow"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Low
                </label>
              </div>
            </div>
          </div>

          {showAdd ? (
            <button type="submit" className="btn btn-danger">
              Submit Request
            </button>
          ) : (
            ""
          )}

          {showUpdate ? (
            <button onClick={handleUpdate} className="btn btn-warning">
              Update Request
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
export default Addrequest;
