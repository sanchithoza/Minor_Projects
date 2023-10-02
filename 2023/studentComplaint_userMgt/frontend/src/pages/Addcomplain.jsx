import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addcomplain(props) {
  const location = useLocation();
  const navigate = useNavigate();
   let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [record, setRecord] = useState({
    title: "",
    date: "",
    detail: "",
    priority: "",
    course: "",
  });

  useEffect(() => {
    if(!sessionStorage.getItem("username")){
      navigate("/login")
    }
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post(`http://localhost:7000/getStudentcomplain/${id}`)
        .then(async (response) => {
          console.log(response);
          setRecord(response.data);
          if (response.data.priority === "high") {
            document
              .getElementById("rdbHigh")
              .setAttribute("checked", "checked");
          } else if (response.data.year === "medium") {
            document
              .getElementById("rdbMedium")
              .setAttribute("checked", "checked");
          } else if (response.data.year === "low") {
            document
              .getElementById("rdbLow")
              .setAttribute("checked", "checked");
          }
          await response.data;
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
        }).catch((error)=>{
          console.log(error);
        });
    } else {
      setRecord({
        title: "",
        date: "",
        detail: "",
        priority: "",
        course: "",
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
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
      "http://localhost:7000/AddStudentcomplain",
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
      .patch(`http://localhost:7000/updateStudentcomplain/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewcomplain`);
      });
  };
  const handleLogout = (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    navigate("/login")
  }
  return (
    <>
      <div className="container-fluied">
        <div className="row bg-dark p-3">
          <div className="col-7 text-center text-white">
            <h1 className="display-6">New complain</h1>
          </div>
          <div className="col-5 btn-group">
            <Link role="button" to="/" className="btn btn-secondary btn-lg">
              Home
            </Link>
            <Link
              role="button"
              to="/Viewcomplain"
              className="btn btn-secondary btn-lg"
            >
              Review complains
            </Link>
          </div>
        </div>
        {(sessionStorage.getItem("username"))?(
            <div className="row p-1">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          ):("")}
      </div>
      <div className="container text-white">
        <form
          encType="multipart/form-data"
          className="bg-secondary bg-gradient p-4 m-auto"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3">
            <div className="col-lg-2">
              <p>Select Your Course</p>
            </div>
            <div className="col-lg-5">
              <input
                name="course"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.course}
                list="courses"
                autoComplete="off"
              />
              <datalist id="courses">
                <option value="BCA" />
                <option value="BBA" />
                <option value="BCOM" />
                <option value="BSC" />
              </datalist>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <p>complain Title</p>
            </div>
            <div className="col-lg-5">
              <input
                name="title"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.title}
              />
            </div>
            <div className="col-lg-4"></div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-2">
              <p>Date of complain</p>
            </div>
            <div className="col-lg-5">
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
            <div className="col-lg-2">
              <p>Details of complain</p>
            </div>
            <div className="col-lg-7">
              <textarea
                className="form-control"
                rows="8"
                name="detail"
                onChange={handleChange}
                onBlur={handleChange}
                value={record.detail}
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <p>complain Priority</p>
            </div>
            <div className="col-lg-5 d-flex">
              <div className="form-check">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
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
            <button type="submit" className="btn btn-dark">
              Submit complain
            </button>
          ) : (
            ""
          )}

          {showUpdate ? (
            <button onClick={handleUpdate} className="btn btn-warning">
              Update Submission
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
export default Addcomplain;
