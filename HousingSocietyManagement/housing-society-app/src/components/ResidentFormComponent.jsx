import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResidentFormComponent({ residentId }) {
  const [name, setName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');

  useEffect(() => {
    if (residentId) {
      axios.get(`/api/residents/${residentId}`)
        .then(response => {
          const residentData = response.data;
          setName(residentData.name);
          setUnitNumber(residentData.unitNumber);
        })
        .catch(error => {
          console.error('Error fetching resident data:', error);
        });
    }
  }, [residentId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newResident = {
      name,
      unitNumber,
    };

    if (residentId) {
      // Update existing resident
      axios.put(`/api/residents/${residentId}`, newResident)
        .then(response => {
          console.log('Resident updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating resident:', error);
        });
    } else {
      // Add new resident
      axios.post('/api/residents', newResident)
        .then(response => {
          console.log('Resident added:', response.data);
        })
        .catch(error => {
          console.error('Error adding resident:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>{residentId ? 'Update Resident' : 'Add New Resident'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="unitNumber" className="form-label">Unit Number:</label>
          <input type="text" className="form-control" id="unitNumber" value={unitNumber} onChange={e => setUnitNumber(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary">
          {residentId ? 'Update' : 'Add'} Resident
        </button>
      </form>
    </div>
  );
}

export default ResidentFormComponent;
