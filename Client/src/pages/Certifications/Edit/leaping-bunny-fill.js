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

function Leaping_Bunny_Fill() {
    const slug = 'leaping-bunny'
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [certification, setCertification] = useState({});
    const [filteredQuestions, setFilteredQuestions] = useState([]);




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
            const filteredQuestions = allQuestions.filter(question => questionIds.includes(question._id));
            console.log(questionIds);
            console.log(allQuestions);
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
                        certification_id: "65c8eee6e1b1ab8b8db37c5d"
                    }
                });
                console.log(user._id)
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
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certifications/certificate/${slug}`);
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
    const questions_registration = questions.filter(question => question.heading === "Registration");
    const questions_your_contact_information = questions.filter(question => question.heading === "Your Contact Information");
    const questions_about_your_company = questions.filter(question => question.heading === "About Your Company");
    const questions_company_details = questions.filter(question => question.heading === "Company Details");
    const questions_fixed_cutoff_date = questions.filter(question => question.heading === "Fixed Cut-Off Date");
    const questions_company_policy_on_animal_testing = questions.filter(question => question.heading === "Company Policy on Animal Testing");
    const questions_supply_chain_management = questions.filter(question => question.heading === "Supply Chain Management");
    const questions_supply_chain_management_pt_2 = questions.filter(question => question.heading === "Supply Chain Management pt. 2");
    const questions_distributors = questions.filter(question => question.heading === "Distributors");
    const questions_brands_products_and_availability = questions.filter(question => question.heading === "Brands, Products and Availability");
    const questions_your_company_declaration = questions.filter(question => question.heading === "Your Company Declaration");

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
                certification_id: "65c8eee6e1b1ab8b8db37c5d",
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

        } else {
            setFormValues(prevValues => ({
                ...prevValues,
                [question._id]: value,
            }));
        }
    };

    const isVisible = (question, index) => {
        if (question.heading === "Registration") {
            if (index !== 3 || formValues["65ca843476ec676fbac97a1e"] === "No") {
                return true;
            }
        } else if (question.heading === "Your Contact Information") {
            if (formValues["65ca843476ec676fbac97a1e"] === "No") {
                return false;
            }
            // Add more conditions if needed
            return true;
        } else if (question.heading === "About Your Company") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Company Details") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Fixed Cut-Off Date") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Company Policy on Animal Testing") {
            if (
                index !== 4 ||
                formValues["65ca843476ec676fbac97a32"] === "Yes" ||
                formValues["65ca843476ec676fbac97a33"] === "Yes" ||
                formValues["65ca843476ec676fbac97a34"] === "Yes" ||
                formValues["65ca843476ec676fbac97a35"] === "Yes"
            ) {
                return true;
            }
        } else if (question.heading === "Supply Chain Management") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Supply Chain Management pt. 2") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Distributors") {
            if (index !== 1 || formValues["65ca843476ec676fbac97a42"] === "Yes") {
                return true;
            }
        } else if (question.heading === "Brands, Products and Availability") {
            // Add conditions if needed
            return true;
        } else if (question.heading === "Your Company Declaration") {
            // Add conditions if needed
            return true;
        }

        return false;
    };

    const getPdfUrl = async (certification_id, user_id, question_id) => {
        const startUrl = `${process.env.REACT_APP_SERVER_API}/api/document/pdf/`;

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/document/get_id`, {
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
            return `${process.env.REACT_APP_SERVER_API}/default-pdf-url`;
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
        window.location.href = "/certification/leaping-bunny"
    }
    const [supplierCount, setSupplierCount] = useState(1);
    const [supplierAnswers, setSupplierAnswers] = useState({});
    const [manufacturerCount, setManufacturerCount] = useState(1);
    const [manufacturerAnswers, setManufacturerAnswers] = useState({});

    const addSupplier = () => {
        setSupplierCount(prevCount => prevCount + 1);
    }
    const addManufacturer = () => {
        setManufacturerCount(prevCount => prevCount + 1);
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
                            <h1 className="question-type">Registration</h1>
                            <Divider className="todo-news-divider" />
                            {questions_registration.map((question, index) => (
                                ((index !== 3 || formValues["65ca843476ec676fbac97a1e"] === "No")
                                ) && (
                                    <div className="questionStyle" key={index}>
                                        <h6 className="question">{question.content}</h6>
                                        {renderQuestionInput(question, index)}
                                        <Divider />
                                    </div>
                                )
                            ))}
                        </div>
                        {formValues["65ca843476ec676fbac97a1e"] === "No" && (
                            <>
                                {formValues["65ca843476ec676fbac97a1f"] === "Yes" && (
                                    <>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Your Contact Information</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_your_contact_information.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">About Your Company</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_about_your_company.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Company Details</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_company_details.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Fixed Cut-Off Date</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_fixed_cutoff_date.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Company Policy on Animal Testing</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_company_policy_on_animal_testing.map((question, index) => (
                                                ((index !== 4 || formValues["65ca843476ec676fbac97a32"] === "Yes" || formValues["65ca843476ec676fbac97a33"] === "Yes" || formValues["65ca843476ec676fbac97a34"] === "Yes" || formValues["65ca843476ec676fbac97a35"] === "Yes")
                                                ) && (
                                                    <div className="questionStyle" key={index}>
                                                        <h6 className="question">{question.content}</h6>
                                                        {renderQuestionInput(question)}
                                                        <Divider />
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Supply Chain Management</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_supply_chain_management.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        {/* <div className="sectionStyle">
                                            <h1 className="question-type">Supply Chain Management</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_supply_chain_management_pt_2.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                    {(index + 1) % 4 === 0 && (index + 1) % 8 !== 0 && (
                                                        <button className="agreenably-btn" key={`addSupplier_${((index + 1) % 4)+1}`} onClick={{addSupplier}}>
                                                            Add Supplier
                                                        </button>
                                                    )}
                                                    {(index + 1) % 4 === 0 && (index + 1) % 8 === 0 && (
                                                        <button className="agreenably-btn" key={`addManufacturer_${((index + 1) % 8)+1}`} onClick={{addManufacturer}}>
                                                            Add Manufacturer
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div> */}

                                        <div className="sectionStyle">
                                            <h1 className="question-type">Supply Chain Management</h1>
                                            <Divider className="todo-news-divider" />

                                            {/* Render questions for suppliers */}

                                            {[...Array(supplierCount)].map((_, supplierIndex) => (
                                                <div key={`supplier_${supplierIndex}`}>
                                                    <h1 className="question-type">Supplier {supplierIndex + 1}</h1>
                                                    {questions_supply_chain_management_pt_2.slice(0, 4).map((question, index) => (
                                                        <div className="questionStyle" key={`supplier_${supplierIndex}_${index}`}>
                                                            <h6 className="question">{question.content}</h6>
                                                            {renderQuestionInput(question)}
                                                            <Divider />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}


                                            {/* Render "Add Supplier" button */}
                                            <button className="agreenably-btn" onClick={addSupplier}>
                                                Add Supplier
                                            </button>

                                            {/* Render questions for manufacturers */}
                                            {[...Array(manufacturerCount)].map((_, manufacturerIndex) => (
                                                <div key={`manufacturer_${manufacturerIndex}`}>
                                                <h1 className="question-type">Manufacturer {manufacturerIndex + 1}</h1>
                                                {questions_supply_chain_management_pt_2.slice(4, 8).map((question, index) => (
                                                    <div className="questionStyle" key={`manufacturer_${manufacturerIndex}_${index}`}>
                                                        <h6 className="question">{question.content}</h6>
                                                        {renderQuestionInput(question)}
                                                        <Divider />
                                                    </div>
                                                ))}
                                                </div>
                                            ))}

                                            {/* Render "Add Manufacturer" button */}
                                            <button className="agreenably-btn" onClick={addManufacturer}>
                                                Add Manufacturer
                                            </button>
                                        </div>

                                        <div className="sectionStyle">
                                            <h1 className="question-type">Distributors</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_distributors.map((question, index) => (
                                                ((index !== 1 || formValues["65ca843476ec676fbac97a42"] === "Yes")
                                                ) && (
                                                    <div className="questionStyle" key={index}>
                                                        <h6 className="question">{question.content}</h6>
                                                        {renderQuestionInput(question)}
                                                        <Divider />
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Brands, Products and Availability</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_brands_products_and_availability.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sectionStyle">
                                            <h1 className="question-type">Your Company Declaration</h1>
                                            <Divider className="todo-news-divider" />
                                            {questions_your_company_declaration.map((question, index) => (
                                                <div className="questionStyle" key={index}>
                                                    <h6 className="question">{question.content}</h6>
                                                    {renderQuestionInput(question)}
                                                    <Divider />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}


                        <button type="submit" className="agreenably-btn">
                            Go next step
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Leaping_Bunny_Fill;