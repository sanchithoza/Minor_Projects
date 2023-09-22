import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

function ResidentGridView() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredResidents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const societyId = sessionStorage.getItem("userSocietyId");
      const response = await axios.get((societyId)?`api/residents/society/${societyId}`:"/api/residents");
      setData(response.data);
      setFilteredResidents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this record ?"
      );
      if (shouldDelete) {
        await axios.delete(`/api/residents/${id}`);
        fetchData(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const showReport = async (id)=>{
    navigate(`/resident-maintenance-report/${id}`);
  }
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
      name: "Society",
      selector: (row) => row.societyId.name,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Unit Number",
      selector: (row) => row.unitNumber,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contactNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Move In Date",
      selector: (row) => row.moveInDate,
      sortable: true,
    },
    {
      name: "Is Owner",
      selector: (row) => row.isOwner,
      sortable: true,
      cell: (row) => (row.isOwner ? "Yes" : "No"),
    },
    // {
    //   name: "Details",
    //   cell: (row) => (
        
    
    // )},
    {
      name: "Actions",
      cell: (row) => (
        <>
       
        <div className="btn-group">
        <button
        className="btn btn-success btn-sm"
        onClick={() => showReport(row._id)}
        title = "View Details"
      >
        <i className="fa fa-table"></i>
      </button>
          <Link
            to={`/edit-resident/${row._id}`}
            className="btn btn-primary btn-sm"
            title = "Edit"
          >
             <i className="fa fa-edit"></i>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
            title = "Delete"
          >
             <i className="fa fa-trash"></i>
          </button>
        </div>
        </>
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
          <input
            type="text"
            onChange={handleFilterChange}
            placeholder="Search"
            className="form-control"
          />
        }
      />
    </div>
  );
}

export default ResidentGridView;
