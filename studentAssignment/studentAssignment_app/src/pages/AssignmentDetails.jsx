import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function AssignmentDetails(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Student Name",
      selector: (row) => row.studentname,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Submission Date",
      selector: (row) => row.dateofsubmission,
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
    axios.get("http://localhost:7000/getStudentassignment").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteStudentProfile = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteStudentassignment/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateStudentProfile = (id) => {
    navigate(`/AddAssignment?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row bg-primary">
        <div className="col-8 p-3">
          <h3 className="text-center text-white display-6">
            Student Assignment Data
          </h3>
        </div>
        <div className="col-4 p-3">
          <Link role="button" to="/" className="btn btn-success btn-lg">
            Home
          </Link>
          <Link
            role="button"
            to="/AddAssignment"
            className="btn btn-warning btn-lg"
          >
            Accept Assignment
          </Link>
        </div>
      </div>
      <div className="row bg-info p-2">
        <div className="col-12">
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
export default AssignmentDetails;
