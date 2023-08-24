import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
// import ConfirmationDialog from "./ConfirmationDialog";

function ResidentGridView() {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredResidents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/residents");
      setData(response.data);
      setFilteredResidents(response.data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
//   const handleDelete = (id) => {
//     setSelectedId(id);
//     setShowConfirmation(true);
//   };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/societies/${id}`);
    //   setShowConfirmation(false);
    //   setSelectedId(null);
      fetchData(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const handleFilterChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      )
    );
    setFilteredResidents(filteredData);
  };

  const columns = [
    {
      name: "Society ID",
      selector: "societyId",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Unit Number",
      selector: "unitNumber",
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: "contactNumber",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Move In Date",
      selector: "moveInDate",
      sortable: true,
    },
    {
      name: "Is Owner",
      selector: "isOwner",
      sortable: true,
      cell: (row) => (row.isOwner ? "Yes" : "No"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="btn-group">
          <Link
            to={`/edit-resident/${row._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Resident Grid View</h2>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        subHeaderComponent={
          <input type="text" onChange={handleFilterChange} placeholder="Search" className="form-control"/>
        }
      />
      {/* {showConfirmation && (
        <ConfirmationDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this resident?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )} */}
    </div>
  );
}

export default ResidentGridView;
