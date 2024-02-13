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

function Women_Business_Enterprise_Review() {
    const { state } = useLocation();
    const slug = 'women-business-enterprise'
    
    const formData = state && state.formData;
    const filteredQuestions = state && state.filteredQuestions;
    console.log("filteredQuestions", filteredQuestions)
    const formDataArray = Object.entries(formData);
    const fetchCertificate = async () => {
        try {
            const response = await axios.get(`https://agreenably-website-server.onrender.com/api/certifications/certificate/${slug}`);
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
          
    
          const response = await axios.put("https://agreenably-website-server.onrender.com/api/certification/records/editcertificationrecord", {
            user_id: user._id,
            certification_response: formData,
            timestamp: timestamp,
            ongoing: "0",
            certification_id: certification._id,
          });
    
          const updateUserResponse = await axios.put("https://agreenably-website-server.onrender.com/api/users/submitcertificate", {
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
        window.location.href = "http://localhost:3000/certification/women-business-enterprise/fill-questionnaire"
    }
    const getQuestionContent = (questionId) => {
        const question = filteredQuestions.find((q) => q._id === questionId);
        return question ? question.content : "Question not found";
    };
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
                        <h6 className="question">{`Answer ${index + 1}`}: {JSON.stringify(value)}</h6>
                        
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

export default Women_Business_Enterprise_Review;