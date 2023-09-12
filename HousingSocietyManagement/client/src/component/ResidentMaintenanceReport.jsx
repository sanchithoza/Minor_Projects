import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {useParams} from "react-router-dom";
import axios from 'axios'; // You might need to install axios if you haven't already
import DataTable from 'react-data-table-component';
function ResidentMaintenanceReport() {
    const { id } = useParams();
    const [residentPayments, setResidentPayments] = useState([]);
    const [residentId, setResidentId] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);
    
    useEffect(() => {
        
        setResidentId(id);
        console.log(id);
        // setResidentId(id);
      // Fetch maintenance payments data for the resident with the given residentId
      axios.get(`/api/maintenance/resident/${residentId}`)
        .then((response) => {
          setResidentPayments(response.data);
          setFilteredPayments(response.data); // Initialize filtered data with all payments
          console.log(filteredPayments);
        })
        .catch((error) => {
          console.error('Error fetching resident payments:', error);
          
        });
    }, [residentId]);
  
    const columns = [
        {
            name: 'Resident Name',
            selector: (row) => row.residentId.name,
            sortable: true,
          },
          {
            name: 'Unit Number',
            selector: (row) => row.residentId.unitNumber,
            sortable: true,
          },
      {
        name: 'Date',
        selector: (row)=> moment(row.date).utc().format('DD-MM-YYYY'),
        sortable: true,
      },
      {
        name: 'Month',
        selector: 'month',
        sortable: true,
      },
      {
        name: 'Year',
        selector: 'year',
        sortable: true,
      },
      {
        name: 'Amount',
        selector: 'amount',
        sortable: true,
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
      },
    ];
  
    const handleFilter = (e) => {
      const keyword = e.target.value.toLowerCase();
      const filteredData = residentPayments.filter((payment) => {
        return (
          payment.date.toLowerCase().includes(keyword) ||
          payment.month.toLowerCase().includes(keyword) ||
          payment.year.toLowerCase().includes(keyword) ||
          payment.amount.toLowerCase().includes(keyword) ||
          payment.status.toLowerCase().includes(keyword)
        );
      });
      setFilteredPayments(filteredData);
    };
  
    return (
      <div className="container">
        <h2>Resident Wise Maintenance Payment Report</h2>
        <input
          type="text"
          placeholder="Filter payments"
          onChange={handleFilter}
        />
        <DataTable
          columns={columns}
          data={filteredPayments}
          pagination
        />
      </div>
    );
  }
  
  export default ResidentMaintenanceReport;
  