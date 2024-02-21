import React from "react";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
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
import Leaping_Bunny from "./pages/Certifications/leaping-bunny.js";
import Leaping_Bunny_Fill from "./pages/Certifications/Edit/leaping-bunny-fill.js";
import Leaping_Bunny_Review from "./pages/Certifications/Review/leaping-bunny-review.js";
import Women_Business_Enterprise from "./pages/Certifications/women-business-enterprise.js";
import Women_Business_Enterprise_Fill from "./pages/Certifications/Edit/women-business-enterprise-fill.js";
import Women_Business_Enterprise_Review from "./pages/Certifications/Review/women-business-enterprise-review.js";

function App() {
  function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("user");

    if (!auth) {
      
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
          <Route path="/certification/leaping-bunny" exact element={<ProtectedRoute><Leaping_Bunny /></ProtectedRoute>} />
          <Route path="/certification/leaping-bunny/fill-questionnaire" exact element={<ProtectedRoute><Leaping_Bunny_Fill /></ProtectedRoute>} />
          <Route path="/certification/leaping-bunny/fill-questionnaire/review" exact element={<ProtectedRoute><Leaping_Bunny_Review /></ProtectedRoute>} />
          <Route path="/certification/women-business-enterprise" exact element={<ProtectedRoute><Women_Business_Enterprise /></ProtectedRoute>} />
          <Route path="/certification/women-business-enterprise/fill-questionnaire" exact element={<ProtectedRoute><Women_Business_Enterprise_Fill /></ProtectedRoute>} />
          <Route path="/certification/women-business-enterprise/fill-questionnaire/review" exact element={<ProtectedRoute><Women_Business_Enterprise_Review /></ProtectedRoute>} />
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
