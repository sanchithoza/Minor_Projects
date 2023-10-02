import React from 'react'
import './CompForm.css';
import { useState } from 'react';
import axios from "axios";

function CompForm() {
  

  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Course, setCourse] = useState();
  const [Year, setYear] = useState();
  const [Address, setAddress] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Complain, setComplain] = useState();


  const handlesubmit = (event) => {
      event.preventDefault();
      const student_complain_data = {

          FirstName,
          LastName,
          Course,
          Year,
          Address,
          Email,
          Phone,
          Complain,


      }

      axios.post('http://127.0.0.1:5000/_complain',  student_complain_data)
        .then(function (response) {
          alert("Complain Listed Successfully")
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

  }




  return (
    <div>
<section>
  <div className="login-box my-5 pt-5">
    <div className="row">
      <div className="col-12 col-sm-8 col-md-6 m-auto">
        <div className="card border-0 shadow">
          <div className="card-body">
            <div className="row">
              <h2 className="text-center mb-3 fst-italic">Complaint Form</h2>
              <form action="#" method="post" onSubmit={handlesubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {/* <label htmlFor="firstName" className="form-label">
                        First Name
                      </label> */}
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        required=""
                        value={FirstName} onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      {/* <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label> */}
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        required=""
                        value={LastName} onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {/* <label htmlFor="course1" className="form-label">
                        Course
                      </label> */}
                      <input
                        list="course"
                        className="form-control"
                        id="course1"
                        placeholder="Course"
                        required=""
                        value={Course} onChange={(e) => setCourse(e.target.value)}
                      />
                      <datalist id="course">
                        <option value="B.COM"></option>
                        <option value="BBA"></option>
                        <option value="BCA"></option>
                        <option value="BSC"></option>
                        <option value="B.E in Computer Engineering"></option>
                        <option value="B.E in Civil Engineering"></option>
                        <option value="B.E in Chemical Engineering"></option>
                        <option value="B.E in Electrical Engineering"></option>
                      </datalist>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      {/* <label htmlFor="" className="form-label">
                        Year
                      </label> */}
                      <input
                        list="year"
                        className="form-control"
                        placeholder="Year"
                        required=""
                        value={Year} onChange={(e) => setYear(e.target.value)}
                      />
                      <datalist id="year">
                        <option value="FY"></option>
                        <option value="SY"></option>
                        <option value="TY"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  {/* <label className="form-label">Address</label> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    required=""
                    value={Address} onChange={(e) => setAddress(e.target.value)}
                  />
                  {/* <input type="text" className="form-control mt-2" placeholder="Region" required>
                                  <input type="text" className="form-control mt-2" placeholder="ZIP Code" required>
                                  <input type="text" className="form-control mt-2" placeholder="Country" required> */}
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="email" className="form-label">
                    Email
                  </label> */}
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required=""
                    value={Email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="phone" className="form-label">
                    Phone
                  </label> */}
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    required=""
                    value={Phone} onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="complaint" className="form-label">
                    Description of Complaint
                  </label> */}
                  <textarea
                    className="form-control"
                    id="complaint"
                    rows={4}
                    placeholder="Describe your complaint..."
                    required=""
                    defaultValue={""}
                    value={Complain} onChange={(e) => setComplain(e.target.value)}
                  />
                </div>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                <div className="text-center mt-3">
                  <button
                    type="submit"
                    name="submit"
                    value="submit"
                    className="btn btn-primary"
                  >
                    submit
                  </button>
                  {/* <a href="reg.html" className="nav-link">Are you new user?</a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default CompForm