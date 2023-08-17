// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes, Outlet } from 'react-router-dom';
import Home from './components/pages/Home';
import AddProduct from './components/pages/AddProduct';
import ListProducts from './components/pages/ListProducts';
import NavMenu from './components/NavMenu';

const AppRouter = () => {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/listproducts" element={<ListProducts/>} />
      </Routes>
      <Outlet/>
    </Router>
   
  );
};

export default AppRouter;
