import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Row, Divider, Modal } from "antd";
import Spinner from "../components/Spinner";
import '../Stylesheet/profile.css'
import '../Stylesheet/certifications.css';
import axios from "axios";
import { getAllCertifications } from "../redux/actions/certificationsAction";

const usePdfUrls = (certificationId, user_id, selectedCertificationData) => {
  const [pdfUrls, setPdfUrls] = useState({});

  useEffect(() => {
    const getPdfUrl = async (question_id) => {
      const startUrl = `${process.env.REACT_APP_SERVER_API}/api/document/pdf/`;

      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/document/get_id`, {
          params: {
            user_id: user_id,
            certification_id: certificationId,
            question_id: question_id
          }
        });

        const endUrl = response.data.pdfId;
        const pdf_url = startUrl + endUrl;
        return pdf_url;
      } catch (error) {
        console.error("Error fetching PDF ID:", error.message);
      }
    };

    // Create an object of question_id: pdf_url
    const pdfUrlsObject = {};
    const pdfUrlPromises = Object.keys(selectedCertificationData).map(async (question_id) => {
      const pdf_url = await getPdfUrl(question_id);
      pdfUrlsObject[question_id] = pdf_url;
    });

    // Update the state when all PDF URLs are fetched
    Promise.all(pdfUrlPromises).then(() => {
      setPdfUrls(pdfUrlsObject);
    });

  }, [certificationId, selectedCertificationData, user_id]);

  return pdfUrls;
};

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedInterestedCertifications, setEditedInterestedCertifications] = useState([]);
  const [selectedCertification, setSelectedCertification] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedCertificationData, setSelectedCertificationData] = useState([]);

  const getCertificationData = async (certificationId) => {
    const getCertificateOptions = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certification/records/getcertificationrecord`, {
      params: {
        user_id: user._id,
        certification_id: certificationId
      }
    });
    const dbAnswers = getCertificateOptions.data.certification_response;
    setSelectedCertificationData(dbAnswers);
  }

  const pdfUrls = usePdfUrls(selectedCertification?._id, user._id, selectedCertificationData);

  const toggleReadMore = (certification) => {
    setSelectedCertification(certification);
    getCertificationData(certification._id);
    setVisiblePopup(true);
  };

  const handlePopupCancel = () => {
    setVisiblePopup(false);
  };
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
  const getAllQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certification/questions/getallcertificationquestions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  };

  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getAllQuestions();
        setAllQuestions(questions);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);


  const getQuestionContent = (questionId) => {
    const question = allQuestions.find((q) => q._id === questionId);
    return question ? question.content : "Question not found";
  };
  const handleSave = async () => {
    console.log(editedInterestedCertifications);
    console.log(editedCompanyName);
    console.log(editedName);
    console.log(editedPassword);
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/users/profile/${user._id}`,
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
                        {userData.completed_certification.length > 0
                          ? certifications
                            .filter((certification) => userData.completed_certification.includes(certification._id))
                            .map((certification) => (
                              <button className="completed_certifications" onClick={() => toggleReadMore(certification)}>
                                {certification.name}
                              </button>
                            )) : (<input
                              value={
                                'None'}
                              readOnly
                              className="readOnlyInputStyleProfile"
                            />)}


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
      <Modal
        title={selectedCertification.name}
        visible={visiblePopup}
        onCancel={handlePopupCancel}
        footer={null}
      >
        {console.log("selectedCertification: ", selectedCertification)}
        {Object.entries(selectedCertificationData).map(([key, value], index) => (
          <div key={index}>
            <div className="reviewBox">
              <h6 className="questionReview">{`Question ${index + 1}`}: {getQuestionContent(key)}</h6>
              {pdfUrls[key] ? (
                <h6 className="answerReview">{`Answer ${index + 1}`}: <a href={pdfUrls[key]}>{JSON.stringify(value)}</a></h6>
              ) : (
                <h6 className="answerReview">{`Answer ${index + 1}`}: {JSON.stringify(value)}</h6>
              )}
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default Profile;
