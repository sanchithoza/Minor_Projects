import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addregistration(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    teamname: "",
    managername: "",
    managercontact: "",
    captionname: "",
    captioncontact: "",
    email: "",
    address: "",
    from: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getregistration", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data[0]);
          if (response.data[0].priority === "high") {
            document
              .getElementById("rdbHigh")
              .setAttribute("checked", "checked");
          } else if (response.data[0].year === "medium") {
            document
              .getElementById("rdbMedium")
              .setAttribute("checked", "checked");
          } else if (response.data[0].year === "low") {
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
        teamname: "",
        managername: "",
        managercontact: "",
        captionname: "",
        captioncontact: "",
        email: "",
        address: "",
        from: "",
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
      "http://localhost:7000/Addregistration",
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
      .patch(`http://localhost:7000/updateregistration/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewregistration`);
      });
  };

  return (
    <>
      <div className="container-fluied">
        <div className="row bg-dark p-3">
          <div className="col-7 text-center text-white">
            <h3 className="display-6">New Team Registration</h3>
          </div>
          <div className="col-4 btn btn-group">
            <Link role="button" to="/" className="btn btn-secondary">
              Home
            </Link>
            <Link
              role="button"
              to="/Viewregistration"
              className="btn btn-secondary"
            >
              View Registrations
            </Link>
          </div>
        </div>
      </div>
      <div className="container text-white">
        <form
          encType="multipart/form-data"
          className="bg-secondary bg-gradient p-4 m-auto"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3">
            <div className="col-lg-1">
              <p>Team Name</p>
            </div>
            <div className="col-lg-11">
              <input
                name="teamname"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.teamname}
                autoComplete="off"
              />
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-1">
              <p>Team Manager</p>
            </div>
            <div className="col-lg-5">
              <input
                name="managername"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.managername}
              />
            </div>
            <div className="col-lg-1">
              <p>Manager Contact</p>
            </div>
            <div className="col-lg-5">
              <input
                name="managercontact"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.managercontact}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-1">
              <p>Team Caption</p>
            </div>
            <div className="col-lg-5">
              <input
                name="captionname"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.captionname}
              />
            </div>
            <div className="col-lg-1">
              <p>Caption Contact</p>
            </div>
            <div className="col-lg-5">
              <input
                name="captioncontact"
                onChange={handleChange}
                type="text"
                className="form-control"
                required
                value={record.captioncontact}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2"></div>
            <div className="col-lg-5"></div>
            <div className="col-lg-4"></div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-1">
              <p>Email Address</p>
            </div>
            <div className="col-lg-5">
              <input
                onChange={handleChange}
                type="email"
                className="form-control"
                name="email"
                id="email"
                required
                value={record.email}
              />
            </div>
            <div className="col-lg-1">
              <p>Team From</p>
            </div>
            <div className="col-lg-5">
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                name="from"
                id="from"
                required
                value={record.from}
                placeholder="name of your village/town/city"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-1">
              <p>Mailing Address</p>
            </div>
            <div className="col-lg-5">
              <textarea
                className="form-control"
                rows="4"
                name="address"
                onChange={handleChange}
                value={record.address}
              ></textarea>
            </div>
            <div className="col-lg-1">
              <p>Team Logo</p>
            </div>
            <div className="col-lg-5">
              <input
                type="file"
                className="form-control"
                name="logo"
                onChange={handleChange}
                value={record.logo}
                disabled
              />
            </div>
          </div>
          <div className="row mb-3">
            {showAdd ? (
              <button type="submit" className="btn btn-dark">
                Register My Team
              </button>
            ) : (
              ""
            )}

            {showUpdate ? (
              <button onClick={handleUpdate} className="btn btn-warning">
                Update My Team
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </>
  );
}
export default Addregistration;
