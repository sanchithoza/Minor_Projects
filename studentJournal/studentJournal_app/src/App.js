import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addjournal from "./pages/Addjournal";
import Viewjournal from "./pages/Viewjournal";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />;
        <Route path="Addjournal" element={<Addjournal />} />
        <Route path="Viewjournal" element={<Viewjournal />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
