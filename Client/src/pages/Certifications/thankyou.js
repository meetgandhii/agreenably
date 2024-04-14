import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";

import '../../Stylesheet/certifications.css';
import { useNavigate } from "react-router-dom";
function Thankyou() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    const goHome = () => {
        navigate('/')
    }
   
    return (
        <div className="booking-car-container">

            <div style={{ display: "flex", width: "100%" }}>
                <DefaultLayout />
                <div className="managecertifications certificateCard" style={{ height: "100vh" }}>
                    <h1 className="heading_managecertifications">Thankyou for filling the certification. If you have any further concens, please reach out to us via <a href="mailto:somemail@agreenably.com">somemail@agreenably.com</a></h1>
                    <button className="agreenably-btn" onClick={goHome}>Click here to get back to the home page</button>
                </div>
            </div>
        </div>


    );
}

export default Thankyou;