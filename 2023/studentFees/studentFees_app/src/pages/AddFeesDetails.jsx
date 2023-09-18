import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function AddFeesDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();
  // let [total, setTotal] = useState(0);
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
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getStudentFeesDetails", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data);

          if (response.data.year === "firstyear") {
            document.getElementById("rdbFy").setAttribute("checked", "checked");
          } else if (response.data.year === "secondyear") {
            document.getElementById("rdbSy").setAttribute("checked", "checked");
          } else {
            document.getElementById("rdbTy").setAttribute("checked", "checked");
          }
          await response.data;
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
          document
            .getElementById("FeesDetailsUpload")
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
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
  };
  // const handleRdbClick = async (e) => {
  //   e.target.setAttribute("checked", "checked");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    const fileupload = await axios.post(
      "http://localhost:7000/uploadFeesDetails",
      formData
    );
    console.log(fileupload);
    if (fileupload.data.code === 200) {
      console.log(fileName);
      let data = record;
      data.upload = fileName;

      const response = await axios.post(
        "http://localhost:7000/AddStudentFeesDetails",
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
      .patch(`http://localhost:7000/updateStudentFeesDetails/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/FeesDetails`);
      });
  };
  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container">
      <div className="row bg-primary mt-3">
        <div className="col-12 text-center">
          <h1 className="display-6">Accept FeesDetails Submission</h1>
        </div>
      </div>
      <div className="row text-black">
        <div className="col-12  border border-primary mb-5">
          <form
            encType="multipart/form-data"
            className=" p-4 m-auto"
            onSubmit={handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Student Name</p>
              </div>
              <div className="col-lg-7">
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
              <div className="col-lg-7">
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Third Year
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Date of Submission</p>
              </div>
              <div className="col-lg-7">
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
                <p>Upload FeesDetails</p>
              </div>
              <div className="col-lg-7">
                <input
                  className="form-control"
                  type="file"
                  name="upload"
                  onChange={saveFile}
                  id="FeesDetailsUpload"
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
                Submit FeesDetails
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
      </div>
    </div>
  );
}
export default AddFeesDetails;
