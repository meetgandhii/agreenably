import React from "react";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FillCertification from "./pages/Certification.js";
import UserBooking from "./pages/UserBooking";
import Contact from "./components/Contact";
import Profile from "./pages/Profile";
import Recommendation from "./pages/Recommendations.js";
import Leaping_Bunny from "./pages/Certifications/leaping-bunny.js";
import Leaping_Bunny_Fill from "./pages/Certifications/Edit/leaping-bunny-fill.js";
import Leaping_Bunny_Review from "./pages/Certifications/Review/leaping-bunny-review.js";
import Women_Business_Enterprise from "./pages/Certifications/women-business-enterprise.js";
import Women_Business_Enterprise_Fill from "./pages/Certifications/Edit/women-business-enterprise-fill.js";
import Women_Business_Enterprise_Review from "./pages/Certifications/Review/women-business-enterprise-review.js";
import Women_Owned_Small_Businesses from "./pages/Certifications/women-owned-small-businesses.js";
import Women_Owned_Small_Businesses_Fill from "./pages/Certifications/Edit/women-owned-small-businesses-fill.js";
import Women_Owned_Small_Businesses_Review from "./pages/Certifications/Review/women-owned-small-businesses-review.js";
import Women_Owned_Small_Businesses_Home from "./pages/Certifications/Women-Owned-Business/home.js";
import Women_Owned_Small_Businesses_Page1 from "./pages/Certifications/Women-Owned-Business/page1.js";
import Women_Owned_Small_Businesses_Page2 from "./pages/Certifications/Women-Owned-Business/page2.js";
import Women_Owned_Small_Businesses_Page3 from "./pages/Certifications/Women-Owned-Business/page3.js";
import Thankyou from "./pages/Certifications/thankyou.js";
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
          <Route path="/certification/thankyou" exact element={<ProtectedRoute><Thankyou /></ProtectedRoute>} />
          
          <Route path="/certification/women-owned-small-businesses" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Home /></ProtectedRoute>} />
          <Route path="/certification/women-owned-small-businesses/fill-questionnaire/page1" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Page1 /></ProtectedRoute>} />
          <Route path="/certification/women-owned-small-businesses/fill-questionnaire/page2" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Page2 /></ProtectedRoute>} />
          <Route path="/certification/women-owned-small-businesses/fill-questionnaire/page3" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Page3 /></ProtectedRoute>} />
          {/* <Route path="/certification/women-owned-small-businesses/fill-questionnaire" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Fill /></ProtectedRoute>} />
          <Route path="/certification/women-owned-small-businesses/fill-questionnaire/review" exact element={<ProtectedRoute><Women_Owned_Small_Businesses_Review /></ProtectedRoute>} /> */}

          <Route path="/userbookings" exact element={<ProtectedRoute><UserBooking /></ProtectedRoute>} />
          <Route path="/userbookings/:id" exact element={<ProtectedRoute><UserBooking /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
