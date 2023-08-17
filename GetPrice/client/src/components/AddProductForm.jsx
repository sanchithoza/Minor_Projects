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
    <div>
      <h2>Add Product</h2>
      <form id="add-product-form" onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div>
          <label>Product Category:</label>
          <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
        </div>
        <div>
          <label>Manufactured By:</label>
          <input type="text" value={manufacturedBy} onChange={(e) => setManufacturedBy(e.target.value)} />
        </div>
        <div>
          <label>Model Number:</label>
          <input type="text" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} />
        </div>
        <div>
          <label>Cost Price:</label>
          <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
        </div>
        <div>
          <label>Wholesale Price:</label>
          <input type="number" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} />
        </div>
        <div>
          <label>Retail Price:</label>
          <input type="number" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
