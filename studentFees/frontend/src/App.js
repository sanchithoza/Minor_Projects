import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addfees from "./pages/Addfees";
import Viewfees from "./pages/Viewfees";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name="Fees Reconsilation" />}>
          <Route index element={<Home />} />;
          <Route path="Addfees" element={<Addfees />} />
          <Route path="Viewfees" element={<Viewfees />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
