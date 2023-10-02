import axios from "axios";
import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
export default function NewBooking() {
  const navigate = useNavigate();
  const [rooms,setRooms] = useState([])
  const [formData,setFormData] = useState({
    user: sessionStorage.getItem("name"),
    room: "",
    checkInDate: "",
    checkOutDate: ""
  })
  useEffect(() => {     
    loadRooms();
  }, []);
  const loadRooms = () => { 
    axios.get(`http://127.0.0.1:7000/vacantrooms`)
    .then((response)=>{
      console.log(response);
      setRooms(response.data)
    })
  }
  const handleChange = async (e) => {
    console.log(formData);
    await setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("http://localhost:7000/bookings", formData);
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
  };
  return (
    <section class="booking-management bg-white m-5 p-2">
    <h2 className='bg-black text-white p-1'>New Booking</h2>
    <form onSubmit={handleSubmit}>
        <label for="studentName">Student Name:</label>
        <input type="text" id="studentName" name="studentName" onChange={handleChange} value={formData.user} readonly/>

        <label for="roomNumber">Room Number:</label>
        {/* <input type="text" id="roomNumber" name="roomNumber" onChange={handleChange} value={formData.name} required/> */}
        <select id="room" name="room"  onChange={handleChange} >
            <option key= "1"></option>
            {rooms.map((room)=>{
              return <option key={room.roomNumber}>{room.roomNumber}</option>
            })}
        </select>

        <label for="checkInDate">Check-in Date:</label>
        <input type="date" id="checkInDate" name="checkInDate" onChange={handleChange} value={formData.name} required/>

        <label for="checkOutDate">Check-out Date:</label>
        <input type="date" id="checkOutDate" name="checkOutDate" onChange={handleChange} value={formData.name} required/>

        <button type="submit">Add Booking</button>
    </form>
</section>
  )
}
