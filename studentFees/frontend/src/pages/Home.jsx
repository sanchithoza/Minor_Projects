import React, { useState } from "react";
function Home(props) {
  const [studentCount, setStudentCount] = useState(0);
  return (
    <div className="row">
      <h1 className="text-center pt-4">Dashboard</h1>
      <hr />
      <div className="col-6 text-center">
        <h1 className="display-1">{studentCount}</h1>
        <h1 className="display-3">Students Paid fees</h1>
      </div>
      <div className="col-6 text-center">
        <h1 className="display-1">{studentCount}</h1>
        <h1 className="display-3">Amount Collected</h1>
      </div>
    </div>
  );
}
export default Home;
