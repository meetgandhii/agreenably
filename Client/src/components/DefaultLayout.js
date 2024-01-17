import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
import UserNavigation from './Navigation/userNavigation.js';
import CertificationsNavigation from './Navigation/certificationsNavigation.js';
import '../Stylesheet/style1.css';
import { useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`
        );
        console.log(response.data[0]);
        setUserData(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const redirectToProfile = () => {
    navigate(`/profile/${user._id}`);
  };
  return (
    <div className="d-flex">

      <ul className="kanbas-navigation-ul" style={{ padding: "0 25px", height: "100%", display: "flex", flexDirection: "column" }}>
        <li className="kanbas-navigation-li">
          <a href="/">
            <img src="/images/agreenably_logo.svg" width="25px" alt="Logoo" />
            <img src="/images/agreenably_name.svg" style={{ display: "inline", marginLeft: "20px" }}/>
          </a>
        </li>
        <li style={{ margin: "60px 0" }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 40px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                paddingRight: '30px',
              }}
            />
            <div style={{ position: 'absolute', right: '220px' }}>
              <FaSearch style={{ color: '#777', cursor: 'pointer' }} />
            </div>
          </div>
        </li>
        <li>
          <UserNavigation />
        </li>
        <li>
          <CertificationsNavigation />
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
          {user && (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          )}
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginTop: '' }}>

          <div className="end-nav-div" onClick={redirectToProfile}>
            {user ? (
              <div className="end-nav-div">
                <img
                  src="/images/pfpPlaceholder.png"
                  width="25px"
                  height="25px"
                  className="profile-pic"
                  alt="Profile"
                />
                <div>
                  <p className="user-name">{user.name}</p>
                  <p className="user-company">{userData ? userData.company_name : <Spinner />}</p>
                </div>
              </div>
            ) : (
              <p style={{ margin: '0' }}>Welcome, please login</p>
            )}
          </div>
        </li>
      </ul>


    </div>
  );
}

export default DefaultLayout;
