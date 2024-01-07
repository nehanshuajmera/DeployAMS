import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendancePermission = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/updatepastattendance/viewallrequest');
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptReject = async (requestId, status) => {
    try {
      // Make an API request to accept or reject the request
      const response = await axios.post(`/api/updatepastattendance/acceptorreject/${requestId}`, {
        status: status,
      });

      // Handle success, e.g., show a success message or update state
      console.log(response.data.message);
      // Refresh the requests after handling one
      fetchRequests();
    } catch (error) {
      console.error('Error accepting or rejecting request:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="container mx-auto p-4 text-center ">
    <h2 className="text-2xl font-bold mb-4 text-center ">Attendance Permission Requests</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Subject</th>
            <th className="py-2 px-4 border">Course Code</th>
            <th className="py-2 px-4 border">Section</th>
            <th className="py-2 px-4 border">Batch</th>
            <th className="py-2 px-4 border">Class Name</th>
            <th className="py-2 px-4 border">Proposed Date</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 border">{request.subject.subject_name}</td>
              <td className="py-2 px-4 border">{request.subject.course_code}</td>
              <td className="py-2 px-4 border">{request.subject.section}</td>
              <td className="py-2 px-4 border">{request.subject.batch}</td>
              <td className="py-2 px-4 border">{request.subject.class_name}</td>
              <td className="py-2 px-4 border">{new Date(request.proposedDateTime).toLocaleDateString('en-US')}</td>
              <td className="py-2 px-4 border">{request.status}</td>
              <td className="py-2 px-4 border">
                {request.status === 'pending' && (
                  <>
                    <button onClick={() => handleAcceptReject(request._id, 'Accepted')} className="bg-green-500 text-white py-2 px-4 rounded-md mr-2">Accept</button>
                    <button onClick={() => handleAcceptReject(request._id, 'Rejected')} className="bg-red-500 text-white py-2 px-4 rounded-md">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePermission;
