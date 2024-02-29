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
import { Select } from 'antd';
const { Option } = Select;

const { Dragger } = Upload;

function Women_Owned_Small_Businesses_Fill() {
    const slug = 'women-owned-small-businesses';
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
            const filteredQuestions2 = filteredQuestions.filter(question => question.index !== "130");
            return filteredQuestions2;
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
                        certification_id: "65e00a20d84f77326c4b0bba"
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
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchCertificate();
    }, []);

    const questions = (filteredQuestions || []).sort((a, b) => a.index - b.index);
    const questions_women_owned = questions.filter(question => question.heading === "Women-owned Small Businesses (wosb) Notice");
    const questions_eligibility_requirements = questions.filter(question => question.heading === "Eligibility Requirements");
    const questions_registration = questions.filter(question => question.heading === "Registration");
    const questions_general_information_status = questions.filter(question => question.heading === "General Information Section Status");
    const questions_real_estate = questions.filter(question => question.heading === "Real Estate");
    const questions_business_credit_references = questions.filter(question => question.heading === "Business/credit References");
    const questions_ownership_management_status = questions.filter(question => question.heading === "Ownership / Management Section Status");
    const questions_additional_information_status = questions.filter(question => question.heading === "Additional Information Section Status");
    const questions_wosb_certification_status = questions.filter(question => question.heading === "WOSB Certification Section Status");
    const questions_corporation_documents = questions.filter(question => question.heading === "Corporation Documents");
    const questions_sole_proprietorship_documents = questions.filter(question => question.heading === "Sole Proprietorship Documents");
    const questions_partnership_documents = questions.filter(question => question.heading === "Partnership Documents");
    const questions_llc_documents = questions.filter(question => question.heading === "LLC Documents");


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
                certification_id: "65e00a20d84f77326c4b0bba",
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
    const statesOnly = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "District of Columbia",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
        "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];
    const stateDict = {
        "Alabama": [""],
        "Alaska": [""],
        "Arizona": [""],
        "Arkansas": [""],
        "California": [
            "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", "Del Norte", "El Dorado", "Fresno",
            "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa",
            "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", "Placer", "Plumas", "Riverside", "Sacramento",
            "San Benito", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara",
            "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity",
            "Tulare", "Tuolumne", "Ventura", "Yolo", "Yuba"
        ],
        "Colorado": [""],
        "Connecticut": [
            "Fairfield", "Hartford", "Litchfield", "Middlesex", "New Haven", "New London", "Tolland", "Windham"
        ],
        "Delaware": [""],
        "District of Columbia": [""],
        "Florida": [
            "Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte", "Citrus", "Clay", "Collier", "Columbia",
            "DeSoto", "Dixie", "Duval", "Escambia", "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee",
            "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette", "Lake", "Lee",
            "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee",
            "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "St. Johns", "St. Lucie", "Santa Rosa", "Sarasota",
            "Seminole", "Sumter", "Suwannee", "Taylor", "Union", "Volusia", "Wakulla", "Walton", "Washington"
        ],
        "Georgia": [""],
        "Hawaii": [""],
        "Idaho": [""],
        "Illinois": [""],
        "Indiana": [""],
        "Iowa": [""],
        "Kansas": [""],
        "Kentucky": [""],
        "Louisiana": [""],
        "Maine": [""],
        "Maryland": [""],
        "Massachusetts": [""],
        "Michigan": [""],
        "Minnesota": [""],
        "Mississippi": [""],
        "Missouri": [""],
        "Montana": [""],
        "Nebraska": [""],
        "Nevada": [""],
        "New Hampshire": [""],
        "New Jersey": [
            "Atlantic", "Bergen", "Burlington", "Camden", "Cape May", "Cumberland", "Essex", "Gloucester", "Hudson",
            "Hunterdon", "Mercer", "Middlesex", "Monmouth", "Morris", "Ocean", "Passaic", "Salem", "Somerset", "Sussex", "Union", "Warren"
        ],
        "New Mexico": [""],
        "New York": [""],
        "North Carolina": [""],
        "North Dakota": [""],
        "Ohio": [""],
        "Oklahoma": [""],
        "Oregon": [""],
        "Pennsylvania": [""],
        "Rhode Island": [""],
        "South Carolina": [""],
        "South Dakota": [""],
        "Tennessee": [""],
        "Texas": [
            "Anderson", "Andrews", "Angelina", "Aransas", "Archer", "Armstrong", "Atascosa", "Austin", "Bailey", "Bandera", "Bastrop",
            "Baylor", "Bee", "Bell", "Bexar", "Blanco", "Borden", "Bosque", "Bowie", "Brazoria", "Brazos", "Brewster", "Briscoe", "Brooks",
            "Brown", "Burleson", "Burnet", "Caldwell", "Calhoun", "Callahan", "Cameron", "Camp", "Carson", "Cass", "Castro", "Chambers",
            "Cherokee", "Childress", "Clay", "Cochran", "Coke", "Coleman", "Collin", "Collingsworth", "Colorado", "Comal", "Comanche",
            "Concho", "Cooke", "Coryell", "Cottle", "Crane", "Crockett", "Crosby", "Culberson", "Dallam", "Dallas", "Dawson", "Deaf Smith",
            "Delta", "Denton", "DeWitt", "Dickens", "Dimmit", "Donley", "Duval", "Eastland", "Ector", "Edwards", "Ellis", "El Paso", "Erath",
            "Falls", "Fannin", "Fayette", "Fisher", "Floyd", "Foard", "Fort Bend", "Franklin", "Freestone", "Frio", "Gaines", "Galveston",
            "Garza", "Gillespie", "Glasscock", "Goliad", "Gonzales", "Gray", "Grayson", "Gregg", "Grimes", "Guadalupe", "Hale", "Hall",
            "Hamilton", "Hansford", "Hardeman", "Hardin", "Harris", "Harrison", "Hartley", "Haskell", "Hays", "Hemphill", "Henderson",
            "Hidalgo", "Hill", "Hockley", "Hood", "Hopkins", "Houston", "Howard", "Hudspeth", "Hunt", "Hutchinson", "Irion", "Jack", "Jackson",
            "Jasper", "Jeff Davis", "Jefferson", "Jim Hogg", "Jim Wells", "Johnson", "Jones", "Karnes", "Kaufman", "Kendall", "Kenedy", "Kent",
            "Kerr", "Kimble", "King", "Kinney", "Kleberg", "Knox", "Lamar", "Lamb", "Lampasas", "La Salle", "Lavaca", "Lee", "Leon", "Liberty",
            "Limestone", "Lipscomb", "Live Oak", "Llano", "Loving", "Lubbock", "Lynn", "McCulloch", "McLennan", "McMullen", "Madison", "Marion",
            "Martin", "Mason", "Matagorda", "Maverick", "Medina", "Menard", "Midland", "Milam", "Mills", "Mitchell", "Montague", "Montgomery",
            "Moore", "Morris", "Motley", "Nacogdoches", "Navarro", "Newton", "Nolan", "Nueces", "Ochiltree", "Oldham", "Orange", "Palo Pinto",
            "Panola", "Parker", "Parmer", "Pecos", "Polk", "Potter", "Presidio", "Rains", "Randall", "Reagan", "Real", "Red River", "Reeves",
            "Refugio", "Roberts", "Robertson", "Rockwall", "Runnels", "Rusk", "Sabine", "San Augustine", "San Jacinto", "San Patricio", "San Saba",
            "Schleicher", "Scurry", "Shackelford", "Shelby", "Sherman", "Smith", "Somervell", "Starr", "Stephens", "Sterling", "Stonewall", "Sutton",
            "Swisher", "Tarrant", "Taylor", "Terrell", "Terry", "Throckmorton", "Titus", "Tom Green", "Travis", "Trinity", "Tyler", "Upshur", "Upton",
            "Uvalde", "Val Verde", "Van Zandt", "Victoria", "Walker", "Waller", "Ward", "Washington", "Webb", "Wharton", "Wheeler", "Wichita",
            "Wilbarger", "Willacy", "Williamson", "Wilson", "Winkler", "Wise", "Wood", "Yoakum", "Young", "Zapata", "Zavala"
        ],
        "Utah": [""],
        "Vermont": [""],
        "Virginia": [""],
        "Washington": [""],
        "West Virginia": [""],
        "Wisconsin": [""],
        "Wyoming": [""]
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
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
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
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
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
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
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
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                    </div>
                );
            case 'heading':
                return null;
            case 'dropdown-single':

                return (
                    <div className="answer-area">
                        <select
                            name={`dropdown_single_${question._id}`}
                            className="selectStyle"
                            value={answer || ''}
                            onChange={(e) => handleInputChange(question, e.target.value)} {...isRequired}>
                            <option value="" disabled>Select an option</option>
                            {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                    </div>

                );

            case 'dropdown-multi':
                return (
                    <div className="answer-area">
                        <Select
                            mode="multiple"
                            name={`dropdown_multi_${question._id}`}
                            className="inputStyleMulti"
                            placeholder={`Select ${question.content}`}
                            style={{ width: '100%' }}
                            value={answer || []}
                            onChange={(selectedOptions) => handleInputChange(question, selectedOptions)}
                        >
                            {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                                <Option key={index} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    {question.notes && question.notes!=="" &&(
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
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
                            <h1 className="question-type">Women-owned Small Businesses (WOSB) Notice</h1>
                            <Divider className="todo-news-divider" />
                            {questions_women_owned.map((question, index) => (
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
                            {questions_eligibility_requirements.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Registration</h1>
                            <Divider className="todo-news-divider" />
                            {questions_registration.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                            <div className="questionStyle">
                                <h6 className="question">Select the STATE / COUNTY where your company's headquarters is located:</h6>
                                <div className="answer-area">
                                    <select
                                        name={`dropdown_single_65e0091dc9fae0151421ca0a`}
                                        className="selectStyle"
                                        onChange={(e) => setFormValues(prevValues => ({
                                            ...prevValues,
                                            ["65e0091dc9fae0151421ca0a"]: e.target.value,
                                        }))}
                                        required
                                    >
                                        <option value="" disabled>Select a state</option>
                                        {Array.isArray(statesOnly) && statesOnly.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                {stateDict[formValues["65e0091dc9fae0151421ca0a"]] && stateDict[formValues["65e0091dc9fae0151421ca0a"]].length > 1 && (
                                    <div className="answer-area">
                                        <select
                                            name={`dropdown_single_65e0091dc9fae0151421ca0a_county`}
                                            className="selectStyle"
                                            onChange={(e) => setFormValues(prevValues => ({
                                                ...prevValues,
                                                ["65e0091dc9fae0151421ca0a_county"]: `${prevValues["65e0091dc9fae0151421ca0a"]} - ${e.target.value}`,
                                            }))}
                                            required
                                        >
                                            <option value="" disabled>Select a county</option>
                                            {Array.isArray(stateDict[formValues["65e0091dc9fae0151421ca0a"]]) && stateDict[formValues["65e0091dc9fae0151421ca0a"]].map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <Divider />
                            </div>

                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">General Information Section Status</h1>
                            <Divider className="todo-news-divider" />
                            {questions_general_information_status.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Real Estate</h1>
                            <Divider className="todo-news-divider" />
                            {questions_real_estate.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Business/Credit References</h1>
                            <Divider className="todo-news-divider" />
                            {questions_business_credit_references.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Ownership/Management Section Status</h1>
                            <Divider className="todo-news-divider" />
                            {questions_ownership_management_status.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Additional Information Section Status</h1>
                            <Divider className="todo-news-divider" />
                            {questions_additional_information_status.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">WOSB Certification Section Status</h1>
                            <Divider className="todo-news-divider" />
                            {questions_wosb_certification_status.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Corporation Documents</h1>
                            <Divider className="todo-news-divider" />
                            {questions_corporation_documents.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Sole Proprietorship Documents</h1>
                            <Divider className="todo-news-divider" />
                            {questions_sole_proprietorship_documents.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">Partnership Documents</h1>
                            <Divider className="todo-news-divider" />
                            {questions_partnership_documents.map((question, index) => (
                                <div className="questionStyle" key={index}>
                                    <h6 className="question">{question.content}</h6>
                                    {renderQuestionInput(question)}
                                    <Divider />
                                </div>
                            ))}
                        </div>

                        <div className="sectionStyle">
                            <h1 className="question-type">LLC Documents</h1>
                            <Divider className="todo-news-divider" />
                            {questions_llc_documents.map((question, index) => (
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

export default Women_Owned_Small_Businesses_Fill;