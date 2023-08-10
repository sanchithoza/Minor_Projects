import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Transaction(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let categories = ["Education", "Food", "Travel", "Entertainment"];
  let paymentmodes = ["Cash", "Cheque", "UPI"];
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [record, setRecord] = useState({
    amount: 0,
    category: "",
    description: "",
    mode: "",
    paymentdate: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://127.0.0.1:7000/getTransaction", {
          _id: id,
        })
        .then(async (response) => {
          await setRecord(response.data[0]);
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
        });
    } else {
      setRecord({
        amount: 0,
        category: "",
        description: "",
        mode: "",
        paymentdate: new Date().toISOString().slice(0, 10),
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(record);
    e.preventDefault();
    const response = await axios.post(
      "http://127.0.0.1:7000/addTransaction",
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
      .patch(`http://127.0.0.1:7000/updateTransaction/${id}`, record)
      .then((response) => {
        console.log(response);
        navigate(`/report`);
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 bg-primary text-white">
            <h1 className="display-1">Expense</h1>
            <br />
            <h3 className="display-3">Tracker</h3>
          </div>

          <div className="col-6 border border-primary">
            <h4 className="bg-white p-2">Expense Details</h4>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                onChange={handleChange}
                onBlur={handleChange}
                className="form-control"
                id="amount"
                name="amount"
                value={record.amount}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                type="text"
                id="category"
                name="category"
                value={record.category}
                list="data"
                onChange={handleChange}
                onBlur={handleChange}
              />
              <datalist id="data">
                {categories.map((category, key) => (
                  <option key={key} value={category} />
                ))}
              </datalist>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Payment Mode</label>
                  <input
                    className="form-control"
                    type="text"
                    id="mode"
                    name="mode"
                    value={record.mode}
                    list="modes"
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                  <datalist id="modes">
                    {paymentmodes.map((mode, key) => (
                      <option key={key} value={mode} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Payment Date</label>
                  <input
                    type="date"
                    onChange={handleChange}
                    className="form-control"
                    id="paymentdate"
                    name="paymentdate"
                    value={record.paymentdate}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                onChange={handleChange}
                className="form-control"
                id="description"
                name="description"
                value={record.description}
              ></textarea>
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
