import { Divider } from "antd";
import React, { useState } from "react";
import '../../Stylesheet/certifications.css';

const FileUploadQuestion = ({ heading, question, updateAnswers, markedAnswer }) => {
  const [file, setFile] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0].name;
    setFile(selectedFile);
    updateAnswers({ [question]: selectedFile });
    setIsAnswered(true);
  };

  return (
    
      <div className="questionStyle">
        <h6 className="question">{question}</h6>
        <div className="answer-area">
        <label class="custom-file-upload">
          <input type="file" onChange={handleFileChange} className="inputStyleFile"/>
          Choose a File
          </label>
        {markedAnswer && (
          <p style={{ marginTop: '8px' }}>
            Selected File: {markedAnswer} 
          </p>
        )}
        </div>
        {(!isAnswered && !markedAnswer) && <p className="errorText">Please answer this question</p>}
        <Divider />
    </div>
  );
};

export default FileUploadQuestion;
