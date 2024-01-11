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
    <div style={sectionStyle}>
      <h4 style={{ textAlign: "start" }}>{heading}</h4>
      <div style={questionStyle}>
        <h6>{question}</h6>
        <input type="file" onChange={handleFileChange} />
        {markedAnswer && (
          <p style={{ marginTop: '8px' }}>
            Selected File: {markedAnswer} 
          </p>
        )}
        {!isAnswered && !markedAnswer && <p style={{ color: 'red' }}>Please answer this question</p>}
      </div>
    </div>
  );
};

export default FileUploadQuestion;
