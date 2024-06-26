import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Divider, Radio, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CertificateNav2 from "../../../components/CertificateNav2";
import DefaultLayout from "../../../components/DefaultLayout";
import Spinner from "../../../components/Spinner";
import '../../../Stylesheet/certifications.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Women_Owned_Small_Businesses_Review() {
    const slug = 'women-owned-small-businesses'
    const { state } = useLocation();

    const formData = state && state.formData;
    const filteredQuestions = state && state.filteredQuestions;
    console.log("filteredQuestions", filteredQuestions)
    const formDataArray = Object.entries(formData);
    const fetchCertificate = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/certifications/certificate/${slug}`);
            const fetchedCertification = response.data;
            setCertification(fetchedCertification);


        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchCertificate();
    }, []);
    const [certification, setCertification] = useState({});
    const save = async () => {
        const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");

        try {


            const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationrecord`, {
                user_id: user._id,
                certification_response: formData,
                timestamp: timestamp,
                ongoing: "0",
                certification_id: certification._id,
            });

            const updateUserResponse = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/users/submitcertificate`, {
                userId: user._id,
                certificateId: certification._id
            });
            window.location.href = "/"
        } catch (error) {
            console.error("Error while editing certification record:", error);
        }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const backToCertificate = () => {
        window.location.href = "/certification/women-business-enterprise/fill-questionnaire"
    }
    const getQuestionContent = (questionId) => {
        const question = filteredQuestions.find((q) => q._id === questionId);
        return question ? question.content : "Question not found";
    };

    const [pdfUrls, setPdfUrls] = useState({});
    useEffect(() => {
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
                return ""; // Return an empty string if PDF is not available
            }
        };

        // Create an object of question_id: pdf_url
        const pdfUrlsObject = {};
        const pdfUrlPromises = Object.keys(formData).map(async (question_id) => {
            const pdf_url = await getPdfUrl("65ca9a5286e7f38dadf2200e", user._id, question_id);
            pdfUrlsObject[question_id] = pdf_url;
        });

        // Update the state when all PDF URLs are fetched
        Promise.all(pdfUrlPromises).then(() => {
            setPdfUrls(pdfUrlsObject);
        });

    }, [formData, user._id]);


    return (
        <div className="booking-car-container">
            <CertificateNav2 />
            <div className="booking-car-content" style={{ height: formData.length < 7 ? "100vh" : "auto" }}>
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#f2f1f2', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={backToCertificate} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FaArrowLeft style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                    </button>
                    <h1 className="certification-name" style={{ margin: 0 }}> {certification.name}</h1>
                    <div style={{ width: '1.5rem' }}></div>
                </div>
                <div className="certificate_questionnaire">
                    <h1 className="heading_managecertifications certificate_questionnaire_heading">
                        Review Information
                    </h1>

                    {Object.entries(formData).map(([key, value], index) => (
                        <div className="questionStyle" key={index}>
                            <h6 className="question">{`Question ${index + 1}`}: {getQuestionContent(key)}</h6>

                            {pdfUrls[key] ? (
                                <h6 className="question">{`Answer ${index + 1}`}: <a href={pdfUrls[key]}>{JSON.stringify(value)}</a></h6>
                            ) : (
                                <h6 className="question">{`Answer ${index + 1}`}: {JSON.stringify(value)}</h6>
                            )}
                            <Divider />
                        </div>
                    ))}
                </div>
                <button onClick={backToCertificate} className="agreenably-btn-edit">Edit</button>
                <button onClick={save} className="agreenably-btn-submit">Submit</button>
            </div>
        </div>

    );

}

export default Women_Owned_Small_Businesses_Review;