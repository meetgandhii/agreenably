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
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`
                );
                console.log(response.data[0]);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
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
    const handleCertificationChange = (certification) => {
        setEditedInterestedCertifications((prevSelected) =>
            prevSelected.includes(certification)
                ? prevSelected.filter((item) => item !== certification)
                : [...prevSelected, certification]
        );
    };
    const handlePopupCancel = () => {
        setVisiblePopup(false);
    };

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
    const [editMode, setEditMode] = useState(false);
    const [editedInterestedCertifications, setEditedInterestedCertifications] = useState([]);
    useEffect(() => {
        const initialEditedInterestedCertifications = totalCertifications.map(certification => certification._id);
        setEditedInterestedCertifications(initialEditedInterestedCertifications);
      }, [totalCertifications]);
    const saveThis = async () => {
        try {
            await axios.put(
                `https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`,
                {
                    interested_certifications: editedInterestedCertifications,
                }
            );
            setEditMode(!editMode)
            window.location.reload();
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }
    return (
        <div className="managecertifications" style={{ width: "100%", height: totalCertifications.length < 2 ? "100vh" : "auto" }}>
            <table>
                <tr>
                    <td width={"30%"}>
                        <label className="labelStyleProfile">Want to add more certifications?</label>
                    </td>
                    <td>
                        {editMode ? (
                            <>
                                {certifications.filter((certification) => !userData.completed_certification.includes(certification._id)).map((certification) => {
                                    console.log("certification._id: ", certification._id);
                                    console.log("total cert: ", totalCertifications);
                                    return (
                                        <span key={certification.name} className="interested_certifications">
                                            <input
                                                type="checkbox"
                                                id={`certification-${certification.name}`}
                                                checked={editedInterestedCertifications.includes(certification._id)}
                                                onChange={() => handleCertificationChange(certification._id)}
                                            />
                                            <label className="interested_certifications_label" htmlFor={`certification-${certification.name}`}>
                                                {certification.name}
                                            </label>
                                        </span>
                                    );
                                })}

                                <button onClick={saveThis}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    value={totalCertifications.map((certification) => certification.name).join(', ')}
                                    readOnly
                                    className="readOnlyInputStyleProfile"
                                    style={{ width: "50%" }}
                                />
                                <button onClick={() => setEditMode(!editMode)}>
                                    Add more certifications
                                </button>
                            </>
                        )}


                    </td>
                </tr>
            </table>
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
                                        <Link className="certification-info" to={`/certification/${certification.slug}`}>
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
                                                Update Supplier List for Leaping Bunny Leaping Bunny
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