import React from 'react'
import './RegForm.css';
import { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
function RegForm() {


    const [FirstName, setFirstName] = useState();
    const [LastName, setLastName] = useState();
    const [Email, setEmail] = useState();
    const [ContactNumber, setContactNumber] = useState();
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [Age, setAge] = useState();
    const [Gender, setGender] = useState();
    const [Year, setYear] = useState();

    const handlesubmit = (event) => {
        event.preventDefault();
        const regformdata = {

            FirstName,
            LastName,
            Email,
            ContactNumber,
            Username,
            Password,
            ConfirmPassword,
            Age,
            Gender,
            Year,

        }

        axios.post('http://127.0.0.1:5000/registration', regformdata)
            .then(function (response) {
                alert("Registered Successfully")
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
                                    <h2 className="text-center mb-3 fst-italic">Registration Form</h2>

                                    <form action="#" method="post" onSubmit={handlesubmit}>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    {/* <label for="firstName" className="form-label">First Name</label> */}
                                                    <input type="text" className="form-control" id="firstName"
                                                        placeholder="First Name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    {/* <label for="lastName" className="form-label">Last Name</label> */}
                                                    <input type="text" className="form-control" id="lastName"
                                                        placeholder="Last Name" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label for="studentId" className="form-label">Student ID</label>
                                            <input type="text" className="form-control" id="studentId" placeholder="Student ID"
                                                required/>
                                        </div> */}

                                        <div className="mb-3">
                                            {/* <label for="email" className="form-label">Email</label> */}
                                            <input type="email" className="form-control" id="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            {/* <label for="contactNumber" className="form-label">Contact Number</label> */}
                                            <input type="tel" className="form-control" id="contactNumber"
                                                placeholder="Contact Number" value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            {/* <label for="username" className="form-label">Username</label> */}
                                            <input type="text" className="form-control" id="username" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)}
                                                required />
                                        </div>

                                        <div className="row">
                                            <div className="col col-lg-6 mb-3">
                                                {/* <label for="password" className="form-label">Password</label> */}
                                                <input type="password" className="form-control" id="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}
                                                    required />
                                            </div>

                                            <div className="col col-lg-6 mb-3">
                                                {/* <label for="confirmPassword" className="form-label">Confirm Password</label> */}
                                                <input type="password" className="form-control" id="confirmPassword"
                                                    placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            {/* <label for="gender" className="form-label">Gender</label> */}
                                            <input list="gender" className="form-control" placeholder='Gender' value={Gender} onChange={(e) => setGender(e.target.value)} required />

                                            <datalist id="gender">
                                                <option value="Male" />
                                                <option value="Female" />
                                                <option value="Other" />

                                            </datalist>
                                        </div>

                                        <div className="mb-3">
                                            {/* <label for="age" className="form-label">Age</label> */}
                                            <input type="number" className="form-control" id="age" placeholder="Age" value={Age} onChange={(e) => setAge(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            {/* <label for="" className="form-label">Year</label> */}
                                            <input list="year" className="form-control" placeholder="Year" value={Year} onChange={(e) => setYear(e.target.value)} required />

                                            <datalist id="year">
                                                <option value="FY" />
                                                <option value="SY" />
                                                <option value="TY" />

                                            </datalist>
                                        </div>
                                        <div className="text-center mt-3">
                                            <button type="submit" name="submit" value="submit"
                                                className="btn btn-primary">Register</button>
                                            {/* <a href="reg.html" className="nav-link">Are you new user?</a>  */}
                                            <Link to={'/LoginForm'} className="nav-link mt-2">Click here to login</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default RegForm