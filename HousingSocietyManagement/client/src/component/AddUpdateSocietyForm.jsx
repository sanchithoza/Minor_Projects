import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AddUpdateSocietyForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [totalUnits, setTotalUnits] = useState('');
  const [amenities, setAmenities] = useState([]);
  
  useEffect(() => {
    if (id) {
      axios.get(`/api/societies/${id}`)
        .then(response => {
          const societyData = response.data;
          setName(societyData.name);
          setAddress(societyData.address);
          setTotalUnits(societyData.totalUnits);
          setAmenities(societyData.amenities);
        })
        .catch(error => {
          console.error('Error fetching society data:', error);
        });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const societyData = {
      name,
      address,
      totalUnits,
      amenities,
    };

    try {
      if (id) {
        // Update existing society
        const response = await axios.put(`/api/societies/${id}`, societyData);
        console.log('Society updated:', response.data);
      } else {
        // Add new society
        const response = await axios.post('/api/societies', societyData);
        console.log('Society added:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Update Society' : 'Add New Society'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" className="form-control" id="address" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="totalUnits" className="form-label">Total Units:</label>
          <input type="number" className="form-control" id="totalUnits" value={totalUnits} onChange={e => setTotalUnits(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="amenities" className="form-label">Amenities:</label>
          <input type="text" className="form-control" id="amenities" value={amenities.join(', ')} onChange={e => setAmenities(e.target.value.split(', '))} />
          <small className="form-text text-muted">Separate amenities with commas.</small>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Add'} Society
        </button>
      </form>
    </div>
  );
}

export default AddUpdateSocietyForm;
