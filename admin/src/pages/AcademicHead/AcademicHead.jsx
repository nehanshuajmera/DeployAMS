import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcademicHead = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  const [filters, setFilters] = useState({
    year: '',
    department: '',
    branch: '',
    section: '',
  });

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
    // Filter students based on the search term and dropdown filters
    console.log(filters);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.year ? student.year == filters.year : true) &&
      (filters.department ? student.department === filters.department : true) &&
      (filters.branch ? student.branch === filters.branch : true) &&
      (filters.section ? student.section === filters.section : true)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students, filters]);

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
  };

  const closeStudentDetails = () => {
    setSelectedStudent(null);
  };

  const handleFilterChange = (filterType, value) => {
    console.log(filterType, value);
    setFilters({
      ...filters,
      [filterType]: value,
    });
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
      <div className="flex mb-4 space-x-4">
        <div>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            className="p-2 border rounded"
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            <option value="">All</option>
            <option value="2023">1st</option>
            <option value="2022">2nd</option>
            <option value="2021">3rd</option>
            <option value="2020">4th</option>
            {/* Add more years as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            className="p-2 border rounded"
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            <option value="">All</option>
            <option value="Computer Science Engineering">CSE</option>
            {/* Add more departments as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="branch">Branch:</label>
          <select
            id="branch"
            className="p-2 border rounded"
            onChange={(e) => handleFilterChange('branch', e.target.value)}
          >
            <option value="">All</option>
            <option value="CSE">CSE</option>
            {/* Add more branches as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="section">Section:</label>
          <select
            id="section"
            className="p-2 border rounded"
            onChange={(e) => handleFilterChange('section', e.target.value)}
          >
            <option value="">All</option>
            <option value="A">A</option>
            {/* Add more sections as needed */}
          </select>
        </div>
      </div>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Enrollment No</th>
            <th className="py-2 px-4 border">Scholar No</th>
            <th className="py-2 px-4 border">Department</th>
            <th className="py-2 px-4 border">Branch</th>
            <th className="py-2 px-4 border">Section</th>
            <th className="py-2 px-4 border">Actions</th>
            <th className="py-2 px-4 border">More Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{student.name}</td>
              <td className="py-2 px-4 border">{student.enrollment_no}</td>
              <td className="py-2 px-4 border">{student.scholar_no}</td>
              <td className='py-2 px-4 border'>{student.department}</td>
              <td className='py-2 px-4 border'>{student.branch}</td>
              {/* email in lower case */}
              <td className="py-2 px-4 border ">{student.section}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded focus:outline-none"
                  onClick={() => openStudentDetails(student)}
                >
                  View Details
                </button>
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded focus:outline-none"
                  onClick={() => setShowPersonalDetails(student)}
                >
                  Personal Details
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
                    <td className="py-2 px-4 border">{Math.ceil((subject.attendance.length / subject.subject_id.lecture_dates.length) * 100)}%</td>
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

      {showPersonalDetails && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 mx-auto rounded shadow-lg max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{showPersonalDetails?.name}'s Personal Details</h2>
            <p><strong>Enrollment No:</strong> {showPersonalDetails?.enrollment_no}</p>
            <p><strong>Scholar No:</strong> {showPersonalDetails?.scholar_no}</p>
            <p><strong>Email:</strong> {showPersonalDetails?.email}</p>
            <p><strong>Phone:</strong> {showPersonalDetails?.phone_no}</p>
            <p><strong>Admission Year:</strong> {showPersonalDetails?.year}</p>
            <p><strong>Department:</strong> {showPersonalDetails.department}</p>
            <p><strong>Branch:</strong> {showPersonalDetails.branch}</p>
            <p><strong>Section:</strong> {showPersonalDetails.section}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
              onClick={() => setShowPersonalDetails(false)}
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
