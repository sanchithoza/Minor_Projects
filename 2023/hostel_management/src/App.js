import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./componants/Header";
import Home from "./componants/Home";
import NewBooking from "./componants/NewBooking";
import ViewBooking from "./componants/ViewBooking";
import AddViewRoomDetails from "./componants/AddViewRoomDetails";
import Register from "./componants/Register";
import Login from "./componants/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Home />} />;
          <Route path="AddViewRoomDetails" element={<AddViewRoomDetails />} />
          <Route path="NewBooking" element={<NewBooking />} />
          <Route path="ViewBooking" element={<ViewBooking />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
