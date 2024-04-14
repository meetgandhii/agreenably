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

function Women_Owned_Small_Businesses_Page2() {
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
            const filteredQuestions = allQuestions.filter(question => questionIds.includes(question._id) && question.page_number == "2");
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
            } finally {
                if (formValues["661a0d9552c3ee0e2f865a48"]) {
                    setType(formValues["661a0d9552c3ee0e2f865a48"]+" Documents"); 
                } else {
                    setType("Placeholder"); // Set a default value if not found in the database
                }
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
            if (formValues["661a0d9552c3ee0e2f865a48"]) {
                setType(formValues["661a0d9552c3ee0e2f865a48"]+" Documents"); 
            } else {
                setType("Placeholder"); // Set a default value if not found in the database
            }
        }
    };
    useEffect(() => {
        fetchCertificate();
    }, []);
    const [type, setType] = useState("Placeholder")
    const questions = (filteredQuestions || []).sort((a, b) => a.index - b.index);
    const registration_questions = questions.filter(question => question.heading === "Registration").sort((a, b) => a.index - b.index);
    const [documents_required_questions, setDocuments_required_questions] = useState({})
    
    
    useEffect(() => {
        setDocuments_required_questions(questions.filter(question => question.heading === type).sort((a, b) => a.index - b.index))
    }, [type]);
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
         {
            // console.log("formValues when you go ahead: " + JSON.stringify(formValues))
            try {
                const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationpage`, {
                    user_id: user._id,
                    page_number: "3",
                    certification_id: "661af7bafc61456139f44154"
                });
                console.log(response.data)
            } catch (error) {
                console.error("Error while editing certification record:", error);
            }
            navigate(`/certification/women-owned-small-businesses/fill-questionnaire/page3`, { state: { formData: values, filteredQuestions: filteredQuestions } });
        }
        // Pass form data as state

    };



    const [formValues, setFormValues] = useState({});

    const handleInputChange = async (question, value) => {
        if (question._id === "661a0d9552c3ee0e2f865a48") {
            console.log(value + " Documents")
            setType(value + " Documents")
        }
        if (question.type === 'file') {
            const file = value;
            const fileName = file.name;
            const uploadData = {
                user_id: user._id,
                certification_id: "65e00a20d84f77326c4b0bba",
                question_id: question._id,
            };
            const formData = new FormData();
            formData.append('pdf', file);
            Object.entries(uploadData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/document/upload`, formData);

                console.log("File response is: ", response);
                setFormValues(prevValues => ({
                    ...prevValues,
                    [question._id]: fileName,
                }));
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
        else {
            setFormValues(prevValues => ({
                ...prevValues,
                [question._id]: value,
            }));
        }
    };

    const renderQuestionInput = (question, index) => {

        const answer = formValues[question._id];

        switch (question.type) {

            case 'file':
                return (
                    <div className="answer-area">
                        {question.notes && question.notes !== "" && (
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                        <label className="custom-file-upload">
                            <input type="file"
                                className="inputStyleFile"
                                name={`file_${question._id}`}
                                onChange={(e) => handleInputChange(question, e.target.files[0])}

                            />
                            Choose a File
                        </label>

                        <p>Choosen file: {answer}</p>

                    </div>
                );
            case 'heading':
                return null;
            case 'dropdown-single':
                return (
                    <div className="answer-area">
                        {question.notes && question.notes !== "" && (
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                        <select
                            name={`dropdown_single_${question._id}`}
                            className="selectStyle"
                            value={answer || ''}
                            onChange={(e) => handleInputChange(question, e.target.value)} >
                            <option value="" disabled>Select an option</option>
                            {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>

                    </div>

                );


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
        window.location.href = "/certification/women-business-enterprise"
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
                                    <h1 className="question-type">Registration</h1>
                                    <Divider className="todo-news-divider" />
                                    {registration_questions.map((question, index) => (
                                        <div className="questionStyle" key={index}>
                                            <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Documents Required</h1>
                                    <Divider className="todo-news-divider" />
                                    {documents_required_questions.map((question, index) => (
                                        <div className="questionStyle" key={index}>
                                            <h6 className="question">{question.content}</h6>
                                            {renderQuestionInput(question)}
                                            <Divider />
                                        </div>
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

export default Women_Owned_Small_Businesses_Page2;