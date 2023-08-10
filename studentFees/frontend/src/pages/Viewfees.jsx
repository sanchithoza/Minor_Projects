import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

createTheme("dark", {
  background: {
    default: "transparent",
  },
  text: {
    primary: "#000000",
    secondary: "#000000",
  },
  divider: {
    default: "#000000",
  },
});

function Viewfees(props) {
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
      name: "Payment Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
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
    axios.get("http://localhost:7000/getStudentfees").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteStudentProfile = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteStudentfees/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateStudentProfile = (id) => {
    navigate(`/Addfees?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row bg-primary">
        <div className="col-12 p-3">
          <h1 className="text-center text-white display-5">
            Student fees Data
          </h1>
        </div>
      </div>
      <div className="row bg-white p-2">
        <div className="col-12">
          <DataTable
            className="border border-primary"
            columns={columns}
            data={data}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}
export default Viewfees;
