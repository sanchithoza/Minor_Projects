import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";
function Report(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "Date",
      selector: (row) => row.paymentdate,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Mode of Payment",
      selector: (row) => row.mode,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      cell: (row) => (
        <button onClick={() => deleteTransaction(row._id)}>Delete</button>
      ),
    },
    {
      cell: (row) => (
        <button onClick={() => updateTransaction(row._id)}>Update</button>
      ),
    },
  ];
  useEffect(() => {
    loadData();
  }, []);
  let loadData = () => {
    axios.get("http://127.0.0.1:7000/getTransaction").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteTransaction = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://127.0.0.1:7000/deleteTransaction/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateTransaction = (id) => {
    navigate(`/transaction?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row">
        <div className="col-9 border border-primary p-2">
          <h3 className="display-6 text-center">Expense Summery</h3>
          <DataTable
            className="border border-primary"
            columns={columns}
            data={data}
            pagination="true"
            highlightOnHover
          />
        </div>
        <div className="col-3 bg-primary text-white">
          <h5 className="display-6">Filter Report</h5>
          <hr />
          <form className="form bg-primary row">
            <div className="form-group mb-4">
              <label className="form-label">Select Category </label>
              <select
                className="form-control department"
                id="report_type"
                required=""
                disabled="disabled"
              >
                <option value="all">All</option>
                <option value="lab">Lab</option>
                <option value="registration">
                  Consultation / Registratoion
                </option>
                <option value="medicine">Medicine</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">From Date </label>
              <input
                className="form-control"
                type="date"
                id="from_date"
                disabled="disabled"
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">To Date</label>
              <input
                className="form-control"
                type="date"
                id="to_date"
                disabled="disabled"
              />
            </div>
            <div className="form-group">
              <input
                type="button"
                className="btn btn-warning form-control-lg"
                id="generate_report"
                value="Filter Report"
                disabled="disabled"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Report;
