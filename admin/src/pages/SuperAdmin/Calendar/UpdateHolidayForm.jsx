import React, { useState } from 'react';
import axios from 'axios';

const UpdateHolidayForm = () => {
  const [date, setDate] = useState('');
  const [holiday, setHoliday] = useState(false);
  const [event, setEvent] = useState('');
  const [message, setMessage] = useState(null);

  const handleUpdateHoliday = async () => {
    try {
      // Perform validation if needed
      if (!date ) {
        setMessage('Date is required');
        return;
      }

      // Format the date to match the server's expectations
      const formattedDate = new Date(date).toISOString();
    
        

      // Make the API request to update the holiday
      const response = await axios.post('/api/calander/updateholiday', {
        date: formattedDate ,
        holiday,
        event,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating holiday:', error);
      setMessage('Error updating holiday. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Holiday</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="holiday" className="block text-gray-700">Holiday:</label>
        <input type="checkbox" id="holiday" checked={holiday} onChange={(e) => setHoliday(e.target.checked)} className="mt-1" />
      </div>
      <div className="mb-4">
        <label htmlFor="event" className="block text-gray-700">Event:</label>
        <input type="text" id="event" value={event} onChange={(e) => setEvent(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <button onClick={handleUpdateHoliday} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Holiday</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default UpdateHolidayForm;
