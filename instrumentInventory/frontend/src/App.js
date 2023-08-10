import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addinventory from "./pages/Addinventory";
import Viewinventory from "./pages/Viewinventory";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout name="Musical Instrument Inventory" />}
        >
          <Route index element={<Home />} />;
          <Route path="Addinventory" element={<Addinventory />} />
          <Route path="Viewinventory" element={<Viewinventory />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
