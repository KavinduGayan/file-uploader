import React, { useState } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import linkImage from './images/link.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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
      setResult(null)
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
        <div className="result-url-box">
          <img src={linkImage} alt="Link" className='image-icon' /><a class="result-url"
            href={result}
            target="_blank">{result}</a>
            <button className="copy-button" onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
        </div>
      }

      <div className="main-rectangle">
        <div className="upload-pdf-font">
          Upload PDF File
        </div>
        <label for="file-upload" class="upload-image"></label>
        <input type="file" id="file-upload" class="upload-image" accept=".pdf" style={hideUploadButton} onChange={onFileChange} />
        <div className='upload-pdf-name'>{pdfName}</div>
        <div className="notification">Drag & drop or browse</div>
        <button className="button-upload" onClick={onFileUpload} disabled={isDisabled}>
          <div className="button-text" >Upload </div>
        </button>
        <div className="upload-instruction">Upload PDF File To Process Your Document.</div>
      </div>
    </>

  );
}

export default App;
