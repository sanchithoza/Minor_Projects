import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Transaction(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [record, setRecord] = useState({
    casenumber: "",
    patientname: "",
    transactiondate: "",
    remark: "",
    registration: 0,
    consultation: 0,
    lab: 0,
    medicine: 0,
    other: 0,
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getTransaction", {
          _id: id,
        })
        .then(async (response) => {
          await setRecord(response.data[0]);
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
          await setTotal(
            parseInt(response.data[0].registration) +
              parseInt(response.data[0].consultation) +
              parseInt(response.data[0].lab) +
              parseInt(response.data[0].medicine) +
              parseInt(response.data[0].other)
          );
        });
    } else {
      setRecord({
        casenumber: "",
        patientname: "",
        transactiondate: "",
        remark: "",
        registration: 0,
        consultation: 0,
        lab: 0,
        medicine: 0,
        other: 0,
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
  };
  const makeTotal = async () => {
    await setTotal(
      parseInt(record.registration) +
        parseInt(record.consultation) +
        parseInt(record.lab) +
        parseInt(record.medicine) +
        parseInt(record.other)
    );
  };
  const handleSubmit = async (e) => {
    console.log(record);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:7000/addTransaction",
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
      .patch(`http://localhost:7000/updateTransaction/${id}`, record)
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4 bg-light">
            <h1 className="display-3">Ayurveda</h1>
            <br />
            <h3 className="display-5">New OPD Entry</h3>
            <h4 className="bg-white p-2">Patient Details</h4>
            <div className="mb-3">
              <label className="form-label">Case Number</label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="casenumber"
                name="casenumber"
                value={record.casenumber}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Patient Name</label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="patientname"
                name="patientname"
                value={record.patientname}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                onChange={handleChange}
                className="form-control"
                id="transactiondate"
                name="transactiondate"
                value={record.transactiondate}
              />
            </div>
          </div>

          <div className="col-4 border border-light">
            <h4 className="bg-light p-2">Charges</h4>
            <div className="mb-3">
              <label className="form-label">Registration Charge</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={makeTotal}
                className="form-control"
                id="registration"
                name="registration"
                value={record.registration}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Consultation Charge</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={makeTotal}
                className="form-control"
                id="consultation"
                name="consultation"
                value={record.consultation}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Lab Charge</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={makeTotal}
                className="form-control"
                id="lab"
                name="lab"
                value={record.lab}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Medicine Charges</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={makeTotal}
                className="form-control"
                id="medicine"
                name="medicine"
                value={record.medicine}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Other Charge</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={makeTotal}
                className="form-control"
                id="other"
                name="other"
                value={record.other}
              />
            </div>
          </div>
          <div className="col-4 border border-light pb-3">
            <h4 className="bg-light p-2">Summery</h4>
            <div className="mb-3">
              <label className="form-label">Remark</label>
              <textarea
                onChange={handleChange}
                className="form-control"
                id="remark"
                name="remark"
                value={record.remark}
              ></textarea>
            </div>
            <div className="mb-3">
              <h4> Total Amount : {total} </h4>
            </div>
            {showAdd ? (
              <button type="submit" className="btn btn-primary">
                Add Transaction
              </button>
            ) : (
              ""
            )}

            {showUpdate ? (
              <button onClick={handleUpdate} className="btn btn-warning">
                Update Transaction
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default Transaction;
