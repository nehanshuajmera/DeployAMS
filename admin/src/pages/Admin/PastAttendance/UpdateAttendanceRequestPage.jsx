import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAttendanceRequestPage = () => {
  const [date, setDate] = useState('');
  const [pastRequests, setPastRequests] = useState([]);

  useEffect(() => {
    // Fetch past requests when the component mounts
    const fetchPastRequests = async () => {
      try {
        const response = await axios.get('/api/viewmyrequest');
        setPastRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching past requests:', error);
      }
    };

    fetchPastRequests();
  }, []); // Run this effect only once when the component mounts

  const handleRequestUpdate = async (event) => {
    event.preventDefault();

    try {
      // Perform validation if needed
      if (!date) {
        alert('Date is required');
        return;
      }

      // Make the API request to send the update attendance request
      await axios.post(`/api/asktoupdate/:id`, {
        date,
      });

      // Refresh the list of past requests
      const response = await axios.get('/api/viewmyrequest');
      setPastRequests(response.data.requests);

      // Clear the form
      setDate('');
    } catch (error) {
      console.error('Error sending update attendance request:', error);
      alert('Error sending update attendance request. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Attendance Request</h2>

      {/* Form to apply for past attendance */}
      <form onSubmit={handleRequestUpdate}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Apply for Update
        </button>
      </form>

      {/* Section to show past requests and their status */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Past Update Attendance Requests</h3>
        {pastRequests.length === 0 ? (
          <p>No past update attendance requests.</p>
        ) : (
          <ul>
            {pastRequests.map((request) => (
              <li key={request._id} className="mb-4">
                <strong>{request.subject.name}</strong> - {request.proposedDateTime} - Status: {request.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UpdateAttendanceRequestPage;
