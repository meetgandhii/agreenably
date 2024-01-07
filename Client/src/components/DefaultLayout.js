import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import Logoo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import UserNavigation from './Navigation/userNavigation.js';
import CertificationsNavigation from './Navigation/certificationsNavigation.js';
import '../Stylesheet/style1.css';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex" style={{ height: "100vh" }}>

      <ul className="kanbas-navigation-ul" style={{ padding: "0 25px", height: "100%", display: "flex", flexDirection: "column" }}>
        <li className="kanbas-navigation-li">
          <img src="/images/logo.png" width="25px" alt="Logoo" />
          <h3 className='logo-heading' style={{ display: "inline", marginLeft: "20px" }}>
            <span className='first'>a</span>
            <span className='second'>green</span>
            <span className='first'>ably</span>
          </h3>
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
        <li style={{ marginTop: "auto" }}>
          <div>{user ? <div>
            <img src="/images/pfpPlaceholder.png" width="25px" alt="Dashboard" />
            {"\n" + user.name + "\n" + user._id}</div> : "Welcome"}
          </div>
        </li>
      </ul>


    </div>
  );
}

export default DefaultLayout;
