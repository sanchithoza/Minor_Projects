// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  // Get the JWT token from local storage
  const token = localStorage.getItem('jwtToken');
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products',{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
      console.log('Product deleted successfully');
      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error.message);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Manufactured By</th>
            <th>Model Number</th>
            <th>Cost Price</th>
            <th>Wholesale Price</th>
            <th>Retail Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.productCategory}</td>
              <td>{product.manufacturedBy}</td>
              <td>{product.modelNumber}</td>
              <td>{product.costPrice}</td>
              <td>{product.wholesalePrice}</td>
              <td>{product.retailPrice}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
