import React, { useEffect, useState } from "react";
import { Row, Divider } from "antd";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import '../../Stylesheet/certifications.css';
import { useNavigate } from "react-router-dom";
function Women_Business_Enterprise() {
    const slug = 'women-business-enterprise'
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [certification, setCertification] = useState({});


    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await axios.get(`https://agreenably-website-server.onrender.com/api/certifications/certificate/${slug}`);
                setCertification(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchCertificate();
    }, []);
    const begin_certificate = async () => {
        const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
        try {
            const response = await axios.post("https://agreenably-website-server.onrender.com/api/certification/records/addcertificationrecord", {
              user_id: user._id,
              timestamp: timestamp,
              ongoing: "1",
              certification_id: certification._id,
              certification_response: []
            });
            setTimeout(() => {
                window.location.href = `${window.location.href}/fill-questionnaire`;
              }, 500);
        } catch (error) {
            console.error("Error while adding certification record:", error);
          }
        };
    return (
        <div className="booking-car-container">

            <div style={{ display: "flex", width: "100%" }}>
                <DefaultLayout />
                <div className="managecertifications certificateCard" style={{ height: "100vh" }}>
                    <h1 className="heading_managecertifications">Get Certified</h1>
                    

                    {certification && (
                        <>
                            <Row justify="center" className="certification-card">
                                <div className="certificationCard2">
                                    <div className="certification-container">
                                        <div className="logo-container">
                                            {certification.image ? (
                                                <img src={certification.image} alt={certification.name} width="80px" className="certification_image" />
                                            ) : (
                                                <img src="/images/CertificateImage.png" alt="Placeholder" width="80px" className="certification_image" />
                                            )}
                                        </div>
                                        <div className="certification-details">
                                            <div className="certification-info">
                                                <h1 className="certification-name">
                                                    {certification.name}
                                                </h1>
                                                <h4 className="certificate-duration">
                                                    Time: 30mins
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Divider className="todo-news-divider" />
                                <div>
                                    <ul className="certification-process-ul">
                                        {certification.workflow && certification.workflow.map((step, index) => (
                                            <li
                                                key={index}
                                                className={`certification-process-li ${index === certification.workflow.length - 1 ? 'last' : ''}`}
                                                id={index === certification.workflow.length - 1 ? 'certification-process-li-last' : ''}
                                            >
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Row>
                            <button onClick={begin_certificate} className="agreenably-btn">
                                Begin
                            </button>

                            {!certification && <Spinner />}
                        </>
                    )}
                </div>
            </div>
        </div>


    );
}

export default Women_Business_Enterprise;