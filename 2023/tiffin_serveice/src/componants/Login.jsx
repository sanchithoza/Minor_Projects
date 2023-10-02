import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      console.log(response.data);
      sessionStorage.setItem("name",response.data.name);
      sessionStorage.setItem("id",response.data._id);
      sessionStorage.setItem("username",response.data.username)
      if(sessionStorage.getItem("username") === "admin"){
        sessionStorage.setItem("userrole","admin");
      }
    navigate("/");
    }else{
      alert("Invalid Credentials");
    }
    
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          
        </div>
        <div className="col-6 p-4 border border-light bg-white">
          <h2 className="text-center bg-dark text-white">Customer Login</h2>
          <h3 className="text-center">Login</h3>
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
                required
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            
          </form>
          <Link
                to="/Register"
                className="nav-link mt-2 border border-black text-center"
                aria-current="page"
              >New User Registration</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
