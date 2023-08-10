import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addregistration from "./pages/Addregistration";
import Viewregistration from "./pages/Viewregistration";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />;
        <Route path="Addregistration" element={<Addregistration />} />
        <Route path="Viewregistration" element={<Viewregistration />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
