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
import './style.css'
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

function Women_Business_Enterprise_Fill() {
    const slug = 'women-business-enterprise'
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [certification, setCertification] = useState({});
    const [filteredQuestions, setFilteredQuestions] = useState([]);




    const user = JSON.parse(localStorage.getItem("user"));
    const getAllQuestions = async () => {
        try {
            const response = await axios.get("https://agreenably-website-server.onrender.com/api/certification/questions/getallcertificationquestions");
            return response.data;
        } catch (error) {
            console.error("Error fetching questions:", error);
            throw error;
        }
    };

    const getFilteredQuestions = async (questionIds) => {
        try {
            const allQuestions = await getAllQuestions();
            const filteredQuestions = allQuestions.filter(question => questionIds.includes(question._id));
            return filteredQuestions;
        } catch (error) {
            console.error("Error getting filtered questions:", error);
            throw error;
        }
    };
    useEffect(() => {
        const fetchCertificateRecords = async () => {
            try {
                const certificationResponse = await axios.get("https://agreenably-website-server.onrender.com/api/certification/records/getcertificationrecord", {
                    params: {
                        user_id: user._id,
                        certification_id: "65ca9a5286e7f38dadf2200e"
                    }
                });
                console.log(user._id)
                console.log(certification._id)
                console.log("Certification response:", certificationResponse);

                if (certificationResponse.data && certificationResponse.data.certification_response) {
                    // Set the form values with the retrieved certification response
                    setFormValues(certificationResponse.data.certification_response);
                }
            } catch (error) {
                console.error("Error fetching certification response:", error);
            }
        };

        fetchCertificateRecords();

    }, []);

    const fetchCertificate = async () => {
        try {
            const response = await axios.get(`https://agreenably-website-server.onrender.com/api/certifications/certificate/${slug}`);
            const fetchedCertification = response.data;
            setCertification(fetchedCertification);

            if (fetchedCertification["questions-in-cert"]) {
                const filteredQuestions = await getFilteredQuestions(fetchedCertification["questions-in-cert"]);
                setFilteredQuestions(filteredQuestions);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchCertificate();
    }, []);

    const questions = (filteredQuestions || []).sort((a, b) => a.index - b.index);
    const questions_no_heading = questions.filter(question => question.heading === "No Heading");
    const questions_business_lookup = questions.filter(question => question.heading === "Business Lookup");
    const questions_business_information = questions.filter(question => question.heading === "Business Information");
    const questions_business_contact_information = questions.filter(question => question.heading === "Business Contact Information");
    const questions_company_contact_person = questions.filter(question => question.heading === "Company Contact Person");

    const onFinish = (values, e) => {
        e.preventDefault();
        console.log("Form values:", values);

        // Pass form data as state
        navigate(`review`, { state: { formData: values, filteredQuestions: filteredQuestions } });
    };



    const [formValues, setFormValues] = useState({});

    const handleInputChange = async (question, value) => {
        if (question.type === 'file') {
            const file = value;
            const fileName = file.name;
            const uploadData = {
                user_id: user._id,
                certification_id: "65ca9a5286e7f38dadf2200e",
                question_id: question._id,
            };
            const formData = new FormData();
            formData.append('pdf', file);
            Object.entries(uploadData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            try {
                const response = await axios.post("https://agreenably-website-server.onrender.com/api/document/upload", formData);
                
                console.log("File response is: ", response);
                setFormValues(prevValues => ({
                    ...prevValues,
                    [question._id]: fileName,
                }));
            } catch (error) {
                console.error("Error uploading file:", error);
            }
            
        } else {
            setFormValues(prevValues => ({
                ...prevValues,
                [question._id]: value,
            }));
        }
    };

    const isVisible = (question, index) => {
        if (question.heading === "No Heading") {
            if (
                (index !== 16 || formValues["65ca983e9cd5bd6bacb14983"] === "Sole Proprietorships") &&
                (index !== 17 || formValues["65ca983e9cd5bd6bacb14983"] === "Partnerships") &&
                (index !== 18 || formValues["65ca983e9cd5bd6bacb14983"] === "Partnerships") &&
                (index !== 19 || formValues["65ca983e9cd5bd6bacb14986"]) &&
                (index !== 20 || formValues["65ca983e9cd5bd6bacb14986"]) &&
                (index !== 21 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                (index !== 22 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                (index !== 23 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                (index !== 24 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                (index !== 25 || formValues["65ca983e9cd5bd6bacb14983"] === "Limited Liability Corporations")
            ) {
                return true;
            }
        } else if (question.heading === "Business Lookup" ||
            question.heading === "Business Information" ||
            question.heading === "Business Contact Information" ||
            question.heading === "Company Contact Person") {
            return true;
        }
        return false;
    };
    const getPdfUrl = async (certification_id, user_id, question_id) => {
        const startUrl = "https://agreenably-website-server.onrender.com/api/document/pdf/";
    
        try {
            const response = await axios.get("https://agreenably-website-server.onrender.com/api/document/get_id", {
                params: {
                    user_id: user_id,
                    certification_id: certification_id,
                    question_id: question_id
                }
            });
    
            const endUrl = response.data.pdfId;
            const pdf_url = startUrl + endUrl;
            console.log("pdf_url: ", pdf_url);
            return pdf_url;
        } catch (error) {
            console.error("Error fetching PDF ID:", error.message);
            // Handle the error, e.g., return a default URL or throw an error
            return "https://agreenably-website-server.onrender.com/default-pdf-url";
        }
    };
    
    const renderQuestionInput = (question, index) => {

        const isVisibleCheck = isVisible(question, index);
        const isRequired = isVisibleCheck ? { required: true } : {};
        const isFileRequired = isRequired && !formValues[question._id] ? { required: true } : {};
        const answer = formValues[question._id];

        switch (question.type) {
            case 'text':
                return (
                    <div className="answer-area">
                        <input type="text"
                            name={`text_${question._id}`}
                            className="inputStyleText"
                            placeholder="Enter text here..."
                            value={answer || ''}
                            onChange={(e) => handleInputChange(question, e.target.value)} {...isRequired} />
                    </div>
                );
            case 'single':
                return (
                    <div className="answer-area">
                        {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                            <label key={index} className="labelStyle">
                                <input
                                    type="radio"
                                    value={option}
                                    {...isRequired}
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
            case 'multi':
                return (
                    <div className="answer-area">
                        {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                            <label key={index} className="labelStyle">
                                <input
                                    type="checkbox"
                                    name={`checkbox_${question._id}`}
                                    value={option}
                                    className="inputStyleMulti"
                                    checked={answer && answer.includes(option)}
                                    {...isRequired}
                                    onChange={() => handleInputChange(question, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'file':
                return (
                    <div className="answer-area">
                        <label className="custom-file-upload">
                            <input type="file"
                                className="inputStyleFile"
                                name={`file_${question._id}`}
                                onChange={(e) => handleInputChange(question, e.target.files[0])}
                                {...isFileRequired}
                            />
                            Choose a File
                        </label>
                        
                        <p>Choosen file: {answer}</p>
                    </div>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        const updateCertificationRecord = async () => {
            if (Object.keys(formValues).length > 0) {
                try {
                    const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
                    const response = await axios.put("https://agreenably-website-server.onrender.com/api/certification/records/editcertificationrecord", {
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
        <div className="booking-car-container">
            <CertificateNav />
            <div className="booking-car-content">
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#f2f1f2', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={goBackToCertificationPage} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FaArrowLeft style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                    </button>
                    <h1 className="certification-name" style={{ margin: 0 }}> {certification.name}</h1>
                    <div style={{ width: '1.5rem' }}></div>
                </div>
                <div className="certificate_questionnaire">
                    <h1 className="heading_managecertifications certificate_questionnaire_heading">Enter Information</h1>
                    <form onSubmit={(e) => onFinish(formValues, e)}>
                        <div className="sectionStyle">
                            <h1 className="question-type">Let's get started</h1>
                            <Divider className="todo-news-divider" />
                            {questions_no_heading.map((question, index) => (
                                ((index !== 16 || formValues["65ca983e9cd5bd6bacb14983"] === "Sole Proprietorships") &&
                                    (index !== 17 || formValues["65ca983e9cd5bd6bacb14983"] === "Partnerships") &&
                                    (index !== 18 || formValues["65ca983e9cd5bd6bacb14983"] === "Partnerships") &&
                                    (index !== 19 || formValues["65ca983e9cd5bd6bacb14986"]) &&
                                    (index !== 20 || formValues["65ca983e9cd5bd6bacb14986"]) &&
                                    (index !== 21 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                                    (index !== 22 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                                    (index !== 23 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                                    (index !== 24 || formValues["65ca983e9cd5bd6bacb14983"] === "Corporations") &&
                                    (index !== 25 || formValues["65ca983e9cd5bd6bacb14983"] === "Limited Liability Corporations")
                                ) && (
                                    <div className="questionStyle" key={index}>
                                        <h6 className="question">{question.content}</h6>
                                        {renderQuestionInput(question, index)}
                                        <Divider />
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Business Lookup</h1>
                            <Divider className="todo-news-divider" />
                            {questions_business_lookup.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        <div className="sectionStyle">
                            <h1 className="question-type">Business Information</h1>
                            <Divider className="todo-news-divider" />
                            {questions_business_information.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        <div className="sectionStyle">
                            <h1 className="question-type">Business Contact Information</h1>
                            <Divider className="todo-news-divider" />
                            {questions_business_contact_information.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        <div className="sectionStyle">
                            <h1 className="question-type">Company Contact Person</h1>
                            <Divider className="todo-news-divider" />
                            {questions_company_contact_person.map((question, index) => (
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
            </div>
        </div>
    );

}

export default Women_Business_Enterprise_Fill;