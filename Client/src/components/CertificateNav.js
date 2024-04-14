import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Button, Space } from "antd";
import Logoo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import UserNavigation from './Navigation/userNavigation.js';
import CertificationsNavigation from './Navigation/certificationsNavigation.js';
import '../Stylesheet/style1.css';
// Enter Info
function CertificateNav(props) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_API}/api/users/profile/${user._id}`
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
        navigate(`/profile/my-profile`);
    };

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
                            <h1 className='user-menu-nav active-menu-item'>
                                Enter Information
                            </h1>
                        </li>
                        <li>
                            <h1 className='user-menu-nav'>
                                Review Information
                            </h1>
                        </li>
                    </ul>

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

        </div>
    );
}

export default CertificateNav;
