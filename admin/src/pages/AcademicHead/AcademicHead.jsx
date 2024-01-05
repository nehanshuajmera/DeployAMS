import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcademicHead = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/academichead/allstudents');
        setStudents(response.data.students);
        setFilteredStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students based on the search term
    const filtered = students.filter((student) =>

      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.enrollment_no.toLowerCase().includes(searchTerm.toLowerCase()) || student.scholar_no.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
  };

  const closeStudentDetails = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Student List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Enrollment No</th>
            <th className="py-2 px-4 border">Scholar No</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{student.name}</td>
              <td className="py-2 px-4 border">{student.enrollment_no}</td>
              <td className="py-2 px-4 border">{student.scholar_no}</td>
              <td className="py-2 px-4 border ">{student.email}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded focus:outline-none"
                  onClick={() => openStudentDetails(student)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 mx-auto rounded shadow-lg max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedStudent.name}'s Details</h2>
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border">Subject Name</th>
                  <th className="py-2 px-4 border">Attendance</th>
                  <th className="py-2 px-4 border">Total Lectures</th>
                  <th className="py-2 px-4 border">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.subjects.map((subject) => (
                  <tr key={subject._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{subject.subject_id.subject_name} {subject.subject_id.section} {subject.subject_id.batch}</td>
                    <td className="py-2 px-4 border">{subject.attendance.length}</td>
                    <td className="py-2 px-4 border">{subject.subject_id.lecture_dates.length}</td>
                    <td className="py-2 px-4 border">{(subject.attendance.length / subject.subject_id.lecture_dates.length) * 100}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
              onClick={closeStudentDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicHead;
