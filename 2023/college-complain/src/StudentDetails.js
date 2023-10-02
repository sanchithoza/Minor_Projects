// StudentDetails.js
import React, { useEffect, useState } from 'react';

function StudentDetails({ match }) {
  const [student, setStudent] = useState({});

  useEffect(() => {
    // Fetch student details from MongoDB based on match.params.id
    const studentId = match.params.id;
    // You would need to implement the API call to retrieve student details here
    // Example: axios.get(`/api/students/${studentId}`).then((response) => setStudent(response.data));
  }, [match.params.id]);

  return (
    <div className="container mt-4">
      <h2>Student Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{student.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{student.lastName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{student.email}</td>
          </tr>
          {/* Add more details here */}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDetails;
