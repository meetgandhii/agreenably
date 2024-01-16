import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Divider, Checkbox, Modal } from "antd";

import { getAllCertifications } from "../redux/actions/certificationsAction";
import { Link } from "react-router-dom";
import '../Stylesheet/style1.css';


function ManageCertifications(props) {
    const [userDetails, setUserDetails] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const getUserDetails = async (userId) => {
        try {
            const response = await axios.get(`https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`);
            setUserDetails(response.data);
            console.log("User Details:", response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };
    const { certifications } = useSelector((state) => state.certificationsReducer || {});
    const [totalCertifications, setTotalcertifications] = useState([]);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCertifications());

        if (user && user._id) {
            getUserDetails(user._id);
        }

    }, []);

    useEffect(() => {
        if (userDetails && userDetails[0]?.interested_certifications && Array.isArray(certifications)) {
            const userInterestedCertifications = userDetails[0].interested_certifications;
            const filteredCertifications = certifications.filter(certification =>
                userInterestedCertifications.includes(certification._id)
            );

            setTotalcertifications(filteredCertifications);
        }
    }, [userDetails, certifications]);
    const toggleReadMore = (certification) => {
        setSelectedCertification(certification);
        setVisiblePopup(true);
    };

    const handlePopupCancel = () => {
        setVisiblePopup(false);
    };
    return (
        <div className="managecertifications" style={{ width: "100%", height: totalCertifications.length === 1 ? "100vh" : "auto" }}>
            <h1 className="heading_managecertifications">Manage Certifications</h1>
            <Row gutter={[16, 16]}>
                {totalCertifications.map((certification, index) => {
                    return (
                        <Col key={index} xl={24} lg={24} md={24} sm={24} xs={24}>
                            <div className="certificationCard">
                                <div className="certification-container">
                                    <div className="logo-container">
                                        {certification.image ? (
                                            <img src={certification.image} alt={certification.name} width="100px" className="certification_image" />
                                        ) : (
                                            <img src="/images/CertificateImage.png" alt="Placeholder" width="100px" className="certification_image" />
                                        )}
                                    </div>
                                    <div className="certification-details">
                                        <Link className="certification-info" to={`/certification/${certification._id}`}>
                                            <h1 className="certification-name">
                                                {certification.name}
                                            </h1>
                                            <h4 className="status-in-progress">
                                                In Progress
                                            </h4>
                                        </Link>
                                    </div>
                                </div>

                                <Divider className="todo-news-divider" />
                                <Row className="todo-news-container">
                                    <Col xl={11} xs={11} className="todo-news-column">
                                        <h3 className="todo-news-header">
                                            To Do
                                        </h3>
                                        <Divider className="todo-news-divider" />
                                        <ul>

                                            {/* <ul>
                                                {certification.todos.slice(0, 2).map((todo, todoIndex) => (
                                                    <li key={todoIndex}>{todo}</li>
                                                ))}
                                                {certification.todos.length > 2 && (
                                                    <li>
                                                        <button onClick={() => toggleReadMore(certification)}>
                                                            Read More...
                                                        </button>
                                                    </li>
                                                )}w
                                            </ul> */}

                                            {/* map li for displaying all, use .length for if else in more button */}
                                            <li className="todo-news-item">
                                                Update Supplier List for Leaping Bunny
                                            </li>
                                            <li className="todo-news-item">
                                                Update Supplier List for Leaping Bunny
                                            </li>
                                            <li className="readMoreButton">
                                                <button className="readMoreButton" onClick={toggleReadMore}>
                                                    View All Tasks
                                                </button>
                                            </li>
                                        </ul>

                                    </Col>
                                    <Col xl={2} xs={2}><span className="spacer">

                                    </span></Col>
                                    <Col xl={11} xs={11} className="todo-news-column">
                                        <h3 className="todo-news-header">
                                            News Feed

                                        </h3>
                                        <Divider className="todo-news-divider" />
                                        <ul>
                                            <li className="todo-news-item">
                                                Update Supplier List for Leaping Bunny
                                            </li>
                                            <li className="todo-news-item">
                                                Update Supplier List for Leaping Bunny
                                            </li>
                                            <li className="readMoreButton">
                                                <button className="readMoreButton" onClick={toggleReadMore}>
                                                    View All News
                                                </button>
                                            </li>
                                        </ul>

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <Modal
                title="Certification Todos"
                visible={visiblePopup}
                onCancel={handlePopupCancel}
                footer={null}
            >
                <ul>
                    {/* {selectedCertification && selectedCertification.todos.map((todo, todoIndex) => ( */}
                    {/* <li key={todoIndex}>{todo}</li> */}
                    {/* ))} */}
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                    <li>
                        Update Supplier List for Leaping Bunny
                    </li>
                </ul>
            </Modal>
        </div>
    );
}

export default ManageCertifications;