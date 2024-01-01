import React, { useState } from 'react';
import axios from 'axios';

const AddMoreDaysForm = () => {
  const [daysCount, setDaysCount] = useState('');
  const [message, setMessage] = useState(null);

  const handleAddMoreDays = async () => {
    try {
      // Perform validation if needed
      if (!daysCount || isNaN(daysCount) || daysCount <= 0) {
        setMessage('Please enter a valid number of days');
        return;
      }

      // Make the API request to add more days to the academic calendar
      const response = await axios.post('/api/calander/addmoredays', {
        dayscnt: parseInt(daysCount),
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error adding more days:', error);
      setMessage('Error adding more days. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add More Days to Academic Calendar</h2>
      <div className="mb-4">
        <label htmlFor="daysCount" className="block text-gray-700">Number of Days:</label>
        <input type="number" id="daysCount" value={daysCount} onChange={(e) => setDaysCount(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <button onClick={handleAddMoreDays} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add More Days</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AddMoreDaysForm;
