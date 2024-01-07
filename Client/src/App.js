import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/Certification.js";
import UserBooking from "./pages/UserBooking";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import Contact from "./components/Contact";
import Profile from "./pages/Profile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              
                <Home />
             
            }
          ></Route>
          <Route
            path="/contact"
            exact
            element={
             
                <Contact />
             
            }
          ></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}>
            {" "}
          </Route>
          <Route
            path="/certification"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>

<Route
            path="/profile/:username"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/certification/:id"
            exact
            element={
              <ProtectedRoute>
                <BookingCar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/userbookings"
            exact
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/userbookings/:id"
            exact
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/addcar"
            exact
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/editcar/:carid"
            exact
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  
  if (!auth) {
    localStorage.setItem("lastClickedURL", window.location.pathname);

    return <Navigate to="/login" />;
  }

  return children;
}
