import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

function SocietyGridView() {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  useEffect(() => {
    
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/societies');
      setData(response.data);
      setfilteredData(response.data);
    } catch (error) {
      console.error('Error fetching societies:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/societies/${id}`);
      fetchData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'Total Units',
      selector: 'totalUnits',
      sortable: true,
    },
    {
        name: 'Amenities',
        selector: 'amenities',
        sortable: true,
      },
    // Add more columns for other fields
    {
      name: 'Actions',
      cell: (row) => (
        <div className="btn-group">
          <Link to={`/edit-society/${row._id}`} class="btn btn-primary btn-sm">Edit</Link> 
          <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(row._id)}>Delete</button>
        </div>
      ),
    },
  ];
  const handleFilterChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = data.filter(row =>
      Object.values(row)
        .some(value => String(value).toLowerCase().includes(searchValue))
    );
    setfilteredData(filteredData);
  };
  return (
    <div className="container">
      <h2>Society Grid View</h2>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        subHeader
        subHeaderComponent={
          <input type="text"   onChange={handleFilterChange} placeholder="Search" className="form-control" />
        }
      />
    </div>
  );
}

export default SocietyGridView;
