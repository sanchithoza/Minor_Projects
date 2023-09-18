import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AssignmentDetails(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  
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
      setFilteredRecords(response.data);
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
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = records.filter((record) => {
      return (
        record.studentname.toLowerCase().includes(keyword) ||
        record.course.toLowerCase().includes(keyword) ||
        record.year.toLowerCase().includes(keyword)
      );
    });
    setFilteredRecords(filteredData);
  };
  const data = filteredRecords;

  return (
    <div className="container">
      <div className="row border border-success">
        <div className="col-12 p-3">
          <h3 className="text-center display-6">
            Student Assignment Data
          </h3>
        </div>
        
      </div>
      <div className="row border border-success">
        <div className="col-12 text-center p-2">
        <input
          type="text"
          placeholder="Filter Records"
          onChange={handleFilter}
        />
        </div>
        <div className="col-12">
        
          <DataTable
            className=""
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
export default AssignmentDetails;
