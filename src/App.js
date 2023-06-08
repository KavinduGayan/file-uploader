import React, { useState } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true);
  const [pdfName, setPdfName] = useState('')
  const [loading, setLoading] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPdfName(event.target.files[0].name)
    setIsDisabled(false)
  };

  const hideUploadButton = {
    display: 'none',
  }

  const onFileUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      setResult(response.data.result)
      setLoading(false)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <>
      <div className="background">
        <div class="header">
          <div class="header-font">
            Intelligent Document Processing
          </div>
        </div>
      </div>

      {loading && (
        <div
          style={{
            position: 'fixed',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <BeatLoader color="#000000" />
        </div>)
      }

      {result &&
        <div class="result-url-box">
          <a class="result-url"
            href="https://docs.google.com/spreadsheets/d/1KmNit3g3tW8JX-8a04bpfjJN_b6jMjKZ_gaLcMkoCL0/edit?usp=sharing"
            target="_blank">https://docs.google.com/spreadsheets/d/1KmNit3g3tW8JX-8a04bpfjJN_b6jMjKZ_gaLcMkoCL0/edit?usp=sharing</a>
        </div>
      }

      <div class="main-rectangle">
        <div class="upload-pdf-font">
          Upload PDF File
        </div>
        <label for="file-upload" class="upload-image"></label>
        <input type="file" id="file-upload" class="upload-image" accept=".pdf" style={hideUploadButton} onChange={onFileChange} />
        <div className='upload-pdf-name'>{pdfName}</div>
        <div class="notification">Drag & drop or browse</div>
        <button class="button-upload" onClick={onFileUpload} disabled={isDisabled}>
          <div class="button-text" >Upload </div>
        </button>
        <div class="upload-instruction">Upload PDF File To Process Your Document.</div>
      </div>
    </>

  );
}

export default App;
