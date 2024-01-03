// MapTeacherandSubject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapTeacherandSubject = () => {
  const [teacherId, setTeacherId] = useState("");
  const [subjectIds, setSubjectIds] = useState([]);
  const [message, setMessage] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [courseCodeFilter, setCourseCodeFilter] = useState('');
  const [subjectNameFilter, setSubjectNameFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');

  useEffect(() => {
    console.log(teacherId, subjectIds);
  }, [teacherId, subjectIds]);

  useEffect(() => {
    const fetchTeachersAndSubjects = async () => {
      try {
        const teachersResponse = await axios.get('/api/admin/allteachers');
        const subjectsResponse = await axios.get('/api/admin/allsubjects');
        setTeachers(teachersResponse.data.message);
        setFilteredTeachers(teachersResponse.data.message);
        setSubjects(subjectsResponse.data.message);
        setFilteredSubjects(subjectsResponse.data.message);
      } catch (error) {
        console.error('Error fetching teachers and subjects:', error);
      }
    };

    fetchTeachersAndSubjects();
  }, []);

  const combineSubjectsAndTeachers = async () => {
    try {
      const response = await axios.post('/api/mapstudentsubject/combinesubjectandteacher', {
        teacherId: teacherId,
        subjectIds,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error combining subjects and teachers:', error);
      setMessage('Error combining subjects and teachers.');
    }
  };

  const handleTeacherFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setTeacherFilter(filterValue);
    const filtered = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(filterValue) ||
        teacher.enrollment_no.toLowerCase().includes(filterValue)
    );
    setFilteredTeachers(filtered);
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

  const handleCourseCodeFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setCourseCodeFilter(filterValue);
    const filtered = subjects.filter((subject) => subject.course_code.toLowerCase().includes(filterValue));
    setFilteredSubjects(filtered);
  };

  const handleSubjectNameFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setSubjectNameFilter(filterValue);
    const filtered = subjects.filter((subject) => subject.subject_name.toLowerCase().includes(filterValue));
    setFilteredSubjects(filtered);
  };

  const handleBranchFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setBranchFilter(filterValue);
    const filtered = subjects.filter((subject) => subject.branch.toLowerCase().includes(filterValue));
    setFilteredSubjects(filtered);
  };

  const handleSectionFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setSectionFilter(filterValue);
    const filtered = subjects.filter((subject) => subject.section.toLowerCase().includes(filterValue));
    setFilteredSubjects(filtered);
  };

  const handleBatchFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setBatchFilter(filterValue);
    const filtered = subjects.filter((subject) => subject.batch.toLowerCase().includes(filterValue));
    setFilteredSubjects(filtered);
  };

  const handleTeacherCheckboxChange = (teacherId) => {
    setTeacherId(teacherId);
  };

  const handleSubjectCheckboxChange = (subjectId) => {
    setSubjectIds((prevSubjectIds) =>
      prevSubjectIds.includes(subjectId)
        ? prevSubjectIds.filter((id) => id !== subjectId)
        : [...prevSubjectIds, subjectId]
    );
  };

  return (
    <div className="container mx-auto mt-10 m-4 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Combine Subjects and Teachers</h1>

      <div className="flex gap-8 w-full">
        <div className=" w-1/2 bg-gray-100 p-4 rounded-lg">
          <label className="block text-gray-700 text-sm font-bold mb-2">Search Teachers:</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={teacherFilter}
            onChange={handleTeacherFilterChange}
            placeholder="Search by name or enrollment number"
          />
          <div className="flex flex-col gap-4 overflow-y-auto max-h-96">
            {filteredTeachers.map((teacher) => (
              <div key={teacher._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={teacher._id}
                  checked={teacherId === teacher._id}
                  onChange={() => handleTeacherCheckboxChange(teacher._id)}
                  className="mr-2"
                />
                <span className="text-sm">
                  {teacher.teacher_id} - {teacher.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-1/2 bg-gray-100 p-4 rounded-lg">
          <label className="block text-gray-700 text-sm font-bold mb-2">Search Subjects:</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={subjectFilter}
            onChange={handleSubjectFilterChange}
            placeholder="Search by code, name, or branch"
          />
          <div className="flex flex-col gap-4">
            <select className="border p-2" onChange={handleCourseCodeFilterChange}>
              <option value="">Filter by Course Code</option>
              {Array.from(new Set(subjects.map((subject) => subject.course_code))).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <select className="border p-2" onChange={handleSubjectNameFilterChange}>
              <option value="">Filter by Subject Name</option>
              {Array.from(new Set(subjects.map((subject) => subject.subject_name))).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select className="border p-2" onChange={handleBranchFilterChange}>
              <option value="">Filter by Branch</option>
              {Array.from(new Set(subjects.map((subject) => subject.branch))).map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <select className="border p-2" onChange={handleSectionFilterChange}>
              <option value="">Filter by Section</option>
              {Array.from(new Set(subjects.map((subject) => subject.section))).map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
            <select className="border p-2" onChange={handleBatchFilterChange}>
              <option value="">Filter by Batch</option>
              {Array.from(new Set(subjects.map((subject) => subject.batch))).map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-4 flex-col gap-4 overflow-y-auto max-h-96">
            {filteredSubjects.map((subject) => (
              <div key={subject._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={subject._id}
                  checked={subjectIds.includes(subject._id)}
                  onChange={() => handleSubjectCheckboxChange(subject._id)}
                  className="mr-2"
                />
                <span className="text-sm">
                  {subject.course_code} - {subject.subject_name} - {subject.branch}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded mt-6"
        onClick={combineSubjectsAndTeachers}
      >
        Combine
      </button>

      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default MapTeacherandSubject;
