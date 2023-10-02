import axios from "axios";
import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
export default function NewBooking() {
  const navigate = useNavigate();
  const [tiffins,setTiffins] = useState([])
  const [formData,setFormData] = useState({
    user: sessionStorage.getItem("name"),
    tiffin: "",
    qty: "",
    location: ""
  })
  useEffect(() => {     
    loadData();
  }, []);
  const loadData = () => { 
    axios.get(`http://127.0.0.1:7000/tiffins`)
    .then((response)=>{
      console.log(response);
      setTiffins(response.data)
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
    <h2 className='bg-black text-white p-1'>New Order</h2>
    <form onSubmit={handleSubmit}>
        <label for="studentName">Customer Name:</label>
        <input type="text" id="studentName" name="studentName" onChange={handleChange} value={formData.user} readonly/>

        <label for="tiffinType">Tiffin Type:</label>
        {/* <input type="text" id="tiffinType" name="tiffinType" onChange={handleChange} value={formData.name} required/> */}
        <select id="tiffin" name="tiffin"  onChange={handleChange} >
            <option key= "1"></option>
            {tiffins.map((tiffin)=>{
              return <option key={tiffin.tiffinType}>{tiffin.tiffinType}</option>
            })}
        </select>

        <label for="qty">Qty:</label>
        <input type="number" id="qty" name="qty" onChange={handleChange} value={formData.qty} required/>

        <label for="location">Address:</label>
        <textarea type="date" id="location" name="location" onChange={handleChange} value={formData.location} required/>
            <br/>
            <br/>
        <button type="submit">Add Booking</button>
    </form>
</section>
  )
}
