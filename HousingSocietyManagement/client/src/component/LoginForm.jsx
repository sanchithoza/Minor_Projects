import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { isLoggedIn,login } = useAuth();
   const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login", formData);

      // Assuming your backend sends a JWT token upon successful login
      const { token } = response.data;

      // Store the JWT token in local storage or a secure cookie
      sessionStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      sessionStorage.setItem("userRole", decodedToken.role);
      sessionStorage.setItem("userId", decodedToken.userId);
      if (decodedToken.societyId) {
        sessionStorage.setItem("userSocietyId", decodedToken.societyId);
      }
      if (decodedToken.societyId) {
        sessionStorage.setItem("userResidentId", decodedToken.residentId);
        
      }
      login();
      if (isLoggedIn) {
        window.location.reload();
        navigate("/");
      }

      // const userData = sessionStorage.getItem('userDetails');
      // console.log(JSON.parse(userData));
      // Redirect or perform other actions upon successful login
      // You can use React Router to navigate to different pages
      // history.push('/dashboard');
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title text-center">Housing Society Management Application</h5>
              <hr/>
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
