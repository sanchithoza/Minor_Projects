import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddFeesDetails from "./pages/AddFeesDetails";
import FeesDetails from "./pages/FeesDetails";
import Home from "./pages/Home";
import Header from "./pages/Header";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
        <Route index element={<Home />} />;
        <Route path="AddFeesDetails" element={<AddFeesDetails />} />
        <Route path="FeesDetails" element={<FeesDetails />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
