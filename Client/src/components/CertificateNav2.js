import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import Logoo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import UserNavigation from './Navigation/userNavigation.js';
import CertificationsNavigation from './Navigation/certificationsNavigation.js';
import '../Stylesheet/style1.css';
// Review Info
function CertificateNav(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="d-flex">
            <div>
                <ul className="kanbas-navigation-ul" style={{ padding: "0 25px", height: "100%", display: "flex", flexDirection: "column" }}>
                    <li className="kanbas-navigation-li">
                        <a href="/">
                            <img src="/images/logo.png" width="25px" alt="Logoo" />
                            <h3 className='logo-heading' style={{ display: "inline", marginLeft: "20px" }}>
                                <span className='first'>a</span>
                                <span className='second'>green</span>
                                <span className='first'>ably</span>
                            </h3>
                        </a>
                    </li>
                    <ul style={{ listStyle: "none", textAlign: "start", paddingLeft: "20px" }}>
                        <li style={{ margin: "60px 0 0 0" }}>
                            <h1 className='user-menu-nav'>
                                Enter Information
                            </h1>
                        </li>
                        <li>
                            <h1 className='user-menu-nav active-menu-item'>
                                Review Information
                            </h1>
                        </li>
                    </ul>

                    <li style={{ marginTop: "auto" }}>
                        <div>{user ? <div>
                            <img src="/images/pfpPlaceholder.png" width="25px" alt="Dashboard" />
                            {"\n" + user.name + "\n" + user._id}</div> : "Welcome"}
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default CertificateNav;
