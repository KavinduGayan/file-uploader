import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://your-backend-url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
    </div>
  );
}

export default App;
