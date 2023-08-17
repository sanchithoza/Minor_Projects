import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import AddProduct from './components/pages/AddProduct';
import ListProducts from './components/pages/ListProducts';
import NavMenu from './components/NavMenu';

function App() {
  // Check if JWT token is present in local storage
  const token = localStorage.getItem('jwtToken');

  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/listproducts" component={ListProducts} />
      </Routes>
    </Router>
  );
}

export default App;
