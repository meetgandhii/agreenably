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
import { FaArrowLeft } from 'react-icons/fa';

function FillCertification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [editMode, setEditMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitMode, setSubmitMode] = useState(false);
  const [review, setReview] = useState({});
  let qCount = 3;
  const [aCount, setACount] = useState({});
  const [certification, setCertification] = useState({});

  const goToEdit = async () => {
    const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
    try {
      const getCertificateOptions = await axios.get("https://agreenably-website-server.onrender.com/api/certification/records/getcertificationrecord", {
        params: {
          user_id: user._id,
          certification_id: certification._id
        }
      });
      const dbAnswers = getCertificateOptions.data.certification_response;
      const response = await axios.post("https://agreenably-website-server.onrender.com/api/certification/records/addcertificationrecord", {
        user_id: user._id,
        timestamp: timestamp,
        ongoing: "1",
        certification_id: certification._id,
        certification_response: dbAnswers
      });

      const updateUserResponse = await axios.put("https://agreenably-website-server.onrender.com/api/users/begincertificate", {
        userId: user._id,
        certificateId: certification._id
      });

      const certification_response = getCertificateOptions.data.certification_response;

      const transformedAnswers = certification_response.reduce((acc, { _id, question, answer }, index) => {
        acc[`question${index + 1}`] = { [question]: answer };
        return acc;
      }, {});
      const firstQuestion = questions[0];

      const initialAnswers = {};
      for (const key in firstQuestion) {
        if (key !== "_id") {
          const questionText = firstQuestion[key];
          initialAnswers[key] = {
            [questionText]: ""
          };
        }
      }
      Object.keys(initialAnswers).forEach(questionKey => {
        if (!transformedAnswers[questionKey] || Object.keys(transformedAnswers[questionKey]).length === 0) {
          transformedAnswers[questionKey] = initialAnswers[questionKey];
        }
      });

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
    console.log("answeredQuestions.length: ", Object.keys(aCount).length);
    console.log("qCount: ", qCount);
    console.log("Answers: ", answers);
    // if (answeredQuestions.length === qCount) {
    const answersArray = Object.entries(answers).flatMap(([something, nestedObject]) => {
      const entries = Object.entries(nestedObject);
      return entries.map(([question, answer]) => ({
        question,
        answer,
      }));
    });

    const nonEmptyAnswersArray = answersArray.filter(({ answer }) => answer !== "");

    setReview(nonEmptyAnswersArray);
    setSubmitMode(true);
    // } else {
    //   console.log("answeredQuestions.length: ", answeredQuestions.length);
    //   console.log("qCount: ", qCount);
    //   alert("Please fill all questions");
    // }
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
    setACount((prevCount) => {
      const updatedCount = { ...prevCount, [question]: answer };
      return updatedCount;
    });

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

  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);
  const [button4, setButton4] = useState(false);
  const [button5, setButton5] = useState(false);
  const [button6, setButton6] = useState(false);
  const [button7, setButton7] = useState(false);
  const [button8, setButton8] = useState(false);
  const [button9, setButton9] = useState(false);
  const [button10, setButton10] = useState(false);
  const [button11, setButton11] = useState(false);

  const showMoreSupplier1 = () => {
    setButton1(true);
  };

  const showMoreSupplier2 = () => {
    setButton2(true);
  };

  const showMoreSupplier3 = () => {
    setButton3(true);
  };

  const showMoreSupplier4 = () => {
    setButton4(true);
  };

  const showMoreSupplier5 = () => {
    setButton5(true);
  };

  const showMoreSupplier6 = () => {
    setButton6(true);
  };

  const showMoreSupplier7 = () => {
    setButton7(true);
  };

  const showMoreSupplier8 = () => {
    setButton8(true);
  };

  const showMoreSupplier9 = () => {
    setButton9(true);
  };

  const showMoreSupplier10 = () => {
    setButton10(true);
  };

  const showMoreSupplier11 = () => {
    setButton11(true);
  };
  return (
    <div className="booking-car-container">
      {editMode ? (
        <>

          {submitMode ? (
            <>
              <CertificateNav2 />
              <div className="booking-car-content">
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

                  {review.map((item, index) => (
                    <div key={index}>
                      <div className="reviewBox">
                        <h6 className="questionReview">{`Question ${index + 1}`}: {item.question}</h6>
                        <h6 className="answerReview">{`Answer ${index + 1}`}: {item.answer}</h6>
                      </div>
                    </div>
                  ))}</div>
                <button onClick={editData} className="agreenably-btn-edit">Edit</button>
                <button onClick={saveData} className="agreenably-btn-submit">Submit</button>
              </div>
            </>
          ) : (
            <>
              <CertificateNav />
              <div className="booking-car-content">
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#f2f1f2', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button onClick={backToCertificate} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <FaArrowLeft style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                  </button>
                  <h1 className="certification-name" style={{ margin: 0 }}> {certification.name}</h1>
                  <div style={{ width: '1.5rem' }}></div>
                </div>
                <div className="certificate_questionnaire">
                  <h1 className="heading_managecertifications certificate_questionnaire_heading">Enter Information</h1>
                  <div>
                    {questions.map((question, index) => (

                      <div key={index}>

                        <div className="sectionStyle">
                          <h1 className="question-type">Registration</h1>
                          <Divider className="todo-news-divider" />

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
                            updateAnswers={(updatedAnswer) => {
                              handleAnswer('question3', updatedAnswer);
                              const startQuestionIndex = 4;
                              const endQuestionIndex = 56;

                              if (updatedAnswer[question.question3] === "Yes") {
                                for (let i = startQuestionIndex; i <= endQuestionIndex; i++) {
                                  const questionKey = `question${i}`;
                                  handleAnswer(questionKey, "");
                                }
                              }
                            }
                            } markedAnswer={answers['question3'] && answers['question3'][question.question3]}

                          />

                          {answers.question3 && answers.question3[question.question3] === "No" && (
                            <>
                              <div style={{ display: "none" }}>{qCount += 1}</div>
                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question4}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => {
                                  handleAnswer('question4', updatedAnswer);
                                  const startQuestionIndex = 5;
                                  const endQuestionIndex = 56;

                                  if (updatedAnswer[question.question3] === "No") {
                                    for (let i = startQuestionIndex; i <= endQuestionIndex; i++) {
                                      const questionKey = `question${i}`;
                                      handleAnswer(questionKey, "");
                                    }
                                  }
                                }
                                }
                                markedAnswer={answers['question4'] && answers['question4'][question.question4]}
                              />
                            </>
                          )}
                        </div>

                        {answers.question4 && answers.question4[question.question4] === "Yes" && (
                          <div>
                            <div style={{ display: "none" }}>{qCount += 50}</div>
                            <div className="sectionStyle">
                              <h1 className="question-type">Your Contact Information</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question5}
                                updateAnswers={(updatedAnswer) => handleAnswer('question5', updatedAnswer)}
                                markedAnswer={answers['question5'] && answers['question5'][question.question5]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question6}
                                updateAnswers={(updatedAnswer) => handleAnswer('question6', updatedAnswer)}
                                markedAnswer={answers['question6'] && answers['question6'][question.question6]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question7}
                                updateAnswers={(updatedAnswer) => handleAnswer('question7', updatedAnswer)}
                                markedAnswer={answers['question7'] && answers['question7'][question.question7]}
                              />
                            </div>
                            <div className="sectionStyle">
                              <h1 className="question-type">About Your Company</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question8}
                                updateAnswers={(updatedAnswer) => handleAnswer('question8', updatedAnswer)}
                                markedAnswer={answers['question8'] && answers['question8'][question.question8]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question9}
                                options={["Canada", "Puerto Rico", "United States"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question9', updatedAnswer)}
                                markedAnswer={answers['question9'] && answers['question9'][question.question9]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question10}
                                updateAnswers={(updatedAnswer) => handleAnswer('question10', updatedAnswer)}
                                markedAnswer={answers['question10'] && answers['question10'][question.question10]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question11}
                                updateAnswers={(updatedAnswer) => handleAnswer('question11', updatedAnswer)}
                                markedAnswer={answers['question11'] && answers['question11'][question.question11]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question12}
                                updateAnswers={(updatedAnswer) => handleAnswer('question12', updatedAnswer)}
                                markedAnswer={answers['question12'] && answers['question12'][question.question12]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question13}
                                updateAnswers={(updatedAnswer) => handleAnswer('question13', updatedAnswer)}
                                markedAnswer={answers['question13'] && answers['question13'][question.question13]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question14}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question14', updatedAnswer)}
                                markedAnswer={answers['question14'] && answers['question14'][question.question14]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question15}
                                updateAnswers={(updatedAnswer) => handleAnswer('question15', updatedAnswer)}
                                markedAnswer={answers['question15'] && answers['question15'][question.question15]}
                              />
                            </div>
                            <div className="sectionStyle">
                              <h1 className="question-type">Company Details</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question16}
                                updateAnswers={(updatedAnswer) => handleAnswer('question16', updatedAnswer)}
                                markedAnswer={answers['question16'] && answers['question16'][question.question16]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question17}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question17', updatedAnswer)}
                                markedAnswer={answers['question17'] && answers['question17'][question.question17]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question18}
                                updateAnswers={(updatedAnswer) => handleAnswer('question18', updatedAnswer)}
                                markedAnswer={answers['question18'] && answers['question18'][question.question18]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question19}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question19', updatedAnswer)}
                                markedAnswer={answers['question19'] && answers['question19'][question.question19]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question20}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question20', updatedAnswer)}
                                markedAnswer={answers['question20'] && answers['question20'][question.question20]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question21}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question21', updatedAnswer)}
                                markedAnswer={answers['question21'] && answers['question21'][question.question21]}
                              />
                            </div>

                            <div className="sectionStyle">
                              <h1 className="question-type">Fixed Cut-Off Date</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question22}
                                updateAnswers={(updatedAnswer) => handleAnswer('question22', updatedAnswer)}
                                markedAnswer={answers['question22'] && answers['question22'][question.question22]}
                              />
                            </div>

                            <div className="sectionStyle">
                              <h1 className="question-type">Company Policy on Animal Testing</h1>
                              <Divider className="todo-news-divider" />
                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question23}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question23', updatedAnswer)}
                                markedAnswer={answers['question23'] && answers['question23'][question.question23]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question24}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question24', updatedAnswer)}
                                markedAnswer={answers['question24'] && answers['question24'][question.question24]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question25}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question25', updatedAnswer)}
                                markedAnswer={answers['question25'] && answers['question25'][question.question25]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question26}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question26', updatedAnswer)}
                                markedAnswer={answers['question26'] && answers['question26'][question.question26]}
                              />
                              {((answers.question23 && answers.question23[question.question23] === "Yes") || (answers.question24 && answers.question24[question.question24] === "Yes") || (answers.question25 && answers.question25[question.question25] === "Yes") || (answers.question26 && answers.question26[question.question26] === "Yes")) && (
                                <>
                                  <div style={{ display: "none" }}>{qCount += 1}</div>
                                  <SingleChoiceQuestion
                                    heading={"Registration"}
                                    question={question.question27}
                                    options={["Yes", "No"]}
                                    updateAnswers={(updatedAnswer) => handleAnswer('question27', updatedAnswer)}
                                    markedAnswer={answers['question27'] && answers['question27'][question.question27]}
                                  />
                                </>
                              )}
                            </div>

                            <div className="sectionStyle">
                              <h1 className="question-type">Supply Chain Management</h1>
                              <Divider className="todo-news-divider" />
                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question28}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question28', updatedAnswer)}
                                markedAnswer={answers['question28'] && answers['question28'][question.question28]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question29}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question29', updatedAnswer)}
                                markedAnswer={answers['question29'] && answers['question29'][question.question29]}
                              />

                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question30}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question30', updatedAnswer)}
                                markedAnswer={answers['question30'] && answers['question30'][question.question30]}
                              />
                            </div>

                            <div className="sectionStyle">
                              <h1 className="question-type">Supply Chain Management</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question31}
                                updateAnswers={(updatedAnswer) => handleAnswer('question31', updatedAnswer)}
                                markedAnswer={answers['question31'] && answers['question31'][question.question31]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question32}
                                updateAnswers={(updatedAnswer) => handleAnswer('question32', updatedAnswer)}
                                markedAnswer={answers['question32'] && answers['question32'][question.question32]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question33}
                                updateAnswers={(updatedAnswer) => handleAnswer('question33', updatedAnswer)}
                                markedAnswer={answers['question33'] && answers['question33'][question.question33]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question34}
                                updateAnswers={(updatedAnswer) => handleAnswer('question34', updatedAnswer)}
                                markedAnswer={answers['question34'] && answers['question34'][question.question34]}
                              />
                              {button1 ? (
                                <>
                                  <p>Supplier 1</p>
                                  {button2 ? (
                                    <>
                                      <p>Supplier 2</p>
                                      {button3 ? (
                                        <>
                                          <p>Supplier 3</p>
                                          {button4 ? (
                                            <>
                                              <p>Supplier 4</p>
                                              {button5 ? (
                                                <>
                                                  <p>Supplier 5</p>
                                                  {button6 ? (
                                                    <>
                                                      <p>Supplier 6</p>
                                                      {button7 ? (
                                                        <>
                                                          <p>Supplier 7</p>
                                                          {button8 ? (
                                                            <>
                                                              <p>Supplier 8</p>
                                                              {button9 ? (
                                                                <>
                                                                  <p>Supplier 9</p>
                                                                  {button10 ? (
                                                                    <>
                                                                      <p>Supplier 10</p>
                                                                      {button11 ? (
                                                                        <>
                                                                          <p>Supplier 11</p>
                                                                        </>
                                                                      ) : (
                                                                        <button className="agreenably-btn-add-more" onClick={showMoreSupplier11}>Add Ingredient Supplier</button>
                                                                      )}
                                                                    </>
                                                                  ) : (
                                                                    <button className="agreenably-btn-add-more" onClick={showMoreSupplier10}>Add Ingredient Supplier</button>
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <button className="agreenably-btn-add-more" onClick={showMoreSupplier9}>Add Ingredient Supplier</button>
                                                              )}
                                                            </>
                                                          ) : (
                                                            <button className="agreenably-btn-add-more" onClick={showMoreSupplier8}>Add Ingredient Supplier</button>
                                                          )}
                                                        </>
                                                      ) : (
                                                        <button className="agreenably-btn-add-more" onClick={showMoreSupplier7}>Add Ingredient Supplier</button>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <button className="agreenably-btn-add-more" onClick={showMoreSupplier6}>Add Ingredient Supplier</button>
                                                  )}
                                                </>
                                              ) : (
                                                <button className="agreenably-btn-add-more" onClick={showMoreSupplier5}>Add Ingredient Supplier</button>
                                              )}
                                            </>
                                          ) : (
                                            <button className="agreenably-btn-add-more" onClick={showMoreSupplier4}>Add Ingredient Supplier</button>
                                          )}
                                        </>
                                      ) : (
                                        <button className="agreenably-btn-add-more" onClick={showMoreSupplier3}>Add Ingredient Supplier</button>
                                      )}
                                    </>
                                  ) : (
                                    <button className="agreenably-btn-add-more" onClick={showMoreSupplier2}>Add Ingredient Supplier</button>
                                  )}
                                </>
                              ) : (
                                <button className="agreenably-btn-add-more" onClick={showMoreSupplier1}>Add Ingredient Supplier</button>
                              )}



                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question35}
                                updateAnswers={(updatedAnswer) => handleAnswer('question35', updatedAnswer)}
                                markedAnswer={answers['question35'] && answers['question35'][question.question35]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question36}
                                updateAnswers={(updatedAnswer) => handleAnswer('question36', updatedAnswer)}
                                markedAnswer={answers['question36'] && answers['question36'][question.question36]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question37}
                                updateAnswers={(updatedAnswer) => handleAnswer('question37', updatedAnswer)}
                                markedAnswer={answers['question37'] && answers['question37'][question.question37]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question38}
                                updateAnswers={(updatedAnswer) => handleAnswer('question38', updatedAnswer)}
                                markedAnswer={answers['question38'] && answers['question38'][question.question38]}
                              />
                            </div>

                            <div className="sectionStyle">
                              <h1 className="question-type">Distributors</h1>
                              <Divider className="todo-news-divider" />
                              <SingleChoiceQuestion
                                heading={"Registration"}
                                question={question.question39}
                                options={["Yes", "No"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question39', updatedAnswer)}
                                markedAnswer={answers['question39'] && answers['question39'][question.question39]}
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
                            </div>
                            <div className="sectionStyle">
                              <h1 className="question-type">Brands, Products and Availability</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question41}
                                updateAnswers={(updatedAnswer) => handleAnswer('question41', updatedAnswer)}
                                markedAnswer={answers['question41'] && answers['question41'][question.question41]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question42}
                                updateAnswers={(updatedAnswer) => handleAnswer('question42', updatedAnswer)}
                                markedAnswer={answers['question42'] && answers['question42'][question.question42]}
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
                                markedAnswer={answers['question44'] && answers['question44'][question.question44]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question45}
                                updateAnswers={(updatedAnswer) => handleAnswer('question45', updatedAnswer)}
                                markedAnswer={answers['question45'] && answers['question45'][question.question45]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question46}
                                options={["US", "Canada", "Australia", "Brazil", "China", "European Union", "Japan", "Mexico", "Russia", "United Kingdom", "Middle East Region", "Latin America", "Southeast Asia", "Africa", "Other"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question46', updatedAnswer)}
                                markedAnswer={answers['question46'] && answers['question46'][question.question46]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question47}
                                options={["Company Website", "Amazon", "Specialized Online Only Store (e.g. Thrive, Dermstore, iHerb, Vitacost)", "Grocery Store (e.g. Kroger, HEB, Sprouts, Wegmans)", "Big Box Store (e.g. Target, Walmart, TJ Maxx, Homegoods)", "Specialized Grocery Store (e.g. Whole Foods, Mom Organic Market)", "Pharmacy (e.g. CVS, Walgreens, Rite Aid)", "Specialty Beauty Store (e.g. Sephora, Ulta, Bluemercury)", "My house", "Spa", "Salon", "Duty Free - Caribbean Islands", "In our showroom/physical location", "Specialty Boutiques", "Gift Shop", "Garden Shop", "Social media", "Other"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question47', updatedAnswer)}
                                markedAnswer={answers['question47'] && answers['question47'][question.question47]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question48}
                                options={["Companion Animal Grooming Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question48', updatedAnswer)}
                                markedAnswer={answers['question48'] && answers['question48'][question.question48]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question49}
                                options={["Color Cosmetics", "Lip Care", "Nail Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question49', updatedAnswer)}
                                markedAnswer={answers['question49'] && answers['question49'][question.question49]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question50}
                                options={["Aromatherapy", "Baby Care", "Bath Bubbles and Salts", "Body Care", "Condoms/Lubricants", "Dental Care", "Deodorant", "Eye Care", "Face Care", "Feminine Hygiene", "Hair Care", "Hair Color or Permanent", "Hair Styling", "Hand Sanitizers", "Insect Repellent", "Maternity", "Men's Products", "Self Tanner", "Shampoo/Conditioner", "Shaving/Depilatory", "Soap", "Sun Care"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question50', updatedAnswer)}
                                markedAnswer={answers['question50'] && answers['question50'][question.question50]}
                              />

                              <MultiChoiceQuestion
                                heading={"Registration"}
                                question={question.question51}
                                options={["Bathroom Cleaner", "Bleach", "Car Care", "Carpet Cleaner", "Dish Detergent", "Floor Cleaner", "Fruit & Vegetable Wash", "Furniture Polish", "Home Fragrance", "Household Cleaner", "Laundry"]}
                                updateAnswers={(updatedAnswer) => handleAnswer('question51', updatedAnswer)}
                                markedAnswer={answers['question51'] && answers['question51'][question.question51]}
                              />
                            </div>
                            <div className="sectionStyle">
                              <h1 className="question-type">Your Company Declaration</h1>
                              <Divider className="todo-news-divider" />
                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question52}
                                updateAnswers={(updatedAnswer) => handleAnswer('question52', updatedAnswer)}
                                markedAnswer={answers['question52'] && answers['question52'][question.question52]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question53}
                                updateAnswers={(updatedAnswer) => handleAnswer('question53', updatedAnswer)}
                                markedAnswer={answers['question53'] && answers['question53'][question.question53]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question54}
                                updateAnswers={(updatedAnswer) => handleAnswer('question54', updatedAnswer)}
                                markedAnswer={answers['question54'] && answers['question54'][question.question54]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question55}
                                updateAnswers={(updatedAnswer) => handleAnswer('question55', updatedAnswer)}
                                markedAnswer={answers['question55'] && answers['question55'][question.question55]}
                              />

                              <TextBoxQuestion
                                heading={"Registration"}
                                question={question.question56}
                                updateAnswers={(updatedAnswer) => handleAnswer('question56', updatedAnswer)}
                                markedAnswer={answers['question56'] && answers['question56'][question.question56]}
                              />
                            </div>
                          </div>)}

                        <button onClick={goToReview} className="agreenably-btn">Go next step</button>
                      </div>

                    ))}
                  </div>
                </div>


              </div>
            </>
          )}

        </>
      ) : (
        <div style={{ display: "flex", width: "100%" }}>
          <DefaultLayout />
          <div className="managecertifications certificateCard" style={{ height: "100vh" }}>
            <h1 className="heading_managecertifications">Get Certified</h1>
            {loading && <Spinner />}

            {certification && (
              <>
                <Row justify="center" className="certification-card">
                  <div className="certificationCard2">
                    <div className="certification-container">
                      <div className="logo-container">
                        {certification.image ? (
                          <img src={certification.image} alt={certification.name} width="80px" className="certification_image" />
                        ) : (
                          <img src="/images/CertificateImage.png" alt="Placeholder" width="80px" className="certification_image" />
                        )}
                      </div>
                      <div className="certification-details">
                        <div className="certification-info">
                          <h1 className="certification-name">
                            {certification.name}
                          </h1>
                          <h4 className="certificate-duration">
                            Time: 30mins
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>


                  <Divider className="todo-news-divider" />
                  <div>
                    <ul className="certification-process-ul">
                      <li className="certification-process-li">Registration</li>
                      <li className="certification-process-li">Business Details</li>
                      <li className="certification-process-li">Fixed Cut Off Date</li>
                      <li className="certification-process-li">Supplier Monitoring System</li>
                      <li className="certification-process-li">Distributor Agreement</li>
                      <li className="certification-process-li">Brand Details</li>
                      <li className="certification-process-li" id="certification-process-li-last">Signatory Details</li>
                    </ul>
                  </div>
                </Row>
                <button onClick={goToEdit} className="agreenably-btn">
                  Begin
                </button>
              </>
            )}
            {!certification && <Spinner />}
          </div>
        </div>
      )}
    </div>
  );
}

export default FillCertification;