// MultiChoiceQuestion.js
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

const MultiChoiceQuestion = ({ heading, question, options, updateAnswers, markedAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleMultiChoiceChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selected) => selected !== option)
        : [...prevSelectedOptions, option];
      updateAnswers({ [question]: updatedOptions });
      setIsAnswered(true);
      return updatedOptions;
    });
  };

  return (
    <div style={sectionStyle}>
      <h4 style={{ textAlign: "start" }}>{heading}</h4>
      <div style={questionStyle}>
        <h6>{question}</h6>
        {options.map((option, index) => (
          <label key={index} style={labelStyle}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option) || (markedAnswer && markedAnswer.includes(option))}
              onChange={handleMultiChoiceChange}
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

export default MultiChoiceQuestion;
