import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addproduct from "./pages/Addproduct";
import Viewproduct from "./pages/Viewproduct";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name="Price Finder" />}>
          <Route index element={<Home />} />;
          <Route path="Addproduct" element={<Addproduct />} />
          <Route path="Viewproduct" element={<Viewproduct />} />
        </Route>
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
