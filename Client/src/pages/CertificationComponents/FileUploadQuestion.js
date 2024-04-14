import { Divider } from "antd";
import React, { useState } from "react";
import '../../Stylesheet/certifications.css';
import axios from "axios";

const FileUploadQuestion = ({ heading, question, updateAnswers, markedAnswer, handleFileUpload }) => {

  const [file, setFile] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    updateAnswers({ [question]: selectedFile });
    handleFileUpload(selectedFile, question, `question40`);
    setIsAnswered(true);
  };
  const openPdfInNewTab = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/document/${markedAnswer}`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div className="questionStyle">
      <h6 className="question">{question}</h6>
      <div className="answer-area">
        <label className="custom-file-upload">
          <input type="file" onChange={handleFileChange} className="inputStyleFile" accept=".pdf" />
          Choose a File
        </label>
        {markedAnswer && (
          <div style={{ marginTop: '8px' }}>
            <p>Selected File: Click Below</p>
            <button className="open-pdf" onClick={openPdfInNewTab}>Open your PDF</button>
          </div>
        )}
      </div>
      {(!isAnswered && !markedAnswer) && <p className="errorText">Please answer this question</p>}
      <Divider />
    </div>
  );
};

export default FileUploadQuestion;