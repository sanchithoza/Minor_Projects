import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addproduct(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    name: "",
    company: "",
    category: "",
    retail: "",
    wholesale: "",
    cost: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getleaverequest", {
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
        name: "",
        company: "",
        category: "",
        retail: "",
        wholesale: "",
        cost: "",
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
    let data = record;

    const response = await axios.post("http://localhost:7000/Addproduct", data);
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
      .patch(`http://localhost:7000/updateleaverequest/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewproduct`);
      });
  };
  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container">
      <div className="row p-3" style={{ backgroundColor: "#193F3D" }}>
        <div className="col-12 text-center text-white">
          <h1 className="display-5">Add New Product</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-0" style={{ border: "1px solid #192f3d" }}>
          <form
            encType="multipart/form-data"
            className="p-4 m-auto"
            style={{ backgroundColor: "#A3B2B1" }}
            onSubmit={handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-lg-1">
                <p>Product Name</p>
              </div>
              <div className="col-lg-9">
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                  value={record.name}
                />
              </div>
              <div className="col-lg-4"></div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-1">
                <p>Product Category</p>
              </div>
              <div className="col-lg-4">
                <input
                  name="category"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                  value={record.category}
                  list="categories"
                  autoComplete="off"
                />
                <datalist id="categories">
                  <option value="Keyboard" />
                  <option value="Mouse" />
                  <option value="CPU" />
                  <option value="Moniter" />
                </datalist>
              </div>
              <div className="col-lg-1">
                <p>Product Company</p>
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
              <div className="col-lg-1">
                <p>Retail Price</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  type="number"
                  className="form-control"
                  name="retail"
                  id="retail"
                  required
                  value={record.retail}
                />
              </div>
              <div className="col-lg-1">
                <p>Wholesale Price</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  name="wholesale"
                  id="wholesale"
                  required
                  value={record.wholesale}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-1">
                <p>Cost</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  name="cost"
                  id="cost"
                  required
                  value={record.cost}
                />
              </div>
              <div className="col-lg-5 text-center">
                {showAdd ? (
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ backgroundColor: "#193F3D" }}
                  >
                    Add Product
                  </button>
                ) : (
                  ""
                )}

                {showUpdate ? (
                  <button onClick={handleUpdate} className="btn btn-warning">
                    Update Product
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Addproduct;
