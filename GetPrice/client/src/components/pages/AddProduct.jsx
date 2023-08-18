import React from 'react';
import AddProductForm from '../AddProductForm';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  if(token){
    return <div><AddProductForm/></div>;
  }else{
    alert("Only Registered users can Add product ! ! !");
  navigate("/");
  }
  
 
};

export default AddProducts;