// TextBoxQuestion.js
import React, { useState } from "react";

const questionStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

const sectionStyle = {
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid #aaaaaa'
};

const TextBoxQuestion = ({ heading, question, updateAnswers, markedAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const handleInputChange = (event) => {
    const answer = event.target.value;
    setAnswer(answer);
    updateAnswers({ [question]: answer });
    setIsAnswered(true);
  };

  return (
    <div style={sectionStyle}>
      <h4 style={{ textAlign: "start" }}>{heading}</h4>
      <div style={questionStyle}>
        <h6>{question}</h6>
        <input type="text" value={markedAnswer || answer} onChange={handleInputChange} />
        {(!isAnswered && !markedAnswer) && <p style={{ color: 'red' }}>Please answer this question</p>}
      </div>
    </div>
  );
};

export default TextBoxQuestion;
