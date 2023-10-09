import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ViewUsers() {
    // const navigate = useNavigate();
    const [record, setRecord] = useState([]);
    const columns = [
        {
          name: "#",
          cell: (row, index) => index + 1, //RDT provides index by default
        },
        {
          name: "Name",
          selector: (row) => row.FirstName,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.Email,
          sortable: true,
        },
        {
            name: "Contact",
            selector: (row) => row.ContactNumber,
            sortable: true,
          },
          
        {
          name: "Year",
          selector: (row) => row.Year,
          sortable: true,
        },
        {
            name: "Gender",
            selector: (row) => row.Gender,
            sortable: true,
          },
        {
          cell: (row) => (
            <div className="btn-group">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteComplain(row._id)}
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
        axios.get("http://127.0.0.1:5000/users").then((response) => {
          console.log(response);
          setRecord(response.data);
        });
      };
      let deleteComplain = (id) => {
        let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
        console.log(isConfirmDelete);
        if (isConfirmDelete) {
          axios
            .delete(`http://localhost:5000/users/${id}`)
            .then((response) => {
              loadData();
              console.log(response);
            });
        }
      };
  return (
    <div className='pt-5'>
    <section className="booking-list p-3 alert bg-warning">
            <h2 className='bg-warning text-white p-1'>All Users</h2>
            <DataTable
            className=""
            columns={columns}
            data={record}
            pagination
            theme=""
          />
        </section>
        </div>
  )
}
