import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ViewBooking() {
    // const navigate = useNavigate();
    const [record, setRecord] = useState([]);
    const columns = [
        {
          name: "#",
          cell: (row, index) => index + 1, //RDT provides index by default
        },
        {
          name: "tiffin Number",
          selector: (row) => row.tiffin,
          sortable: true,
        },
        {
          name: "Customer Name",
          selector: (row) => row.user,
          sortable: true,
        },
        {
          name: "Qty",
          selector: (row) => row.qty,
          sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.location,
            sortable: true,
          },
        {
          cell: (row) => (
            <div className="btn-group">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteBooking(row._id)}
              >
                Delete
              </button>
            </div>
          ),
        },
      ];

      useEffect(() => {
        loadData();
      }, []);
      const loadData = () => {
        axios.get("http://127.0.0.1:7000/bookings").then((response) => {
          console.log(response);
          setRecord(response.data);
        });
      };
      let deleteBooking = (id) => {
        let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
        console.log(isConfirmDelete);
        if (isConfirmDelete) {
          axios
            .delete(`http://localhost:7000/bookings/${id}`)
            .then((response) => {
              loadData();
              console.log(response);
            });
        }
      };
  return (
    <section class="booking-list bg-white m-5">
            <h2 className='bg-black text-white p-1'>Order Details</h2>
            <DataTable
            className=""
            columns={columns}
            data={record}
            pagination
            theme=""
          />
        </section>
  )
}
