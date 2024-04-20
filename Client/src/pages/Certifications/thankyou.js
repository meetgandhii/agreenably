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
                    <h1 className="heading_managecertifications">Thank you for completing the Women Owned certification application. Your application is currently being reviewed by a member of the agreenably team prior to submission.
                        We will contact you if any additional information is needed. Feel free to contact us at <a href="mailto:support@agreenably.com">support@agreenably.com</a> for any questions or concerns. We will respond within 24 hours.
                    </h1>
                    <button className="agreenably-btn" onClick={goHome}>Click here to get back to the home page</button>
                </div>
            </div>
        </div>


    );
}

export default Thankyou;