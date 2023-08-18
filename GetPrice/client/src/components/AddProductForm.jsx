// src/components/AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const ResetForm = () => {
    setProductName('');
    setProductCategory('');
    setManufacturedBy('');
    setModelNumber('');
    setCostPrice('');
    setWholesalePrice('');
    setRetailPrice('');
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
     // Get the JWT token from local storage
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.post('/api/products', {
        productName,
        productCategory,
        manufacturedBy,
        modelNumber,
        costPrice,
        wholesalePrice,
        retailPrice,
      },{
        headers:{
            Authorization: `Bearer ${token}`,
        }
      });
      console.log('Product added successfully');
      alert('Product added successfully');
      ResetForm();

       } catch (error) {
      console.error('Failed to add product:', error.message);
    }
  };

  return (
    <div className='row'>
      <div className='col-3'> </div>
      <div className='col card p-2 m-2'>
      <h2 className='border-botttom p-1 mx-auto'>Add Product</h2>
      <form id="add-product-form" onSubmit={handleAddProduct}>
        <div>
          <label className="form-label">Product Name:</label>
          <input className="form-control" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
        </div>
        <div>
          <label className="form-label">Product Category:</label>
          <input className="form-control" type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required/>
        </div>
        <div>
          <label className="form-label">Manufactured By:</label>
          <input className="form-control" type="text" value={manufacturedBy} onChange={(e) => setManufacturedBy(e.target.value)} required/>
        </div>
        <div>
          <label className="form-label">Model Number:</label>
          <input className="form-control" type="text" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} required/>
        </div>
        <div>
          <label className="form-label">Cost Price:</label>
          <input className="form-control" type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} min={0} required/>
        </div>
        <div>
          <label className="form-label">Wholesale Price:</label>
          <input className="form-control" type="number" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} min={0} required/>
        </div>
        <div>
          <label className="form-label">Retail Price:</label>
          <input className="form-control" type="number" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} min={0} required/>
        </div>
        <div className='pt-2'>
        <button className="btn btn-success " type="submit">Add Product</button>
        </div>
      </form>
      </div>
      <div className='col-3'> </div>
    </div>
  );
};

export default AddProductForm;
