import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TYPE, useMsgErr } from '../../../context/MsgAndErrContext';

const SubstituteTeacherRequests = () => {
  const { setMsgType, setMsg } = useMsgErr();
  const [requests, setRequests] = useState([]);
  const [allSubjects,setALLSubjects] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/substituteteacher/viewmyrequest');
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching substitute teacher requests:', error);
      }
    };

    const fetchAllTeachers = async () => {
      try {
        const response = await axios.get('/api/substituteteacher/getallteachers');
        setAllTeachers(response.data.teachers);
        // console.log(response.data.teachers)
      } catch (error) {
        console.error('Error fetching all teachers:', error);
      }
    };

    const fetchAllSubjects = async () => {
      try {
        const response = await axios.get('/api/teacher/details');
        setALLSubjects(response.data.message.subjects);
        // console.log(response.data.message.subjects)

      } catch (error) {
        console.error('Error fetching all teachers:', error);
      }
    };

    fetchAllSubjects();

    fetchRequests();
    fetchAllTeachers();
  }, []);

  const handleApplyRequest = async () => {
    if (!selectedSubject || !selectedTeacher) {
      alert('Please select both subject and teacher');
      return;
    }

    try {
      const respone = await axios.post('/api/substituteteacher/generaterequest', {
        subjectId: selectedSubject,
        assign_teacherId: selectedTeacher,
      });
      if(respone.status !== 200){
        setMsgType(TYPE.Err);
          setMsg(" Failed to apply for request");
      }else{
        setMsgType(TYPE.Success);
        setMsg("Request generated successfully");
      }
      window.location.reload();
      
      // alert('Request generated successfully');
      // Optionally, you can refetch the requests after submission
      // setRequests([]);
    } catch (error) {
      console.error('Error generating request:', error);
      alert('Error generating request');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">My Substitute Teacher Requests</h1>

      <div className="flex gap-4 mb-4">
        <label htmlFor="subject" className="text-lg">
          Select Subject:
        </label>
        <select
          id="subject"
          className="p-2 border rounded"
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="" disabled selected>
            Select Subject
          </option>
          {allSubjects?.map((subject) =>
            
              <option key={subject.subject_id._id} value={subject.subject_id._id}>
                {subject.subject_id.subject_name} - {subject.subject_id.course_code} - {subject.subject_id.section} - {subject.subject_id.batch} 
              </option>
            
          )}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <label htmlFor="teacher" className="text-lg">
          Select Substitute Teacher:
        </label>
        <select
          id="teacher"
          className="p-2 border rounded"
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="" disabled selected>
            Select Teacher
          </option>
          {allTeachers?.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name} - {teacher.teacher_id}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={handleApplyRequest}
      >
        Apply for Substitute Teacher
      </button>

      <table className="w-full border border-collapse mt-4">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-2 px-4 border">Subject ID</th>
            <th className="py-2 px-4 border">Assigned Teacher ID</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{request.subjectId}</td>
              <td className="py-2 px-4 border">{request.assign_teacherId}</td>
              <td className="py-2 px-4 border">{request.flag ? 'Assigned' : 'Expired'}</td>
              <td className="py-2 px-4 border">{new Date(request.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        requests.length === 0 && <p className="text-center my-8 font-bold">No requests found</p>
      }
    </div>
  );
};

export default SubstituteTeacherRequests;
