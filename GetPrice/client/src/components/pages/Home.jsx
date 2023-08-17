// src/components/Home.js
import React from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';

const Home = () => {
  const token = localStorage.getItem('jwtToken');
  if(token){

  }else{
    return <div><RegistrationForm/><LoginForm/></div>;
  }
  
};

export default Home;