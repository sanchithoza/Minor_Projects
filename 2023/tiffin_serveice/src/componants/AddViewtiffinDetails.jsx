import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export default function AddViewtiffinDetails() {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [isUpdate,setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    tiffinType: "",
    price: "",
    details: "",
  });
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Tiffin Type",
      selector: (row) => row.tiffinType,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "details",
      selector: (row) => row.details,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="btn-group">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deletetiffin(row._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => updatetiffin(row._id)}
          >
            Update
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      setIsUpdate(true);
      let id = query.split("=")[1];
      axios.get(`http://127.0.0.1:7000/tiffins/${id}`)
      .then((response)=>{
        console.log(response.data);
        setFormData(response.data)
      })
    }
    loadData();
  }, []);
  const loadData = () => {
    axios.get("http://127.0.0.1:7000/tiffins").then((response) => {
      console.log(response);
      setRecord(response.data);
    });
  };
  const handleChange = async (e) => {
    console.log(formData);
    await setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("http://localhost:7000/tiffins", formData);
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
  };
  let deletetiffin = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/tiffins/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updatetiffin = (id) => {
    navigate(`/AddViewtiffinDetails?id=${id}`);
  };
  let handleUpdate = (event)=>{
    event.preventDefault();
    var query = window.location.search.substring(1);
    let id = query.split("=")[1];

    axios
      .patch(`http://127.0.0.1:7000/tiffins/${id}`, formData)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/AddViewtiffinDetails`);
      });
  }
  return (
    <main>
     

      <section class="tiffin-management p-2">
        <h2 className="bg-black text-white p-1">Add New Tiffin Type</h2>
        <form onSubmit={handleSubmit}>
          <label for="tiffinType">Tiffin Type:</label>
          <input
            type="text"
            id="tiffinType"
            name="tiffinType"
            onChange={handleChange}
            value={formData.tiffinType}
            required
          />

          <label for="price">Price:</label>
          <input
            type="number"
            min={1}
            id="price"
            name="price"
            onChange={handleChange}
            value={formData.price}
            required
          />

          <label name for="Tiffin Details">
            Details:
          </label>
          <textarea id="details" name="details" value={formData.details} onChange={handleChange}></textarea>
          <br/>
          {(isUpdate)?<button type="button" className="btn btn-dark" onClick={handleUpdate}>Update tiffin</button>:<button type="submit">Add tiffin</button>}
        </form>
      </section>
      <section class="tiffin-list">
        <h2 className="bg-black text-white p-1">tiffin Details</h2>

        <DataTable
            className=""
            columns={columns}
            data={record}
            pagination
            theme=""
          />
      </section>
    </main>
  );
}
