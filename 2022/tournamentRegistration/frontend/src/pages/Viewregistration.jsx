import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Viewregistration(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Team Name",
      selector: (row) => row.teamname,
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row) => row.managername,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.managercontact,
      sortable: true,
    },
    {
      name: "Team From",
      selector: (row) => row.from,
      sortable: true,
    },

    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteRegistration(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => updateRegistration(row._id)}
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
    axios.get("http://localhost:7000/getregistration").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteRegistration = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteregistration/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateRegistration = (id) => {
    navigate(`/Addregistration?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row bg-dark p-3">
        <div className="col-7 text-center text-white">
          <h3 className="display-6">Registered Teams</h3>
        </div>
        <div className="col-4 btn btn-group">
          <Link role="button" to="/" className="btn btn-secondary">
            Home
          </Link>
          <Link
            role="button"
            to="/Addregistration"
            className="btn btn-secondary"
          >
            Register Your Team
          </Link>
        </div>
      </div>
      <div className="row bg-secondary p-2">
        <div className="col-12">
          <DataTable
            className="border border-dark"
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
export default Viewregistration;
