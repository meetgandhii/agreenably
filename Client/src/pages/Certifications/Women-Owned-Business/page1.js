import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Divider, Radio, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import CertificateNav from "../../../components/CertificateNav";
import DefaultLayout from "../../../components/DefaultLayout";
import Spinner from "../../../components/Spinner";
import '../../../Stylesheet/certifications.css';
import { FaArrowLeft } from 'react-icons/fa';
import '../Edit/style.css'
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';
const { Option } = Select;

const { Dragger } = Upload;

function Women_Owned_Small_Businesses_Page1() {
    const slug = 'women-owned-small-businesses';
    const navigate = useNavigate();
    const [certification, setCertification] = useState({});
    const [filteredQuestions, setFilteredQuestions] = useState([]);


    const [loading, isLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const getAllQuestions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certification/questions/getallcertificationquestions`);
            return response.data;
        } catch (error) {
            console.error("Error fetching questions:", error);
            throw error;
        }
    };

    const getFilteredQuestions = async (questionIds) => {
        try {
            const allQuestions = await getAllQuestions();
            const filteredQuestions = allQuestions.filter(question => questionIds.includes(question._id) && question.page_number == "1");
            console.log(filteredQuestions)
            return filteredQuestions;
        } catch (error) {
            console.error("Error getting filtered questions:", error);
            throw error;
        }
    };
    useEffect(() => {

        const fetchCertificateRecords = async () => {
            try {
                const certificationResponse = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certification/records/getcertificationrecord`, {
                    params: {
                        user_id: user._id,
                        certification_id: "661af7bafc61456139f44154"
                    }
                });
                console.log(user._id)
                console.log(certification._id)
                console.log("Certification response:", certificationResponse);
                if (certificationResponse.data && certificationResponse.data.certification_response) {
                    setFormValues(certificationResponse.data.certification_response);
                }
            } catch (error) {
                console.error("Error fetching certification response:", error);
            }
        };

        fetchCertificateRecords();

    }, []);

    const fetchCertificate = async () => {
        isLoading(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certifications/certificate/${slug}`);

            const fetchedCertification = response.data;
            setCertification(fetchedCertification);

            if (fetchedCertification["questions-in-cert"]) {
                const filteredQuestions = await getFilteredQuestions(fetchedCertification["questions-in-cert"]);
                setFilteredQuestions(filteredQuestions);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            isLoading(false);
        }
    };
    useEffect(() => {
        fetchCertificate();
    }, []);

    const questions = (filteredQuestions || []).sort((a, b) => a.index - b.index);
    const women_owned_small_businesses_notice_questions = questions.filter(question => question.heading === "Women-owned Small Businesses (wosb) Notice").sort((a, b) => a.index - b.index);
    const eligibility_requirements = questions.filter(question => question.heading === "Eligibility Requirements").sort((a, b) => a.index - b.index);
    const save = async () => {
        const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");

        try {


            const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationrecord`, {
                user_id: user._id,
                certification_response: formValues,
                timestamp: timestamp,
                ongoing: "0",
                certification_id: "661af7bafc61456139f44154",
            });

            const updateUserResponse = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/users/submitcertificate`, {
                userId: user._id,
                certificateId: "661af7bafc61456139f44154"
            });
        } catch (error) {
            console.error("Error while editing certification record:", error);
        }
    };

    const onFinish = async (values, e) => {
        e.preventDefault();
        if (
            values['661a0d9552c3ee0e2f865a3b'] === "No" ||
            values['661a0d9552c3ee0e2f865a3c'] === "No" ||
            values['661a0d9552c3ee0e2f865a3e'] === "No" ||
            values['661a0d9552c3ee0e2f865a3f'] === "Yes" ||
            values['661a0d9552c3ee0e2f865a40'] === "Yes" ||
            values['661a0d9552c3ee0e2f865a41'] === "No" ||
            values['661a0d9552c3ee0e2f865a42'] === "No" ||
            values['661a0d9552c3ee0e2f865a43'] === "No" ||
            values['661a0d9552c3ee0e2f865a44'] === "No" ||
            values['661a0d9552c3ee0e2f865a45'] === "Yes"
        ) {
            // console.log("formValues when you terminated: " + JSON.stringify(formValues))
            save();
            navigate('/certification/thankyou')
        } else {
            // console.log("formValues when you go ahead: " + JSON.stringify(formValues))
            try {
                const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationpage`, {
                    user_id: user._id,
                    page_number: "2",
                    certification_id: "661af7bafc61456139f44154"
                });        
                console.log(response.data)    
            } catch (error) {
                console.error("Error while editing certification record:", error);
            }
            navigate(`/certification/${slug}/fill-questionnaire/page2`, { state: { formData: values, filteredQuestions: filteredQuestions } });
        }
        // Pass form data as state

    };



    const [formValues, setFormValues] = useState({});

    const handleInputChange = async (question, value) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [question._id]: value,
        }));
    };

    const renderQuestionInput = (question, index) => {

        const answer = formValues[question._id];

        switch (question.type) {

            case 'single':
                return (
                    <div className="answer-area">
                        {question.notes && question.notes !== "" && (
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                        {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                            <label key={index} className="labelStyle">
                                <input
                                    type="radio"
                                    value={option}
                                    onChange={() => handleInputChange(question, option)}
                                    checked={option === answer}
                                    className="inputStyle"
                                    name={`radio_${question._id}`}
                                />
                                {option}
                            </label>
                        ))}

                    </div>
                );

            case 'heading':
                return null;

            default:
                return null;
        }
    };
    useEffect(() => {
        const updateCertificationRecord = async () => {
            if (Object.keys(formValues).length > 1) {
                try {
                    const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
                    const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationrecord`, {
                        user_id: user._id,
                        certification_response: formValues,
                        timestamp: timestamp,
                        ongoing: "1",
                        certification_id: certification._id,
                    });

                    console.log('Certification record updated:', response.data);
                } catch (error) {
                    console.error("Error while editing certification record:", error);
                }
            }
        };

        updateCertificationRecord();
    }, [formValues, user, certification]);
    const goBackToCertificationPage = () => {
        window.location.href = `/certification/${slug}`
    }

    return (
        <div className="booking-car-container" style={{ height: loading ? "100vh" : "auto" }}>
            <CertificateNav />
            <div className="booking-car-content">
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#f2f1f2', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={goBackToCertificationPage} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FaArrowLeft style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                    </button>
                    <h1 className="certification-name" style={{ margin: 0 }}> {certification.name}</h1>
                    <div style={{ width: '1.5rem' }}></div>
                </div>
                {loading ? (<Spinner />) : (
                    <>

                        <div className="certificate_questionnaire">
                            <h1 className="heading_managecertifications certificate_questionnaire_heading">Enter Information</h1>
                            <form onSubmit={(e) => onFinish(formValues, e)}>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Women-owned Small Businesses (WOSB) Notice</h1>
                                    <Divider className="todo-news-divider" />
                                    {women_owned_small_businesses_notice_questions.map((question, index) => (
                                        <div className="questionStyle" key={index}>
                                            <h6 className="question">{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Eligibility Requirements</h1>
                                    <Divider className="todo-news-divider" />
                                    {eligibility_requirements.map((question, index) => (
                                        (question.index < 9 || formValues["661a0d9552c3ee0e2f865a3a"] === "Yes - I would like to apply for WOSB certification") && (
                                            <div className="questionStyle" key={index}>
                                                <h6 className="question">{question.content}</h6>
                                                {renderQuestionInput(question)}
                                                <Divider />
                                            </div>
                                        )

                                    ))}
                                </div>

                                <button type="submit" className="agreenably-btn">
                                    Go next step
                                </button>
                            </form>
                        </div>
                    </>
                )}

            </div>
        </div>
    );

}

export default Women_Owned_Small_Businesses_Page1;