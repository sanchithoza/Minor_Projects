import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios"; // You might need to install axios if you haven't already
import DataTable from "react-data-table-component";

export default function SocietyMaintenanceReport() {
  const { id } = useParams();
  const [residentPayments, setResidentPayments] = useState([]);
  const [societyId, setSocietyId] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    setSocietyId(id);
    console.log(id);
    // setResidentId(id);
    // Fetch maintenance payments data for the resident with the given residentId
    axios
      .get(`/api/maintenance/society/${societyId}`)
      .then((response) => {
        setResidentPayments(response.data);
        setFilteredPayments(response.data); // Initialize filtered data with all payments
        console.log(filteredPayments);
      })
      .catch((error) => {
        console.error("Error fetching resident payments:", error);
      });
  }, [societyId]);

  const columns = [
    {
      name: "Resident Name",
      selector: (row) => row.residentId.name,
      sortable: true,
    },
    {
      name: "Unit Number",
      selector: (row) => row.residentId.unitNumber,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).utc().format("DD-MM-YY"),
      sortable: true,
    },
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => String(row.year),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = residentPayments.filter((payment) => {
      return (
        payment.residentId.name.toLowerCase().includes(keyword) ||
        payment.date.toLowerCase().includes(keyword) ||
        payment.month.toLowerCase().includes(keyword) ||
        payment.year === keyword ||
        payment.amount === keyword ||
        payment.residentId.unitNumber.toLowerCase().includes(keyword) ||
        payment.status.toLowerCase().includes(keyword)
      );
    });
    setFilteredPayments(filteredData);
  };

  return (
    <div className="container">
      <h2>Society Wise Maintenance Payment Report</h2>
      <input
        type="text"
        placeholder="Filter payments"
        onChange={handleFilter}
      />
      <DataTable columns={columns} data={filteredPayments} pagination />
    </div>
  );
}
