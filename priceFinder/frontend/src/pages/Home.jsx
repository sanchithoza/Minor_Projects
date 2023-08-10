import React, { useState } from "react";
function Home(props) {
  const [leaveCount, setLeaveCount] = useState(0);
  return (
    <div className="row">
      <h1 className="text-center pt-4">Dashboard</h1>

      <hr />

      <div className="col-12 text-center">
        <h6 className="display-6 text-center">
          This Web Application makes it easier for staff to provide cost of a
          product to a customer without distrbing the Store owner.
        </h6>
        <hr />
        <br />
        <h1 className="display-1">{leaveCount}</h1>

        <h1 className="display-6">
          Total Numbers Of Products Available with Us.
        </h1>
      </div>
    </div>
  );
}
export default Home;
