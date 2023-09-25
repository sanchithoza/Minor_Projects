import React, { useState,useEffect } from "react";
import axios from "axios"
function Home(props) {
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    loadData();
  }, []);
  let loadData = () => {
    axios.get("http://localhost:7000/getproduct").then((response) => {
      setProductCount(response.data.length);
    });
  };
  return (
    <div className="row">
      <h1 className="text-center pt-4">Dashboard</h1>

      <hr />

      <div className="col-12 text-center alert alert-success">
        <h6 className="display-6 text-center">
          This Web Application makes it easier for staff to provide cost of a
          product to a customer without distrbing the Store owner.
        </h6>
        <hr />
        <br />
        <h1 className="display-1 border border-success">{productCount}</h1>

        <h1 className="display-6">
          Total Numbers Of Products Available with Us.
        </h1>
      </div>
    </div>
  );
}
export default Home;
