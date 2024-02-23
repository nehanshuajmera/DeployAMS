import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleSubjectAttadance from './SingleSubjectAttadance';

const SubjectReport = () => {
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({
    branch: '',
    courseCode: '',
    section: '',
    batch: '',
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    branches: [],
    sections: [],
    batches: [],
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/academichead/allsubjectswithallstudent');
        setSubjects(response.data.subject);

        // Fetch distinct values for dropdowns
        const branchSet = new Set();
        const sectionSet = new Set();
        const batchSet = new Set();

        response.data.subject.forEach(subject => {
          branchSet.add(subject.branch);
          sectionSet.add(subject.section);
          batchSet.add(subject.batch);
        });

        setDropdownOptions({
          branches: Array.from(branchSet),
          sections: Array.from(sectionSet),
          batches: Array.from(batchSet),
        });
      } catch (error) {
        console.error('Error fetching subjects:', error.response?.data || error.message);
      }
    };

    fetchSubjects();
  }, []);

  const todaysDate =()=>{
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
    let day = ("0" + today.getDate()).slice(-2);
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const [StartDate, setStartDate] = useState("2024-01-01");
  const [EndDate, setEndDate] = useState(todaysDate());

  const filteredSubjects = subjects.filter(subject => (
    subject.branch.includes(filters.branch) &&
    subject.course_code.includes(filters.courseCode) &&
    subject.section.includes(filters.section) &&
    subject.batch.includes(filters.batch)
  ));

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-3xl text-center bg-red-500 p-2 font-extrabold mb-4'>All Subjects with Students</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div className="col-span-1">
          <label className="block mb-2">
            Branch:
            <select
              className="border p-2 w-full"
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="">Select Branch</option>
              {dropdownOptions.branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-span-1">
          <label className="block mb-2">
            Course Code:
            <input
              type="text"
              className="border p-2 w-full"
              value={filters.courseCode}
              onChange={(e) => handleFilterChange('courseCode', e.target.value)}
            />
          </label>
        </div>
        <div className="col-span-1">
          <label className="block mb-2">
            Section:
            <select
              className="border p-2 w-full"
              value={filters.section}
              onChange={(e) => handleFilterChange('section', e.target.value)}
            >
              <option value="">Select Section</option>
              {dropdownOptions.sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-span-1">
          <label className="block mb-2">
            Batch:
            <select
              className="border p-2 w-full"
              value={filters.batch}
              onChange={(e) => handleFilterChange('batch', e.target.value)}
            >
              <option value="">Select Batch</option>
              {dropdownOptions.batches.map((batch, index) => (
                <option key={index} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div className="relative max-w-sm p-2">
      <label className="block mb-2">
        Start Date
      </label>
      <input  type="date" onChange={(e) => setStartDate(e.target.value)} className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
    </div>


    <div className="relative max-w-sm p-2">
      <label className="block mb-2">
        End Date
      </label>
      <input  type="date" onChange={(e) => setEndDate(e.target.value)} className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
    </div>
    </div>

      {filteredSubjects.map((subject) => (
        <div key={subject.subject_id} className="mb-4">
          <SingleSubjectAttadance subject={subject} sub_id={subject.subject_id} start_date={StartDate} end_date={EndDate} />
        </div>
      ))}
    </div>
  );
};

export default SubjectReport;
