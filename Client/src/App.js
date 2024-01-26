import React from "react";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import logo from "./logo.svg";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FillCertification from "./pages/Certification.js";
import UserBooking from "./pages/UserBooking";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import Contact from "./components/Contact";
import Profile from "./pages/Profile";
import Recommendation from "./pages/Recommendations.js";

function App() {
  function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    if (!auth) {
      localStorage.setItem("lastClickedURL", window.location.pathname);
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/get-recommendation" exact element={<Recommendation />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/certification" exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:username" exact element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/certification/:id" exact element={<ProtectedRoute><FillCertification /></ProtectedRoute>} />
          <Route path="/userbookings" exact element={<ProtectedRoute><UserBooking /></ProtectedRoute>} />
          <Route path="/userbookings/:id" exact element={<ProtectedRoute><UserBooking /></ProtectedRoute>} />
          <Route path="/addcar" exact element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/editcar/:carid" exact element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          <Route path="/admin" exact element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
