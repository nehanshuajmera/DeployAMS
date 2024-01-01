import React, { useState } from 'react';
import axios from 'axios';

const UploadBulkData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (endpoint) => {
    try {
      if (!file) {
        setMessage('Please choose a file.');
        return;
      }

      // Validate file type
      if (!file.name.endsWith('.xlsx')) {
        setMessage('Invalid file type. Please upload a valid Excel file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`/api/xlsx/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred.');
    }
  };

  const generateAttendanceReport = async () => {
    try {
      const response = await axios.get('/api/xlsx/attendance-report/all', {
        responseType: 'arraybuffer', // Important for handling binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'attendance_report.xlsx';
      link.click();

      setMessage('Attendance report downloaded successfully.');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred.');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-screen-md">
      {/* File Upload for Adding Students */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add Students</h2>
        <div className="flex items-center space-x-4">
          <label className="bg-blue-500 text-white px-4 py-2 rounded-l cursor-pointer hover:bg-blue-700">
            Choose File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={() => handleFileUpload('addstudentxlsx')}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Upload Students
          </button>
        </div>
      </div>

      {/* File Upload for Adding Teachers */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add Teachers</h2>
        <div className="flex items-center space-x-4">
          <label className="bg-green-500 text-white px-4 py-2 rounded-l cursor-pointer hover:bg-green-700">
            Choose File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={() => handleFileUpload('addteacherxlsx')}
            className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-700"
          >
            Upload Teachers
          </button>
        </div>
      </div>

      {/* File Upload for Adding Subjects */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add Subjects</h2>
        <div className="flex items-center space-x-4">
          <label className="bg-yellow-500 text-white px-4 py-2 rounded-l cursor-pointer hover:bg-yellow-700">
            Choose File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={() => handleFileUpload('addsubjectxlsx')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-r hover:bg-yellow-700"
          >
            Upload Subjects
          </button>
        </div>
      </div>

      {/* Generate Attendance Report */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Attendance Report</h2>
        <button
          onClick={generateAttendanceReport}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Generate Attendance Report
        </button>
      </div>

      {/* Display success or error message */}
      {message && <p className="text-red-600">{message}</p>}
    </div>
  );
};

export default UploadBulkData;
