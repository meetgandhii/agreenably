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

function Women_Owned_Small_Businesses_Page3() {
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
            const filteredQuestions = allQuestions.filter(question => questionIds.includes(question._id) && question.page_number == "3" && question.index !== "26");
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
    const extraQuestion = { "_id": { "$oid": "661b778780100d41e2594885" }, "type": "dropdown-single", "type_content": [{ "Alabama": "" }, { "Alaska": "" }, { "Arizona": "" }, { "Arkansas": "" }, { "California": ["Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", "Tuolumne", "Ventura", "Yolo", "Yuba"] }, { "Colorado": "" }, { "Connecticut": ["Fairfield", "Hartford", "Litchfield", "Middlesex", "New Haven", "New London", "Tolland", "Windham"] }, { "Delaware": "" }, { "District of Columbia": "" }, { "Florida": ["Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte", "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia", "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee", "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "St. Johns", "St. Lucie", "Santa Rosa", "Sarasota", "Seminole", "Sumter", "Suwannee", "Taylor", "Union", "Volusia", "Wakulla", "Walton", "Washington"] }, { "Georgia": "" }, { "Hawaii": "" }, { "Idaho": "" }, { "Illinois": "" }, { "Indiana": "" }, { "Iowa": "" }, { "Kansas": "" }, { "Kentucky": "" }, { "Louisiana": "" }, { "Maine": "" }, { "Maryland": "" }, { "Massachusetts": "" }, { "Michigan": "" }, { "Minnesota": "" }, { "Mississippi": "" }, { "Missouri": "" }, { "Montana": "" }, { "Nebraska": "" }, { "Nevada": "" }, { "New Hampshire": "" }, { "New Jersey": ["Atlantic", "Bergen", "Burlington", "Camden", "Cape May", "Cumberland", "Essex", "Gloucester", "Hudson", "Hunterdon", "Mercer", "Middlesex", "Monmouth", "Morris", "Ocean", "Passaic", "Salem", "Somerset", "Sussex", "Union", "Warren"] }, { "New Mexico": "" }, { "New York": "" }, { "North Carolina": "" }, { "North Dakota": "" }, { "Ohio": "" }, { "Oklahoma": "" }, { "Oregon": "" }, { "Pennsylvania": "" }, { "Rhode Island": "" }, { "South Carolina": "" }, { "South Dakota": "" }, { "Tennessee": "" }, { "Texas": ["Anderson", "Andrews", "Angelina", "Aransas", "Archer", "Armstrong", "Atascosa", "Austin", "Bailey", "Bandera", "Bastrop", "Baylor", "Bee", "Bell", "Bexar", "Blanco", "Borden", "Bosque", "Bowie", "Brazoria", "Brazos", "Brewster", "Briscoe", "Brooks", "Brown", "Burleson", "Burnet", "Caldwell", "Calhoun", "Callahan", "Cameron", "Camp", "Carson", "Cass", "Castro", "Chambers", "Cherokee", "Childress", "Clay", "Cochran", "Coke", "Coleman", "Collin", "Collingsworth", "Colorado", "Comal", "Comanche", "Concho", "Cooke", "Coryell", "Cottle", "Crane", "Crockett", "Crosby", "Culberson", "Dallam", "Dallas", "Dawson", "Deaf Smith", "Delta", "Denton", "DeWitt", "Dickens", "Dimmit", "Donley", "Duval", "Eastland", "Ector", "Edwards", "Ellis", "El Paso", "Erath", "Falls", "Fannin", "Fayette", "Fisher", "Floyd", "Foard", "Fort Bend", "Franklin", "Freestone", "Frio", "Gaines", "Galveston", "Garza", "Gillespie", "Glasscock", "Goliad", "Gonzales", "Gray", "Grayson", "Gregg", "Grimes", "Guadalupe", "Hale", "Hall", "Hamilton", "Hansford", "Hardeman", "Hardin", "Harris", "Harrison", "Hartley", "Haskell", "Hays", "Hemphill", "Henderson", "Hidalgo", "Hill", "Hockley", "Hood", "Hopkins", "Houston", "Howard", "Hudspeth", "Hunt", "Hutchinson", "Irion", "Jack", "Jackson", "Jasper", "Jeff Davis", "Jefferson", "Jim Hogg", "Jim Wells", "Johnson", "Jones", "Karnes", "Kaufman", "Kendall", "Kenedy", "Kent", "Kerr", "Kimble", "King", "Kinney", "Kleberg", "Knox", "Lamar", "Lamb", "Lampasas", "La Salle", "Lavaca", "Lee", "Leon", "Liberty", "Limestone", "Lipscomb", "Live Oak", "Llano", "Loving", "Lubbock", "Lynn", "McCulloch", "McLennan", "McMullen", "Madison", "Marion", "Martin", "Mason", "Matagorda", "Maverick", "Medina", "Menard", "Midland", "Milam", "Mills", "Mitchell", "Montague", "Montgomery", "Moore", "Morris", "Motley", "Nacogdoches", "Navarro", "Newton", "Nolan", "Nueces", "Ochiltree", "Oldham", "Orange", "Palo Pinto", "Panola", "Parker", "Parmer", "Pecos", "Polk", "Potter", "Presidio", "Rains", "Randall", "Reagan", "Real", "Red River", "Reeves", "Refugio", "Roberts", "Robertson", "Rockwall", "Runnels", "Rusk", "Sabine", "San Augustine", "San Jacinto", "San Patricio", "San Saba", "Schleicher", "Scurry", "Shackelford", "Shelby", "Sherman", "Smith", "Somervell", "Starr", "Stephens", "Sterling", "Stonewall", "Sutton", "Swisher", "Tarrant", "Taylor", "Terrell", "Terry", "Throckmorton", "Titus", "Tom Green", "Travis", "Trinity", "Tyler", "Upshur", "Upton", "Uvalde", "Val Verde", "Van Zandt", "Victoria", "Walker", "Waller", "Ward", "Washington", "Webb", "Wharton", "Wheeler", "Wichita", "Wilbarger", "Willacy", "Williamson", "Wilson", "Winkler", "Wise", "Wood", "Yoakum", "Young", "Zapata", "Zavala"] }, { "Utah": "" }, { "Vermont": "" }, { "Virginia": "" }, { "Washington": "" }, { "West Virginia": "" }, { "Wisconsin": "" }, { "Wyoming": "" }], "content": "Select the STATE / COUNTY where your company's headquarters is located:", "heading": "Registration", "index": "26", "notes": "", "page_number": "3" }
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
    const registration_questions = questions.filter(question => question.heading === "Registration").sort((a, b) => a.index - b.index);
    const general_information_section_status_questions = questions.filter(question => question.heading === "General Information Section Status").sort((a, b) => a.index - b.index);
    const real_estate_questions = questions.filter(question => question.heading === "Real Estate").sort((a, b) => a.index - b.index);
    const business_credit_references_questions = questions.filter(question => question.heading === "Business/credit References").sort((a, b) => a.index - b.index);
    const ownership_management_section_status_questions = questions.filter(question => question.heading === "Ownership / Management Section Status").sort((a, b) => a.index - b.index);
    const additional_information_section_status_questions = questions.filter(question => question.heading === "Additional Information Section Status").sort((a, b) => a.index - b.index);
    const wosb_certification_section_status_questions = questions.filter(question => question.heading === "WOSB Certification Section Status").sort((a, b) => a.index - b.index);



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
                    page_number: "_review",
                    certification_id: "661af7bafc61456139f44154"
                });
                console.log(response.data)
            } catch (error) {
                console.error("Error while editing certification record:", error);
            }
            navigate(`/certification/women-owned-small-businesses/fill-questionnaire/page_review`, { state: { formData: values, filteredQuestions: filteredQuestions } });
        }
        // save();
        // navigate('/certification/thankyou')
        // Pass form data as state

    };



    const [formValues, setFormValues] = useState({});

    const handleInputChange = async (question, value) => {
        if (!(question._id in multiple_answer_dict)) {
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
            } else if (question.type === 'multi') {
                setFormValues(prevValues => ({
                    ...prevValues,
                    [question._id]: prevValues[question._id]
                        ? [...prevValues[question._id], value]  // If array exists, append value
                        : [value]  // If array doesn't exist, create new array with value
                }));
            }
            else {
                setFormValues(prevValues => ({
                    ...prevValues,
                    [question._id]: value,
                }));
            }
        }
    };

    // const multiple_answer_dict = {
    //     "661a0d9552c3ee0e2f865a8e": 10, "661a0d9552c3ee0e2f865a8f": 10,
    //     "661a0d9552c3ee0e2f865a91": 10, "661a0d9552c3ee0e2f865a92": 10,
    //     "661a0d9552c3ee0e2f865a94": 10, "661a0d9552c3ee0e2f865a95": 10, "661a0d9552c3ee0e2f865a96": 10, "661a0d9552c3ee0e2f865a97": 10, "661a0d9552c3ee0e2f865a98": 10, "661a0d9552c3ee0e2f865a99": 10,
    //     "661a0d9552c3ee0e2f865a9b": 10, "661a0d9552c3ee0e2f865a9c": 10, "661a0d9552c3ee0e2f865a9d": 10, "661a0d9552c3ee0e2f865a9e": 10, "661a0d9552c3ee0e2f865a9f": 10, "661a0d9552c3ee0e2f865aa0": 10, "661a0d9552c3ee0e2f865aa1": 10,
    //     "661a0d9552c3ee0e2f865aa4": 10, "661a0d9552c3ee0e2f865aa5": 10, "661a0d9552c3ee0e2f865aa6": 10, "661a0d9552c3ee0e2f865aa7": 10, "661a0d9552c3ee0e2f865aa8": 10,
    // }

    const multiple_answer_dict = {
        "661a0d9552c3ee0e2f865a8e": ["661a0d9552c3ee0e2f865a8e", "661a0d9552c3ee0e2f865a8f"], "661a0d9552c3ee0e2f865a8f": ["661a0d9552c3ee0e2f865a8e", "661a0d9552c3ee0e2f865a8f"],
        "661a0d9552c3ee0e2f865a91": ["661a0d9552c3ee0e2f865a91", "661a0d9552c3ee0e2f865a92"], "661a0d9552c3ee0e2f865a92": ["661a0d9552c3ee0e2f865a91", "661a0d9552c3ee0e2f865a92"],
        "661a0d9552c3ee0e2f865a94": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"], "661a0d9552c3ee0e2f865a95": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"], "661a0d9552c3ee0e2f865a96": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"], "661a0d9552c3ee0e2f865a97": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"], "661a0d9552c3ee0e2f865a98": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"], "661a0d9552c3ee0e2f865a99": ["661a0d9552c3ee0e2f865a94", "661a0d9552c3ee0e2f865a95", "661a0d9552c3ee0e2f865a96", "661a0d9552c3ee0e2f865a97", "661a0d9552c3ee0e2f865a98", "661a0d9552c3ee0e2f865a99"],
        "661a0d9552c3ee0e2f865a9b": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865a9c": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865a9d": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865a9e": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865a9f": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865aa0": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"], "661a0d9552c3ee0e2f865aa1": ["661a0d9552c3ee0e2f865a9b", "661a0d9552c3ee0e2f865a9c", "661a0d9552c3ee0e2f865a9d", "661a0d9552c3ee0e2f865a9e", "661a0d9552c3ee0e2f865a9f", "661a0d9552c3ee0e2f865aa0", "661a0d9552c3ee0e2f865aa1"],
        "661a0d9552c3ee0e2f865aa4": ["661a0d9552c3ee0e2f865aa4", "661a0d9552c3ee0e2f865aa5", "661a0d9552c3ee0e2f865aa6", "661a0d9552c3ee0e2f865aa7", "661a0d9552c3ee0e2f865aa8"], "661a0d9552c3ee0e2f865aa5": ["661a0d9552c3ee0e2f865aa4", "661a0d9552c3ee0e2f865aa5", "661a0d9552c3ee0e2f865aa6", "661a0d9552c3ee0e2f865aa7", "661a0d9552c3ee0e2f865aa8"], "661a0d9552c3ee0e2f865aa6": ["661a0d9552c3ee0e2f865aa4", "661a0d9552c3ee0e2f865aa5", "661a0d9552c3ee0e2f865aa6", "661a0d9552c3ee0e2f865aa7", "661a0d9552c3ee0e2f865aa8"], "661a0d9552c3ee0e2f865aa7": ["661a0d9552c3ee0e2f865aa4", "661a0d9552c3ee0e2f865aa5", "661a0d9552c3ee0e2f865aa6", "661a0d9552c3ee0e2f865aa7", "661a0d9552c3ee0e2f865aa8"], "661a0d9552c3ee0e2f865aa8": ["661a0d9552c3ee0e2f865aa4", "661a0d9552c3ee0e2f865aa5", "661a0d9552c3ee0e2f865aa6", "661a0d9552c3ee0e2f865aa7", "661a0d9552c3ee0e2f865aa8"]
    }
    const handleAddMore = (questionId) => {
        const questionIds = multiple_answer_dict[questionId];
        if (questionIds) {
            const updatedFormValues = { ...formValues };
            questionIds.forEach(id => {
                updatedFormValues[id] = [...(updatedFormValues[id] || []), ""];
            });
            setFormValues(updatedFormValues);
        }
    };
    const handleInputChangeMore = async (question, value, index) => {
        setFormValues(prevValues => {
            const newArray = [...prevValues[question._id]];
            newArray[index] = value;
            return {
                ...prevValues,
                [question._id]: newArray,
            };
        });
    };
    const renderQuestionInput = (question, index) => {

        const answer = formValues[question._id];

        switch (question.type) {
            case 'text':
                if (question._id in multiple_answer_dict) {
                    return (
                        <>
                            {answer && answer.map((ans, index) => (
                                <div className="answer-area">
                                    <h6 className="question">Entry {index+1} - </h6>
                                    {question.notes && question.notes !== "" && (
                                        <h6 className="note">Note - {question.notes}</h6>
                                    )}

                                    <input
                                        type="text"
                                        name={`text_${question._id}_${index}`}
                                        className="inputStyleText"
                                        placeholder="Enter text here..."
                                        value={ans || ''}
                                        onChange={(e) => handleInputChangeMore(question, e.target.value, index)}
                                    />

                                </div>
                            ))}
                            <button type="button" onClick={() => handleAddMore(question._id)} className="agreenably-btn">Add more</button>
                        </>
                    );
                } else {
                    return (
                        <div className="answer-area">
                            {question.notes && question.notes !== "" && (
                                <h6 className="note">Note - {question.notes}</h6>
                            )}
                            <input type="text"
                                name={`text_${question._id}`}
                                className="inputStyleText"
                                placeholder="Enter text here..."
                                value={answer || ''}
                                onChange={(e) => handleInputChange(question, e.target.value)} />

                        </div>
                    );
                }

            case 'single':
                if (question._id in multiple_answer_dict) {
                    return (
                        <>{answer && answer.map((ans, index) => (
                            <div className="answer-area">
                                <h6 className="question">Entry {index+1} - </h6>
                                {question.notes && question.notes !== "" && (
                                    <h6 className="note">Note - {question.notes}</h6>
                                )}
                                {Array.isArray(question.type_content) && question.type_content.map((option, indexx) => (
                                    <label key={indexx} className="labelStyle">
                                        <input
                                            type="radio"
                                            value={option}
                                            onChange={() => handleInputChangeMore(question, option, index)}
                                            checked={option === ans}
                                            className="inputStyle"
                                            name={`radio_${question._id}_${index}`}
                                        />
                                        {option}
                                    </label>
                                ))}

                            </div>
                        ))}
                            <button type="button" onClick={() => handleAddMore(question._id)} className="agreenably-btn">Add more</button>

                        </>
                        // <div className="answer-area">
                        //     {question.notes && question.notes !== "" && (
                        //         <h6 className="note">Note - {question.notes}</h6>
                        //     )}
                        //     {answer && answer.map((ans, index) => (
                        //         <input
                        //             type="text"
                        //             name={`text_${question._id}_${index}`}
                        //             className="inputStyleText"
                        //             placeholder="Enter text here..."
                        //             value={ans || ''}
                        //             onChange={(e) => handleInputChangeMore(question, e.target.value, index)}
                        //         />
                        //     ))}
                        //     <button type="button" onClick={() => handleAddMore(question._id)} className="agreenably-btn">Add more</button>

                        // </div>
                    );
                } else {
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
                }
            case 'multi':
                return (
                    <div className="answer-area">
                        {question.notes && question.notes !== "" && (
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                        {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                            <label key={index} className="labelStyle">
                                <input
                                    type="checkbox"
                                    name={`checkbox_${question._id}_${index}`}
                                    value={option}
                                    className="inputStyleMulti"
                                    checked={answer && answer.includes(option)}

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
            case 'dropdown-multi':
                return (
                    <div className="answer-area">
                        {question.notes && question.notes !== "" && (
                            <h6 className="note">Note - {question.notes}</h6>
                        )}
                        <Select
                            mode="multiple"
                            name={`dropdown_multi_${question._id}`}
                            className="inputStyleMulti"
                            placeholder={`Select ${question.content}`}
                            style={{ width: '100%' }}
                            value={answer || []}
                            onChange={(selectedOptions) => handleInputChange(question, selectedOptions)}>
                            {Array.isArray(question.type_content) && question.type_content.map((option, index) => (
                                <Option key={index} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>

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
    const goBackToCertificationPage = async () => {
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
        window.location.href = "/certification/women-owned-small-businesses/fill-questionnaire/page2"
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
                                    <div className="questionStyle">
                                        <h6 className="question">Select the STATE / COUNTY where your company's headquarters is located:</h6>
                                        <div className="answer-area">
                                            <select
                                                name={`661a0d9552c3ee0e2f865a53`}
                                                className="selectStyle"
                                                onChange={(e) => setFormValues(prevValues => ({
                                                    ...prevValues,
                                                    ["661a0d9552c3ee0e2f865a53"]: e.target.value,
                                                }))}

                                            >
                                                <option value="" disabled>Select a state</option>
                                                {Array.isArray(statesOnly) && statesOnly.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {stateDict[formValues["661a0d9552c3ee0e2f865a53"]] && stateDict[formValues["661a0d9552c3ee0e2f865a53"]].length > 1 && (
                                            <div className="answer-area">
                                                <select
                                                    name={`661a0d9552c3ee0e2f865a53-0`}
                                                    className="selectStyle"
                                                    onChange={(e) => setFormValues(prevValues => ({
                                                        ...prevValues,
                                                        ["661a0d9552c3ee0e2f865a53-0"]: `${e.target.value}`,
                                                    }))}

                                                >
                                                    <option value="" disabled>Select a county</option>
                                                    {Array.isArray(stateDict[formValues["661a0d9552c3ee0e2f865a53"]]) && stateDict[formValues["661a0d9552c3ee0e2f865a53"]].map((option, index) => (
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
                                    {general_information_section_status_questions.map((question, index) => (
                                        ((index != "2" || formValues["661a0d9552c3ee0e2f865a55"] === "Yes") &&
                                            (index != "6" || formValues["661a0d9552c3ee0e2f865a59"]?.includes("Other")))
                                        && (
                                            <div className="questionStyle" key={index}>
                                                <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                                {renderQuestionInput(question, index)}
                                                <Divider />
                                            </div>
                                        )
                                    ))}

                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Real Estate</h1>
                                    <Divider className="todo-news-divider" />
                                    {real_estate_questions.map((question, index) => (
                                        (
                                            (index != "10" || formValues["661a0d9552c3ee0e2f865a75"] === "No") &&
                                            (index != "8" || formValues["661a0d9552c3ee0e2f865a73"] === "Leased") &&
                                            (index != "22" || (formValues["661a0d9552c3ee0e2f865a82"]?.includes('31') || formValues["661a0d9552c3ee0e2f865a82"]?.includes('32') || formValues["661a0d9552c3ee0e2f865a82"]?.includes('33'))) &&
                                            (index != "25" || formValues["661a0d9552c3ee0e2f865a85"] === "Yes") &&
                                            (index != "26" || formValues["661a0d9552c3ee0e2f865a85"] === "Yes") &&
                                            (index != "28" || formValues["661a0d9552c3ee0e2f865a88"] === "Yes") &&
                                            (index != "33" || formValues["661a0d9552c3ee0e2f865a8d"] === "Yes") &&
                                            (index != "34" || formValues["661a0d9552c3ee0e2f865a8d"] === "Yes") &&
                                            (index != "36" || formValues["661a0d9552c3ee0e2f865a90"] === "Yes") &&
                                            (index != "37" || formValues["661a0d9552c3ee0e2f865a90"] === "Yes")
                                        ) &&
                                        (<div className="questionStyle" key={index}>
                                            <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>)
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Business/credit References</h1>
                                    <Divider className="todo-news-divider" />
                                    {business_credit_references_questions.map((question, index) => (
                                        <div className="questionStyle" key={index}>
                                            <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Ownership / Management Section Status</h1>
                                    <Divider className="todo-news-divider" />
                                    {ownership_management_section_status_questions.map((question, index) => (
                                        ((index != "20" || formValues["661a0d9552c3ee0e2f865ab5"] === "Yes") &&
                                            (index != "25" || formValues["661a0d9552c3ee0e2f865aba"] === "Yes"))
                                        && (<div className="questionStyle" key={index}>
                                            <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>)
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">Additional Information Section Status</h1>
                                    <Divider className="todo-news-divider" />
                                    {additional_information_section_status_questions.map((question, index) => (
                                        ((index != "1" || formValues["661a0d9552c3ee0e2f865ac8"] === "Yes")) && (
                                            <div className="questionStyle" key={index}>
                                                <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                                {renderQuestionInput(question, index)}
                                                <Divider />
                                            </div>)
                                    ))}
                                </div>
                                <div className="sectionStyle">
                                    <h1 className="question-type">WOSB Certification Section Status</h1>
                                    <Divider className="todo-news-divider" />
                                    {wosb_certification_section_status_questions.map((question, index) => (
                                        <div className="questionStyle" key={index}>
                                            <h6 className="question" style={{ textTransform: 'capitalize' }}>{question.content}</h6>
                                            {renderQuestionInput(question, index)}
                                            <Divider />
                                        </div>
                                    ))}
                                </div>

                                <button type="submit" className="agreenably-btn">
                                    Go to review
                                </button>
                            </form>
                        </div>
                    </>
                )}

            </div>
        </div>
    );

}

export default Women_Owned_Small_Businesses_Page3;