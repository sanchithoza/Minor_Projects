import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Viewcomplain(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "complain Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: "complain Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Detail",
      selector: (row) => row.detail,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStudentComplaint(row._id)}
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
    axios.get("http://localhost:7000/getStudentcomplain").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteStudentComplaint = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteStudentcomplain/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateStudentProfile = (id) => {
    navigate(`/Addcomplain?id=${id}`);
  };
  const data = records;
  const handleLogout = (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    navigate("/login")
  }
  return (
    <div className="container">
      <div className="row bg-dark">
        <div className="col-8 p-3">
          <h3 className="text-center text-white display-6">
            Student complain Data
          </h3>
        </div>
        <div className="col-4 btn-group p-3">
          <Link role="button" to="/" className="btn btn-secondary btn-lg">
            Home
          </Link>
          <Link
            role="button"
            to="/Addcomplain"
            className="btn btn-secondary btn-lg"
          >
            Add complain
          </Link>
        </div>
      </div>
      {(sessionStorage.getItem("username"))?(
            <div className="row p-1">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          ):("")}
      <div className="row bg-secondary p-2">
        <div className="col-12">
          <DataTable
            className="border border-dark"
            columns={columns}
            data={data}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}
export default Viewcomplain;
