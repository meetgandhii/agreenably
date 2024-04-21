import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Divider, Radio, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import CertificateNav2 from "../../../components/CertificateNav2";
import DefaultLayout from "../../../components/DefaultLayout";
import Spinner from "../../../components/Spinner";
import '../../../Stylesheet/certifications.css';
import { FaArrowLeft } from 'react-icons/fa';
import '../Edit/style.css'
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';
const { Option } = Select;

const { Dragger } = Upload;

function Women_Owned_Small_Businesses_Review() {
    const slug = 'women-owned-small-businesses';
    const navigate = useNavigate();
    const [certification, setCertification] = useState({});


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

    const save = async () => {
        const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");

        try {


            const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/certification/records/editcertificationrecord`, {
                user_id: user._id,
                certification_response: filteredFormValues,
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


    const onFinish = async () => {
        save();
        navigate('/certification/thankyou');
    };
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        getAllQuestions().then(questions => {
            setQuestions(questions);
            isLoading(false);
        }).catch(error => {
            console.error("Error fetching questions:", error);
        });
    }, []);
    const getQuestionContent = (questionId) => {
        const question = questions.find((q) => q._id === questionId);
        return question ? question.content : "Question not found";
    };

    const [formValues, setFormValues] = useState({});
    const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([questionId, answer]) => (
            answer !== "" && !(Array.isArray(answer) && answer.every(item => item === ""))
        ))
    );
    const backToCertificate = async () => {
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
        window.location.href = "/certification/women-owned-small-businesses/fill-questionnaire/page3"
    }
    const goBackToCertificationPage = async () => {
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
        window.location.href = "/certification/women-owned-small-businesses/fill-questionnaire/page3"
    }

    return (
        <div className="booking-car-container" style={{ height: loading ? "100vh" : "auto" }}>
            <CertificateNav2 />
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
                            {Object.entries(filteredFormValues).map(([questionId, answer], index) => (

                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{`Question ${index + 1}`}: {getQuestionContent(questionId)}</h6>
                                    <h6 className="question">{`Answer ${index + 1}`}: {JSON.stringify(answer)}</h6>
                                </div>

                            ))}
                        </div>

                        <button onClick={backToCertificate} className="agreenably-btn-edit">Edit</button>
                        <button onClick={onFinish} className="agreenably-btn-submit">Submit</button>
                    </>
                )}

            </div>
        </div>
    );

}

export default Women_Owned_Small_Businesses_Review;