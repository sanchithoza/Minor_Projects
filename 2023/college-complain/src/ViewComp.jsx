import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ViewComp() {
  const navigate = useNavigate();
    // const navigate = useNavigate();
    const [record, setRecord] = useState([]);
    const columns = [
        {
          name: "#",
          cell: (row, index) => index + 1, //RDT provides index by default
        },
        {
          name: "Complain By",
          selector: (row) => row.FirstName,
          sortable: true,
        },
        {
          name: "Phone",
          selector: (row) => row.Phone,
          sortable: true,
        },
        {
            name: "Course",
            selector: (row) => row.Course,
            sortable: true,
          },
          
        {
          name: "Complain",
          selector: (row) => row.Complain,
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
              <button
         className="btn btn-warning btn-sm"
         onClick={() => updateComplain(row._id)}
       >
         Update
       </button>
            </div>
          ),
        },
      ];

      useEffect(() => {
        loadData();
      }, []);
      const loadData = () => {
        axios.get("http://127.0.0.1:5000/_complain").then((response) => {
          console.log(response);
          setRecord(response.data);
        });
      };
      let updateComplain = (id) => {
        navigate(`/CompForm?id=${id}`);
      };
      let deleteComplain = (id) => {
        let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
        console.log(isConfirmDelete);
        if (isConfirmDelete) {
          axios
            .delete(`http://localhost:5000/_complain/${id}`)
            .then((response) => {
              loadData();
              console.log(response);
            });
        }
      };
  return (
    <div className='pt-5'>
    <section className="p-3 alert bg-warning">
            <h2 className='bg-warning text-white p-1'>All Complains</h2>
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
