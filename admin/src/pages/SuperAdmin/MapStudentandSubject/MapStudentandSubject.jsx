import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapStudentandSubject = () => {
  const [studentIds, setStudentIds] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [studentFilter, setStudentFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  useEffect(() => {
    console.log(studentIds, subjectIds);
  }, [studentIds, subjectIds]);

  useEffect(() => {
    const fetchStudentsAndSubjects = async () => {
      try {
        const studentsResponse = await axios.get('/api/admin/allstudents');
        const subjectsResponse = await axios.get('/api/admin/allsubjects');
        setStudents(studentsResponse.data.message);
        setFilteredStudents(studentsResponse.data.message);
        setSubjects(subjectsResponse.data.message);
        setFilteredSubjects(subjectsResponse.data.message);
      } catch (error) {
        console.error('Error fetching students and subjects:', error);
      }
    };

    fetchStudentsAndSubjects();
  }, []);

  const combineSubjectsAndStudents = async () => {
    try {
      // console.log(studentIds,subjectIds)
      const response = await axios.post('/api/mapstudentsubject/combinesubjectandstudents', {
        studentIds,
        subjectIds,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error combining subjects and students:', error);
      setMessage('Error combining subjects and students.');
    }
  };

  const handleStudentFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setStudentFilter(filterValue);
    const filtered = students.filter(
      (student) => student.name.toLowerCase().includes(filterValue) || student.enrollment_no.toLowerCase().includes(filterValue)
    );
    setFilteredStudents(filtered);
  };

  const handleSubjectFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setSubjectFilter(filterValue);
    const filtered = subjects.filter(
      (subject) =>
        subject.course_code.toLowerCase().includes(filterValue) ||
        subject.subject_name.toLowerCase().includes(filterValue) ||
        subject.branch.toLowerCase().includes(filterValue) ||
        subject.section.toLowerCase().includes(filterValue) ||
        subject.batch.toLowerCase().includes(filterValue)
    );
    setFilteredSubjects(filtered);
  };

  return (
    <div className="container mx-auto mt-10 m-4 flex justify-center items-center flex-col ">
      <h1 className="text-2xl font-bold mb-4">Combine Subjects and Students</h1>

      <div className="mb-4 m-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Search Students:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={studentFilter}
          onChange={handleStudentFilterChange}
        />
        <select
          className="border p-2 w-full mt-2"
          multiple
          value={studentIds}
          onChange={(e) =>
            setStudentIds(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {filteredStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.enrollment_no} - {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 m-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Search Subjects:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={subjectFilter}
          onChange={handleSubjectFilterChange}
        />
        <select
          className="border p-2 w-full mt-2"
          multiple
          value={subjectIds}
          onChange={(e) =>
            setSubjectIds(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {filteredSubjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.course_code} - {subject.subject_name} - {subject.branch} - {subject.section} - {subject.batch}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded "
        onClick={combineSubjectsAndStudents}
      >
        Combine
      </button>

      {message && (
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default MapStudentandSubject;
