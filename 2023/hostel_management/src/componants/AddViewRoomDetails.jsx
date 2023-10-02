import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export default function AddViewRoomDetails() {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [isUpdate,setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    status: "Vacant",
  });
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Room Number",
      selector: (row) => row.roomNumber,
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="btn-group">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteRoom(row._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => updateRoom(row._id)}
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
      axios.get(`http://127.0.0.1:7000/rooms/${id}`)
      .then((response)=>{
        setFormData(response.data)
      })
    }
    loadData();
  }, []);
  const loadData = () => {
    axios.get("http://127.0.0.1:7000/rooms").then((response) => {
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
    const response = await axios.post("http://localhost:7000/rooms", formData);
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
  };
  let deleteRoom = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/rooms/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateRoom = (id) => {
    navigate(`/AddViewRoomDetails?id=${id}`);
  };
  let handleUpdate = (event)=>{
    event.preventDefault();
    var query = window.location.search.substring(1);
    let id = query.split("=")[1];

    axios
      .patch(`http://127.0.0.1:7000/rooms/${id}`, formData)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/AddViewRoomDetails`);
      });
  }
  return (
    <main>
     

      <section class="room-management">
        <h2 className="bg-black text-white p-1">Add New Room</h2>
        <form onSubmit={handleSubmit}>
          <label for="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            onChange={handleChange}
            value={formData.roomNumber}
            required
          />

          <label for="capacity">Capacity:</label>
          <input
            type="number"
            min={1}
            id="capacity"
            name="capacity"
            onChange={handleChange}
            value={formData.capacity}
            required
          />

          <label name for="status">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Vacant">Vacant</option>
            <option value="Occupied">Occupied</option>
          </select>

          {(isUpdate)?<button type="button" className="btn btn-dark" onClick={handleUpdate}>Update Room</button>:<button type="submit">Add Room</button>}
        </form>
      </section>
      <section class="room-list">
        <h2 className="bg-black text-white p-1">Room Details</h2>

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
