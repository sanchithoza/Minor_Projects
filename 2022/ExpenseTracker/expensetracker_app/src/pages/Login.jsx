import React, { useState } from "react";
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
    const response = await axios.post("http://127.0.0.1:7000/login", login);
    console.log(response.data);
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-7 bg-primary">
          <img
            className="img-thumbnail img-responsive rounded mx-auto d-block m-3"
            width={500}
            height={500}
            src="./image/loginpage_image.jpg"
            alt="expense tracker"
          />
        </div>
        <div className="col-5 p-4 border border-primary">
          <h3 className="bg-primary p-5 text-white">
            <strong> User Login</strong>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <strong>Username</strong>
              </label>
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
              <label className="form-label">
                <strong>Password</strong>
              </label>
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
        </div>
      </div>
    </div>
  );
}
export default Login;
