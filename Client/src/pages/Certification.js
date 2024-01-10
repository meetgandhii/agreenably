import React, { useEffect, useState } from "react";
import { Row, Divider } from "antd";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import '../Stylesheet/certifications.css';
import CertificateNav from "../components/CertificateNav";
import CertificateNav2 from "../components/CertificateNav2";
import { useNavigate } from "react-router-dom";
import SingleChoiceQuestion from "./CertificationComponents/SingleChoiceQuestion";
import MultiChoiceQuestion from "./CertificationComponents/MultiChoiceQuestion";
import TextBoxQuestion from "./CertificationComponents/TextBoxQuestion";
import FileUploadQuestion from "./CertificationComponents/FileUploadQuestion";
import { get } from "react-scroll/modules/mixins/scroller";

function FillCertification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [editMode, setEditMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitMode, setSubmitMode] = useState(false);
  const [review, setReview] = useState({});
  let qCount = 3;
  const [certification, setCertification] = useState({});
  const goToEdit = async () => {
    const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
    try {
      const getCertificateOptions = await axios.get("http://localhost:4000/api/certification/records/getcertificationrecord", {
        params: {
          user_id: user._id,
          certification_id: certification._id
        }
      });

      const dbAnswers = getCertificateOptions.data.certification_response;
      const response = await axios.post("http://localhost:4000/api/certification/records/addcertificationrecord", {
        user_id: user._id,
        timestamp: timestamp,
        ongoing: "1",
        certification_id: certification._id,
        certification_response: dbAnswers
      });

      const updateUserResponse = await axios.put("http://localhost:4000/api/users/begincertificate", {
        userId: user._id,
        certificateId: certification._id
      });

      const certification_response = getCertificateOptions.data.certification_response;

      const transformedAnswers = certification_response.reduce((acc, { _id, question, answer }, index) => {
        acc[`question${index + 1}`] = { [question]: answer };
        return acc;
      }, {});

      setAnswers(transformedAnswers);
      setEditMode(true);
    } catch (error) {
      console.error("Error while adding certification record:", error);
    }
  };

  const backToCertificate = () => {
    setSubmitMode(false);
    setEditMode(false);

  };

  const goToReview = () => {
    const answeredQuestions = Object.values(answers).flatMap((nestedObject) =>
      Object.values(nestedObject)
    );
    if (answeredQuestions.length === qCount) {
      const answersArray = Object.entries(answers).flatMap(([something, nestedObject]) => {
        const entries = Object.entries(nestedObject);
        return entries.map(([question, answer]) => ({
          question,
          answer,
        }));
      });
      setReview(answersArray);
      setSubmitMode(true);
    } else {
      alert("Please fill all questions");
    }
  };

  const editData = async () => {
    setEditMode(true);
    setSubmitMode(false);

  };



  const saveData = async () => {
    const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");

    try {
      const answersArray = Object.entries(answers).flatMap(([something, nestedObject]) => {
        const entries = Object.entries(nestedObject);
        return entries.map(([question, answer]) => ({
          question,
          answer,
        }));
      });

      const response = await axios.put("https://agreenably-website-server.onrender.com/api/certification/records/editcertificationrecord", {
        user_id: user._id,
        certification_response: answersArray,
        timestamp: timestamp,
        ongoing: "0",
        certification_id: certification._id,
      });

      const updateUserResponse = await axios.put("https://agreenably-website-server.onrender.com/api/users/submitcertificate", {
        userId: user._id,
        certificateId: certification._id
      });
    } catch (error) {
      console.error("Error while editing certification record:", error);
    } finally {

      setEditMode(false);
      setSubmitMode(false);
      navigate("/");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`https://agreenably-website-server.onrender.com/api/certifications/certificate/${id}`);
        setCertification(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCertificate();
  }, []);

  const [questions, setQuestions] = useState({});
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://agreenably-website-server.onrender.com/api/certification/questions/getallcertificationquestions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchQuestions();
  }, []);


  const handleAnswer = async (question, answer) => {


    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [question]: answer };
      return updatedAnswers;
    });
  };

  useEffect(() => {
    const updateCertificationRecord = async () => {
      try {
        if (answers !== null && Object.keys(answers).length > 0) {   // Check if answers is not null

          const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
          const answersArray = Object.entries(answers).flatMap(([something, nestedObject]) => {
            const entries = Object.entries(nestedObject);
            return entries.map(([question, answer]) => ({
              question,
              answer,
            }));
          });
          const response = await axios.put("https://agreenably-website-server.onrender.com/api/certification/records/editcertificationrecord", {
            user_id: user._id,
            certification_response: answersArray,
            timestamp: timestamp,
            ongoing: "1",
            certification_id: certification._id,
          });
        }
      } catch (error) {
        console.error("Error while editing certification record:", error);
      }
    };

    updateCertificationRecord();
  }, [answers]);


  return (
    <div className="booking-car-container">
      {editMode ? (
        <>

          {submitMode ? (
            <>
              <CertificateNav2 />
              <div className="booking-car-content">
                <div><button onClick={backToCertificate}>Back</button><h3>{certification.name}</h3></div>
                <h4>Review Information</h4>

                {review.map((item, index) => (
                  <div key={index}>
                    <p>{item.question}</p>
                    <p>{item.answer}</p>
                  </div>
                ))}
                <button onClick={editData}>Edit</button>
                <button onClick={saveData}>Submit</button>
              </div>
            </>
          ) : (
            <>
              <CertificateNav />
              <div className="booking-car-content">
                <div><button onClick={backToCertificate}>Back</button><h3>{certification.name}</h3></div>
                <h4>Enter Information</h4>
                <div>
                  {questions.map((question, index) => (

                    <div key={index}>
                      <SingleChoiceQuestion
                        heading={"Registration"}
                        question={question.question1}
                        options={["Yes", "No"]}
                        updateAnswers={(updatedAnswer) => handleAnswer('question1', updatedAnswer)} markedAnswer={answers['question1'] && answers['question1'][question.question1]}

                      />

                      <SingleChoiceQuestion
                        heading={"Registration"}
                        question={question.question2}
                        options={["Yes", "No"]}
                        updateAnswers={(updatedAnswer) => handleAnswer('question2', updatedAnswer)} markedAnswer={answers['question2'] && answers['question2'][question.question2]}

                      />

                      <SingleChoiceQuestion
                        heading={"Registration"}
                        question={question.question3}
                        options={["Yes", "No"]}
                        updateAnswers={(updatedAnswer) => handleAnswer('question3', updatedAnswer)} markedAnswer={answers['question3'] && answers['question3'][question.question3]}

                      />

                      {answers.question3 && answers.question3[question.question3] === "No" && (
                        <>
                          <div style={{ display: "none" }}>{qCount += 1}</div>
                          <SingleChoiceQuestion
                            heading={"Registration"}
                            question={question.question4}
                            options={["Yes", "No"]}
                            updateAnswers={(updatedAnswer) => handleAnswer('question4', updatedAnswer)}
                            markedAnswer={answers['question4'] && answers['question4'][question.question4]}
                          />


                          {answers.question4 && answers.question4[question.question4] === "Yes" && (
                            <div>
                              <div style={{ display: "none" }}>{qCount += 50}</div>
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question5}
                                updateAnswers={(updatedAnswer) => handleAnswer('question5', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question6}
                                updateAnswers={(updatedAnswer) => handleAnswer('question6', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question7}
                                updateAnswers={(updatedAnswer) => handleAnswer('question7', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question8}
                                updateAnswers={(updatedAnswer) => handleAnswer('question8', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question9}
                                options={["Canada", "Puerto Rico", "United States"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question9', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question10}
                                updateAnswers={(updatedAnswer) => handleAnswer('question10', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question11}
                                updateAnswers={(updatedAnswer) => handleAnswer('question11', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question12}
                                updateAnswers={(updatedAnswer) => handleAnswer('question12', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question13}
                                updateAnswers={(updatedAnswer) => handleAnswer('question13', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question14}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question14', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question15}
                                updateAnswers={(updatedAnswer) => handleAnswer('question15', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question16}
                                updateAnswers={(updatedAnswer) => handleAnswer('question16', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question17}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question17', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question18}
                                updateAnswers={(updatedAnswer) => handleAnswer('question18', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question19}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question19', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question20}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question20', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question21}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question21', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question22}
                                updateAnswers={(updatedAnswer) => handleAnswer('question22', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question23}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question23', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question24}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question24', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question25}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question25', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question26}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question26', updatedAnswer)}
                              />
                              {((answers.question23 && answers.question23[question.question23] === "Yes") || (answers.question24 && answers.question24[question.question24] === "Yes") || (answers.question25 && answers.question25[question.question25] === "Yes") || (answers.question26 && answers.question26[question.question26] === "Yes")) && (
                                <>
                                  <div style={{ display: "none" }}>{qCount += 1}</div>
                                  <SingleChoiceQuestion
                                    heading={"Registration"}
                                    question={question.question27}
                                    options={["Yes", "No"]}
                                    updateAnswers={(updatedAnswer) => handleAnswer('question27', updatedAnswer)}
                                  />
                                </>
                              )}

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question28}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question28', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question29}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question29', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question30}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question30', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question31}
                                updateAnswers={(updatedAnswer) => handleAnswer('question31', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question32}
                                updateAnswers={(updatedAnswer) => handleAnswer('question32', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question33}
                                updateAnswers={(updatedAnswer) => handleAnswer('question33', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question34}
                                updateAnswers={(updatedAnswer) => handleAnswer('question34', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question35}
                                updateAnswers={(updatedAnswer) => handleAnswer('question35', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question36}
                                updateAnswers={(updatedAnswer) => handleAnswer('question36', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question37}
                                updateAnswers={(updatedAnswer) => handleAnswer('question37', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question38}
                                updateAnswers={(updatedAnswer) => handleAnswer('question38', updatedAnswer)}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question39}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question39', updatedAnswer)}
                              />

                              {answers.question39 && answers.question39[question.question39] === "Yes" && (
                                <>
                                  <div style={{ display: "none" }}>{qCount += 1}</div>
                                  <FileUploadQuestion
                                    heading={"Registration"}
                                    question={question.question40}
                                    updateAnswers={(updatedAnswer) => handleAnswer('question40', updatedAnswer)} markedAnswer={answers['question40'] && Object.values(answers["question40"])[0]}
                                  />
                                </>
                              )}

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question41}
                                updateAnswers={(updatedAnswer) => handleAnswer('question41', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question42}
                                updateAnswers={(updatedAnswer) => handleAnswer('question42', updatedAnswer)}
                              />

                              <FileUploadQuestion
                                heading={"Registration"}
                                question={question.question43}
                                updateAnswers={(updatedAnswer) => handleAnswer('question43', updatedAnswer)} markedAnswer={answers['question43'] && Object.values(answers["question43"])[0]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question44}
                                updateAnswers={(updatedAnswer) => handleAnswer('question44', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question45}
                                updateAnswers={(updatedAnswer) => handleAnswer('question45', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question46}
                                options={["US", "Canada", "Australia", "Brazil", "China", "European Union", "Japan", "Mexico", "Russia", "United Kingdom", "Middle East Region", "Latin America", "Southeast Asia", "Africa", "Other"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question46', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question47}
                                options={["Company Website", "Amazon", "Specialized Online Only Store (e.g. Thrive, Dermstore, iHerb, Vitacost)", "Grocery Store (e.g. Kroger, HEB, Sprouts, Wegmans)", "Big Box Store (e.g. Target, Walmart, TJ Maxx, Homegoods)", "Specialized Grocery Store (e.g. Whole Foods, Mom Organic Market)", "Pharmacy (e.g. CVS, Walgreens, Rite Aid)", "Specialty Beauty Store (e.g. Sephora, Ulta, Bluemercury)", "My house", "Spa", "Salon", "Duty Free - Caribbean Islands", "In our showroom/physical location", "Specialty Boutiques", "Gift Shop", "Garden Shop", "Social media", "Other"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question47', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question48}
                                options={["Companion Animal Grooming Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question48', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question49}
                                options={["Color Cosmetics", "Lip Care", "Nail Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question49', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question50}
                                options={["Aromatherapy", "Baby Care", "Bath Bubbles and Salts", "Body Care", "Condoms/Lubricants", "Dental Care", "Deodorant", "Eye Care", "Face Care", "Feminine Hygiene", "Hair Care", "Hair Color or Permanent", "Hair Styling", "Hand Sanitizers", "Insect Repellent", "Maternity", "Men's Products", "Self Tanner", "Shampoo/Conditioner", "Shaving/Depilatory", "Soap", "Sun Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question50', updatedAnswer)}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question51}
                                options={["Bathroom Cleaner", "Bleach", "Car Care", "Carpet Cleaner", "Dish Detergent", "Floor Cleaner", "Fruit & Vegetable Wash", "Furniture Polish", "Home Fragrance", "Household Cleaner", "Laundry"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question51', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question52}
                                updateAnswers={(updatedAnswer) => handleAnswer('question52', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question53}
                                updateAnswers={(updatedAnswer) => handleAnswer('question53', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question54}
                                updateAnswers={(updatedAnswer) => handleAnswer('question54', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question55}
                                updateAnswers={(updatedAnswer) => handleAnswer('question55', updatedAnswer)}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question56}
                                updateAnswers={(updatedAnswer) => handleAnswer('question56', updatedAnswer)}
                              />
                            </div>)}
                        </>
                      )}
                      <button onClick={goToReview}>Go next step</button>
                    </div>

                  ))}
                </div>

              </div>
            </>
          )}

        </>
      ) : (
        <>
          <DefaultLayout />
          <div className="booking-car-content">
            <h3>Get Certified</h3>
            {loading && <Spinner />}

            {certification && (
              <>
                <Row justify="center" className="certification-card">
                  {certification.image ? (
                    <img src={certification.image} alt={certification.name} width="50px" className="carimg" />
                  ) : (
                    <img src="/images/pfpPlaceholder.png" alt="Placeholder" width="50px" className="carimg" />
                  )}
                  <div className="certification-details">
                    <h1>{certification.name}</h1>
                    <h4>Time: 30mins</h4>
                  </div>
                  <Divider />
                  <div style={{ display: "block" }}>
                    <ul style={{ display: "block", textAlign: "start", }}>
                      <li>Registration</li>
                      <li>Business Details</li>
                      <li>Fixed Cut Off Date</li>
                      <li>Supplier Monitoring System</li>
                      <li>Distributor Agreement</li>
                      <li>Brand Details</li>
                      <li>Signatory Details</li>
                    </ul>
                    <button onClick={goToEdit} style={{ display: "block" }}>
                      Begin
                    </button></div>
                </Row>



              </>
            )}
            {!certification && <Spinner />}
          </div>
        </>
      )}
    </div>
  );
}

export default FillCertification;