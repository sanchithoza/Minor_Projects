import React from 'react';
import './LoginForm.css';
import { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
// import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function LoginForm(props) {

        const [login, setLogin] = useState({
            Username: "",
            Password: "",
        });
        const navigate = useNavigate();
        const handleChange = (e) => {
            setLogin({ ...login, [e.target.name]: e.target.value });
        };
        const handleSubmit = async (e) => {
            console.log(login);
            e.preventDefault();
            const response = await axios.post("http://localhost:5000/login", login);
            console.log(response.data);
            if(response.data){
                sessionStorage.setItem("username",response.data.Username)
            }
            navigate("/CompForm");
        };




        return (
            <div>

                <section>
                    <div className="login-box pt-5">
                        <div className="row">
                            <div className="col-12 col-sm-8 col-md-6 m-auto">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <center>
                                            {/* <svg className="mx-auto my-3" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                    fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg> */}

                                            <svg
                                                className="mx-auto my-3"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={50}
                                                height={50}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                                />
                                            </svg>
                                        </center>
                                        <form action="" onSubmit={handleSubmit} method="post">
                                            <div className="uname">



                                                <input type="text" className="text form-control my-4 py2" name="Username" id="username"
                                                    placeholder="username" onChange={handleChange} />
                                                {/* <input type="text" className="text form-control my-4 py2" name="username" id="username"
                                        placeholder="username" value={Email} onChange={(e) => setEmail(e.target.value)} /> */}
                                            </div>
                                            <div className="pwd">

                                                <input type="password" className="text form-control my-4 py2 " name="Password"
                                                    id="password" placeholder="password" onChange={handleChange} />
                                                {/* <input type="password" className="text form-control my-4 py2 " name="password"
                                        id="password" placeholder="password" value={Password} onChange={(e) => setPassword(e.target.value)} /> */}


                                            </div>
                                            <div className="text-center mt-3">
                                                <button type="submit" name="submit" value="submit"
                                                    className="btn btn-primary">Login</button>
                                                {/* <a href="reg.html" className="nav-link">Are you new user?</a> */}
                                                <Link to={'/RegForm'} className="nav-link">Are you new user?</Link>
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

    export default LoginForm