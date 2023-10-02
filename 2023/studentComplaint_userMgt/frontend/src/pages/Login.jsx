import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
function Login(props) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(login);
    e.preventDefault();
    const response = await axios.post("http://localhost:7000/login", login);
    console.log(response.data);
    sessionStorage.setItem("username",response.data.username)
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 bg-dark text-white text-center">
          <h1 className="display-3">
            Login To Student Complaint <br />
            Management Application
          </h1>
        </div>
        <div className="col-12 p-4 alert alert-dark">
          <h3 className="bg-dark p-1 text-white text-center"> User Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="username"
                name="username"
                aria-describedby="username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                onChange={handleChange}
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <Link
                to="/Register"
                className="nav-link mt-2 border border-dark text-center"
                aria-current="page"
              >Register Now</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
