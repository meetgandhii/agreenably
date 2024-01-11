// SingleChoiceQuestion.js
import React, { useState } from "react";

const questionStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};
const labelStyle = {
  alignItems: 'center',
  margin: '8px 8px',
};

const inputStyle = {
  marginRight: '4px', // Add right margin for spacing
};
const sectionStyle = {
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid #aaaaaa'
};

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
    <div style={sectionStyle}>
      <h4 style={{ textAlign: "start" }}>{heading}</h4>
      <div style={questionStyle}>
        <h6>{question}</h6>
        {options.map((option, index) => (
          <label key={index} style={labelStyle}>
            <input
              type="radio"
              value={option}
              checked={answer === option || markedAnswer === option}
              onChange={handleOptionChange}
              style={inputStyle}
            />
            {option}
          </label>
        ))}
        {(!isAnswered && !markedAnswer) && <p style={{ color: 'red' }}>Please answer this question</p>}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
