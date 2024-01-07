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
            const response = await axios.get(`https://agreenably-website-server.onrender.com/api/users/getUserDetails/${user._id}`);
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
        <div style={{ width: "100%" }}>
            <h1>ManageCertifications</h1>
            <Row gutter={[16, 16]} style={{ padding: "10px 20px" }}>
                {totalCertifications.map((certification, index) => {
                    return (
                        <Col key={index} xl={24} lg={24} md={24} sm={24} xs={24}>
                            <div>
                                <div className="certificationCard">
                                    <div>
                                        {certification.image ? (
                                            <img src={certification.image} alt={certification.name} width="50px" className="carimg" />
                                        ) : (
                                            <img src="/images/pfpPlaceholder.png" alt="Placeholder" width="50px" className="carimg" />
                                        )}
                                    </div>
                                    <Link to={`/certification/${certification._id}`}>
                                        <h1>
                                            {certification.name}
                                        </h1>
                                        <h4 style={{ color: "green" }}>
                                            In Progress
                                        </h4>
                                    </Link>
                                    <Divider />
                                    <Row>
                                        <Col xl={12} xs={12}>

                                            <h3>
                                                To Do
                                            </h3>
                                            <Divider />
                                            <ul>
                                                {/* 
                                <ul>
                                        {certification.todos.slice(0, 2).map((todo, todoIndex) => (
                                            <li key={todoIndex}>{todo}</li>
                                        ))}
                                        {certification.todos.length > 2 && (
                                            <li>
                                                <button onClick={() => toggleReadMore(certification)}>
                                                    Read More...
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                */}
                                                {/* map li for displaying all, use .length for if else in more button */}
                                                <li>
                                                    Update Supplier List for Leaping Bunny
                                                </li>
                                                <li>
                                                    Update Supplier List for Leaping Bunny
                                                </li>
                                                <li>
                                                    <button onClick={() => toggleReadMore(certification)}>
                                                        Read More...
                                                    </button>
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col xl={12} xs={12}>

                                            <h3>
                                                News Feed
                                            </h3>
                                            <Divider />
                                            <ul>
                                                {/* map li for displaying all, use .length for if else in more button */}
                                                <li>
                                                    Update Supplier List for Leaping Bunny
                                                </li>
                                                <li>
                                                    Update Supplier List for Leaping Bunny
                                                </li>
                                                <li>
                                                    <button onClick={toggleReadMore}>
                                                        Read More...
                                                    </button>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>



                                </div>
                            </div>
                        </Col>
                    );
                })}</Row>
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
