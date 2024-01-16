import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Row, Divider } from "antd";
import Spinner from "../components/Spinner";
import '../Stylesheet/profile.css'
import '../Stylesheet/certifications.css';
import axios from "axios";
import { getAllCertifications } from "../redux/actions/certificationsAction";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedInterestedCertifications, setEditedInterestedCertifications] = useState([]);
  
  const handleCertificationChange = (certification) => {
    setEditedInterestedCertifications((prevSelected) =>
      prevSelected.includes(certification)
        ? prevSelected.filter((item) => item !== certification)
        : [...prevSelected, certification]
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCertifications());
  }, []);


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
  const { certifications } = useSelector((state) => state.certificationsReducer || {});
  const [totalCertifications, setTotalcertifications] = useState([]);
  useEffect(() => {
    if (userData && userData.interested_certifications && Array.isArray(certifications)) {
      const userInterestedCertifications = userData.interested_certifications;
      const filteredCertifications = certifications.filter(certification =>
        userInterestedCertifications.includes(certification._id)
      );

      setTotalcertifications(filteredCertifications);
    }
  }, [userData, certifications]);


  const handleEdit = () => {
    setEditMode(true);
    setEditedName(userData.name);
    setEditedPassword(userData.password);
    setEditedCompanyName(userData.company_name);
    setEditedInterestedCertifications([...userData.interested_certifications]);
  };

  const handleSave = async () => {
    console.log(editedInterestedCertifications);
    console.log(editedCompanyName);
    console.log(editedName);
    console.log(editedPassword);
    try {
      await axios.put(
        `https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`,
        {
          name: editedName,
          password: editedPassword,
          company_name: editedCompanyName,
          interested_certifications: editedInterestedCertifications,
        }
      );

      setUserData({
        ...userData,
        name: editedName,
        password: editedPassword,
        company_name: editedCompanyName,
        interested_certifications: editedInterestedCertifications,
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="booking-car-container">
      <div style={{ display: "flex", width: "100%" }}>
        <DefaultLayout />
        <div className="managecertifications certificateCard" style={{ height: "100vh" }}>
          <h1 className="heading_managecertifications">Get Certified</h1>
          {userData ? (
            <>
              <Row justify="center" className="certification-card">
                <div className="certificationCard2">
                  <div className="certification-container">
                    <div className="logo-container">
                      {userData.image ? (
                        <img src={userData.image} alt={userData.name} width="80px" className="certification_image" />
                      ) : (
                        <img src="/images/pfpPlaceholder.png" alt="Placeholder" width="80px" className="certification_image" />
                      )}
                    </div>
                    <div className="certification-details">
                      <div className="certification-info">
                        <h1 className="certification-name">{userData.name}</h1>
                        <h4 className="certificate-duration">
                          {editMode ? "Edit my Profile" : "View my Profile"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider className="todo-news-divider" />
                <div className="contains_table">
                  <table>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Name:</label>
                      </td>
                      <td>
                        {editMode ? (
                          <input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="inputStyleProfile"
                          />
                        ) : (
                          <input
                            value={userData.name}
                            readOnly
                            className="readOnlyInputStyleProfile"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Password:</label>
                      </td>
                      <td>
                        {editMode ? (
                          <input
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                            className="inputStyleProfile"
                          />
                        ) : (
                          <input
                            value={userData.password}
                            readOnly
                            className="readOnlyInputStyleProfile"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Email:</label>
                      </td>
                      <td>
                        <input
                          value={userData.email_address}
                          readOnly
                          className="readOnlyInputStyleProfile"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Company Name:</label>
                      </td>
                      <td>
                        {editMode ? (
                          <input
                            value={editedCompanyName}
                            onChange={(e) => setEditedCompanyName(e.target.value)}
                            className="inputStyleProfile"
                          />
                        ) : (
                          <input
                            value={userData.company_name}
                            readOnly
                            className="readOnlyInputStyleProfile"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Interested Certifications:</label>
                      </td>
                      <td>
                        {editMode ? (
                          certifications
                          .filter((certification) => !userData.completed_certification.includes(certification._id))
                          .map((certification) => (
                            <span key={certification.name} className="interested_certifications">
                              <input
                                type="checkbox"
                                id={`certification-${certification.name}`}
                                checked={editedInterestedCertifications.includes(certification._id)}
                                onChange={() => handleCertificationChange(certification._id)}
                              />
                              <label className="interested_certifications_label" htmlFor={`certification-${certification.name}`}>{certification.name}</label>
                            </span>
                          ))
                        ) : (
                          <input
                            value={totalCertifications.map((certification) => certification.name).join(', ')}
                            readOnly
                            className="readOnlyInputStyleProfile"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Ongoing Certifications:</label>
                      </td>
                      <td>
                        <input
                          value={certifications
                            .filter((certification) => userData.ongoing_certification.includes(certification._id))
                            .map((certification) => certification.name)
                            .join(', ')}
                          readOnly
                          className="readOnlyInputStyleProfile"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="labelStyleProfile">Completed Certifications:</label>
                      </td>
                      <td>
                        <input
                          value={userData.completed_certification.length > 0
                            ? certifications
                              .filter((certification) => userData.completed_certification.includes(certification._id))
                              .map((certification) => certification.name)
                              .join(', ')
                            : 'None'}
                          readOnly
                          className="readOnlyInputStyleProfile"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </Row>
              {editMode ? (
                <button className="agreenably-btn" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="agreenably-btn" onClick={handleEdit}>
                  Edit
                </button>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
