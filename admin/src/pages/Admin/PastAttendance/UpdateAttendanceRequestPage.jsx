import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const ViewMyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/updatepastattendance/viewmyrequest');
        console.log(response.data.requests);
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateAttendance = async (requestId) => {
    navigate(`/markpastattendance/${requestId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center ">My Update Attendance Requests</h2>
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
        <tbody className='text-center' >
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 border">{request.subject.subject_name}</td>
              <td className="py-2 px-4 border">{request.subject.course_code}</td>
              <td className="py-2 px-4 border">{request.subject.section}</td>
              <td className="py-2 px-4 border">{request.subject.batch}</td>
              <td className="py-2 px-4 border">{request.subject.class_name}</td>
              <td className="py-2 px-4 border">  {new Date(request.proposedDateTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              </td>
              <td className="py-2 px-4 border">{request.status}</td>
              <td className="py-2 px-4 border">
                {request.status === 'approved' && (
                  <button
                    onClick={() => handleUpdateAttendance(request._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Update Attendance
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMyRequestsPage;
