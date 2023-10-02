import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
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
    if(response.data){
      sessionStorage.setItem("username",response.data.username)
    navigate("/");
    }else{
      alert("Invalid Credentials");
    }

  };
  return (
    <div className="container">
      <div className="row alert alert-success p-3">
        <div className="col-8 bg-success p-2">
          <h1 className="display-1">
            Login To <br /> Price Finder  <br />
            Web Application <br />
            For Small Businesses
          </h1>
          <Link
                to="/Register"
                className="nav-link mt-2 border border-black text-center text-white"
                aria-current="page"
              >New User Registration</Link>
        </div>
        <div className="col-4 p-4 border border-light alert alert-success p-3">
          <h3 className="bg-success text-white text-center p-3"> User Login</h3>
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
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
