import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addinventory(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    productname: "",
    company: "",
    date: "",
    qty: "",
    price: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getinventory", {
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
            .getElementById("feesUpload")
            .setAttribute("disabled", "disabled");
        });
    } else {
      setRecord({
        productname: "",
        company: "",
        date: "",
        qty: "",
        price: "",
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
    let data = record;

    const response = await axios.post(
      "http://localhost:7000/Addinventory",
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
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:7000/updateinventory/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewinventory`);
      });
  };
  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container">
      <div className="row bg-success p-3">
        <div className="col-12 text-center text-white">
          <h1 className="display-5">Add Instrument to Inventory</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-0">
          <form
            encType="multipart/form-data"
            className="bg-white bg-gradient p-4 m-auto"
            onSubmit={handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Instrument Name</p>
              </div>
              <div className="col-lg-9">
                <input
                  name="productname"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                  value={record.productname}
                />
              </div>
              <div className="col-lg-4"></div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Company Name</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  type="text"
                  className="form-control"
                  name="company"
                  id="company"
                  required
                  value={record.company}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Date of Purchase</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
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
                <p>Quantity </p>
              </div>
              <div className="col-lg-4">
                <input
                  type="number"
                  className="form-control"
                  name="qty"
                  onChange={handleChange}
                  value={record.qty}
                />
              </div>
              <div className="col-lg-1">
                <p>Price per Unit </p>
              </div>
              <div className="col-lg-4">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  onChange={handleChange}
                  value={record.price}
                />
              </div>
            </div>

            {showAdd ? (
              <button type="submit" className="btn btn-success">
                Add To Inventory
              </button>
            ) : (
              ""
            )}

            {showUpdate ? (
              <button onClick={handleUpdate} className="btn btn-warning">
                Update Leave Request
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
export default Addinventory;
