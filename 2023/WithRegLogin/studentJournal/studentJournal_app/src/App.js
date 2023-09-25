import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddJournal from "./pages/AddJournal";
import JournalDetails from "./pages/JournalDetails";
import Home from "./pages/Home";
import Header from "./pages/Header";
function App() {
  // const navigate = useNavigate();
  // const [login, setLogin] = useState(false)
  // useEffect(() => {
  //   if(sessionStorage.getItem("username")){
  //     console.log("loggedin");
  //     setLogin(true);
  //   }else{
  //     console.log("notlogged in");
  //     setLogin(false)
  //   }
  // },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
        <Route index element={<Home />} />;
        <Route path="AddJournal" element={<AddJournal />} />
        <Route path="JournalDetails" element={<JournalDetails />} />
        </Route>
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
