// TextBoxQuestion.js
import React, { useState } from "react";
import '../../Stylesheet/certifications.css';
import { Divider } from "antd";

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
    <div className="sectionStyle"> 
      <h1 className="question-type">{heading}</h1> 
      <Divider className="todo-news-divider"/>
      <div className="questionStyle">
      <h6 className="question">{question}</h6>
       <div className="answer-area">
        <input type="text" value={markedAnswer || answer} onChange={handleInputChange} className="inputStyleText" placeholder="Enter text here..."/>
       </div>
        
        {(!isAnswered && !markedAnswer) && <p className="errorText">Please answer this question</p>}
      </div>
    </div>
  );
};

export default TextBoxQuestion;
