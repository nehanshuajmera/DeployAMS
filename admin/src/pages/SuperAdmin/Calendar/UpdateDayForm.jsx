import React, { useState } from 'react';
import axios from 'axios';

const UpdateDayForm = () => {
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [message, setMessage] = useState(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleUpdateDay = async () => {
    try {
      // Perform validation if needed
      if (!date || !day) {
        setMessage('Date and Day are required');
        return;
      }

      // Format the date to match the server's expectations
      const formattedDate = new Date(date).toISOString();

      // Make the API request to update the day
      const response = await axios.post('/api/calander/updateday', {
        date: formattedDate,
        day,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating day:', error);
      setMessage('Error updating day. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Day</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="day" className="block text-gray-700">Day:</label>
        <select id="day" value={day} onChange={(e) => setDay(e.target.value)} className="mt-1 p-2 border rounded-md w-full">
          <option value="" disabled>Select Day</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <button onClick={handleUpdateDay} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Day</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default UpdateDayForm;
