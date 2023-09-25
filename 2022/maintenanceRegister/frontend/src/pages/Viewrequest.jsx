import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Viewrequest(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Request Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Request Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Request Details",
      selector: (row) => row.details,
      sortable: true,
    },
    {
      name: "Request Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleterecord(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => updaterecord(row._id)}
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
    axios
      .get("http://localhost:7000/getmaintenanceregister")
      .then((response) => {
        console.log(response);
        setRecords(response.data);
      });
  };
  let deleterecord = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deletemaintenanceregister/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updaterecord = (id) => {
    navigate(`/Addrequest?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row bg-danger">
        <div className="col-8 p-3">
          <h3 className="text-center text-white display-6">
            Maintenence Request Data
          </h3>
        </div>
        <div className="col-4 btn-group p-3">
          <Link role="button" to="/" className="btn btn-warning btn-lg">
            Home
          </Link>
          <Link
            role="button"
            to="/Addrequest"
            className="btn btn-warning btn-lg"
          >
            Add complain
          </Link>
        </div>
      </div>
      <div className="row alert alert-danger p-2">
        <div className="col-12">
          <DataTable
            className="border border-danger"
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
export default Viewrequest;
