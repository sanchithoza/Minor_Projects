import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Report(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "Case No.",
      selector: (row) => row.casenumber,
      sortable: true,
    },
    {
      name: "Patient Name",
      selector: (row) => row.patientname,
      sortable: true,
    },
    {
      name: "Total amount",
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
    axios.get("http://localhost:7000/getTransaction").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteTransaction = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteTransaction/${id}`)
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
        <div className="col-3 bg-light">
          <form className="form bg-light row">
            <div className="form-group mb-4">
              <label className="form-label">Generate Report For </label>
              <select
                className="form-control department"
                id="report_type"
                required=""
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
              <input className="form-control" type="date" id="from_date" />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">To Date</label>
              <input className="form-control" type="date" id="to_date" />
            </div>
            <div className="form-group">
              <input
                type="button"
                className="btn btn-primary form-control-lg"
                id="generate_report"
                value="Filter Report"
              />
            </div>
          </form>
        </div>
        <div className="col-9">
          <h3 className="display-5 text-center border border-grey">
            OPD REPORT{" "}
          </h3>

          <DataTable
            className="border border-grey"
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
export default Report;
