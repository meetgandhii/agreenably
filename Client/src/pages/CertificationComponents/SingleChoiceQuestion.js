// SingleChoiceQuestion.js
import { Divider } from "antd";
import React, { useState } from "react";
import '../../Stylesheet/certifications.css';

const SingleChoiceQuestion = ({ heading, question, options, updateAnswers, markedAnswer }) => {
  const [answer, setAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const handleOptionChange = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
    updateAnswers({ [question]: selectedAnswer });
    setIsAnswered(true);
  };

  return (
    <div className="sectionStyle"> 
      <h1 className="question-type">{heading}</h1> 
      <Divider className="todo-news-divider"/>
      <div className="questionStyle">
        <h6 className="question">{question}</h6>
       <div className="answer-area">
        {options.map((option, index) => (
          <label key={index} className="labelStyle">
            <input
              type="radio"
              value={option}
              checked={answer === option || markedAnswer === option}
              onChange={handleOptionChange}
              className="inputStyle"
            />
            {option}
          </label>
        ))}</div>
        {(!isAnswered && !markedAnswer) && <p className="errorText">Please answer this question</p>}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
