import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addcomplain from "./pages/Addcomplain";
import Viewcomplain from "./pages/Viewcomplain";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />;
        <Route path="Addcomplain" element={<Addcomplain />} />
        <Route path="Viewcomplain" element={<Viewcomplain />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
