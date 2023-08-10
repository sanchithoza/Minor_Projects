import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addjournal(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    studentname: "",
    year: "",
    dateofsubmission: "",
    upload: "",
    remark: "",
    course: "",
    subject: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getStudentjournal", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data[0]);
          if (response.data[0].year === "firstyear") {
            document.getElementById("rdbFy").setAttribute("checked", "checked");
          } else if (response.data[0].year === "secondyear") {
            document.getElementById("rdbSy").setAttribute("checked", "checked");
          } else {
            document.getElementById("rdbTy").setAttribute("checked", "checked");
          }
          await response.data[0];
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
          document
            .getElementById("journalUpload")
            .setAttribute("disabled", "disabled");
        });
    } else {
      setRecord({
        studentname: "",
        year: "",
        dateofsubmission: "",
        upload: "",
        remark: "",
        course: "",
        subject: "",
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    const fileupload = await axios.post(
      "http://localhost:7000/uploadjournal",
      formData
    );
    console.log(fileupload);
    if (fileupload.data.code == 200) {
      console.log(fileName);
      let data = record;
      data.upload = fileName;

      const response = await axios.post(
        "http://localhost:7000/AddStudentjournal",
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
    } else {
      alert("Unable to upload file .");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:7000/updateStudentjournal/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewjournal`);
      });
  };
  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container">
      <div className="row bg-primary p-3">
        <div className="col-7 text-center text-white">
          <h1 className="display-6">Accept journal Submission</h1>
        </div>
        <div className="col-5">
          <Link role="button" to="/" className="btn btn-success btn-lg">
            Home
          </Link>
          <Link
            role="button"
            to="/Viewjournal"
            className="btn btn-warning btn-lg"
          >
            View Submitted journals
          </Link>
        </div>
      </div>
      <form
        encType="multipart/form-data"
        className="bg-info bg-gradient p-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Student Name</p>
          </div>
          <div className="col-lg-5">
            <input
              name="studentname"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              required
              value={record.studentname}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Course</p>
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
            <p>Year</p>
          </div>
          <div className="col-lg-5 d-flex">
            <div className="form-check">
              <input
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                name="year"
                value="firstyear"
                id="rdbFy"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                First Year
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                name="year"
                value="secondyear"
                id="rdbSy"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Second Year
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                onChange={handleChange}
                onBlur={handleChange}
                className="form-check-input"
                type="radio"
                name="year"
                value="thirdyear"
                id="rdbTy"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Third Year
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Subject</p>
          </div>
          <div className="col-lg-5">
            <input
              name="subject"
              onChange={handleChange}
              onBlur={handleChange}
              type="text"
              className="form-control"
              required
              value={record.subject}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Date of Submission</p>
          </div>
          <div className="col-lg-5">
            <input
              onChange={handleChange}
              onBlur={handleChange}
              type="date"
              className="form-control"
              name="dateofsubmission"
              id="dateofsubmission"
              required
              value={record.dateofsubmission}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Upload journal</p>
          </div>
          <div className="col-lg-7">
            <input
              className="form-control"
              type="file"
              name="upload"
              onChange={saveFile}
              id="journalUpload"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <p>Remark</p>
          </div>
          <div className="col-lg-7">
            <textarea
              className="form-control"
              rows="5"
              name="remark"
              onChange={handleChange}
              onBlur={handleChange}
              value={record.remark}
            ></textarea>
          </div>
        </div>

        {showAdd ? (
          <button type="submit" className="btn btn-primary">
            Submit journal
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
  );
}
export default Addjournal;
