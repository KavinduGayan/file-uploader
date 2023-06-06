import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null)

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      setResult(response.data.result)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="App">
      <h1 className="title">PDF File Uploader</h1>
      <div className="file-input-container">
        <input type="file" accept=".pdf" onChange={onFileChange} />
        {selectedFile && (
          <button className="upload-button" onClick={onFileUpload}>
            Upload File
          </button>
        )}
      </div>
      <div className="result-container">
        {result && <p className="result-text">{result}<button className="copy-button" onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </button></p>  
        }
      
      </div>
    </div>

  );
}

export default App;
