import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Report(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "course",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStudentProfile(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => updateStudentProfile(row._id)}
        >
          Update
        </button>
      ),
    },
  ];
  useEffect(() => {
    loadData();
  }, []);
  let loadData = () => {
    axios.get("http://localhost:7000/getStudentProfile").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteStudentProfile = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteStudentProfile/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateStudentProfile = (id) => {
    navigate(`/AddStudent?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row">
        <form className="form-inline bg-light row">
          <div className="form-group mb-4 col-3">
            <h6 className="display-6 mt-3">Filters</h6>
          </div>
          <div className="form-group mb-4 col-3">
            <label className="form-label">Select Course </label>
            <select
              className="form-control form-control-sm"
              id="report_type"
              required=""
              disabled
            >
              <option value="all">All</option>
              <option value="lab">BCA</option>
              <option value="registration">MCA</option>
            </select>
          </div>
          <div className="form-group mb-4 col-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control form-control-sm"
              id="report_type"
              required=""
              disabled
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group col-3">
            <input
              type="button"
              className="btn btn-primary form-control form-control-sm mt-4"
              id="generate_report"
              value="Apply Filter"
              disabled
            />
          </div>
        </form>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center border border-grey p-3">
              Student Profile Summery
            </h3>

            <DataTable
              className="border border-grey"
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Report;
