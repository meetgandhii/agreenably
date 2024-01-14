// MultiChoiceQuestion.js
import { Divider } from "antd";
import React, { useState } from "react";
import '../../Stylesheet/certifications.css';

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
    
      <div className="questionStyle">
        <h6 className="question">{question}</h6>
        <div className="answer-area">
          {options.map((option, index) => (
            <label key={index} className="labelStyle">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option) || (markedAnswer && markedAnswer.includes(option))}
                onChange={handleMultiChoiceChange}
                className="inputStyleMulti"
              />
              {option}
            </label>
          ))}
        </div>
        {(!isAnswered && !markedAnswer) && <p style={{ color: 'red' }}>Please answer this question</p>}
        <Divider />
    </div>
  );
};

export default MultiChoiceQuestion;
