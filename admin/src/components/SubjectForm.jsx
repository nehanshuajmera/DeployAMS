import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

const StudentForm = ({ subject, setSubject, HandleClick }) => {


  const ChangeHandler = (e) => {
    setSubject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const changeDayObj = (dayObj) =>{
    setSubject((prev) => {
      return {
        ...prev,
        day: [...dayObj],
      };
    });
  }

  // const removeSubject = (id) => {
  //   const newList = student.day.filter((subject) => {
  //     return subject.id != id;
  //   });
  //   setSubject((prev) => {
  //     return {
  //       ...prev,
  //       day: newList,
  //     };
  //   });
  // };

  return (
    <div className="w-full px-5 py-10 gap-14 flex flex-col item-center justify-center  bg-dimWhite">
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* subject_name field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="subject_name"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Subject Name
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="subject_name"
              id="subject_name"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/subject_name focus:border-primary focus:border-[1px] "
              value={subject.subject_name}
              onChange={(e) => ChangeHandler(e)}
            />
          </div>
        </div>
        {/* teacher_id field */}
        <div className="relative w-full grid grid-cols-3 flex-1">
          <label
            htmlFor="teacher_id"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Teacher
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="teacher_id"
              id="teacher_id"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/teacher_id focus:border-primary focus:border-[1px] "
              value={subject.teacher_id}
              onChange={(e) => ChangeHandler(e)}
              placeholder="teacher_id"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* course_code field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="course_code"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Course Code
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="course_code"
              id="course_code"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/course_code focus:border-primary focus:border-[1px] "
              value={subject.course_code}
              onChange={(e) => ChangeHandler(e)}
            />
          </div>
        </div>
        {/* branch field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="branch"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Branch
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="branch"
              id="branch"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/branch focus:border-primary focus:border-[1px] "
              value={subject.branch}
              onChange={(e) => ChangeHandler(e)}
              placeholder="branch"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* section field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="section"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Section
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="section"
              id="section"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/section focus:border-primary focus:border-[1px] "
              value={subject.section}
              onChange={(e) => ChangeHandler(e)}
              placeholder="section"
            />
          </div>
        </div>
        {/* Batch field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="batch"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Batch
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="batch"
              id="batch"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/batch focus:border-primary focus:border-[1px] "
              value={subject.batch}
              onChange={(e) => ChangeHandler(e)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        {/* day field */}
        <div className="flex flex-col gap-4">
          <p
           
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Select the day and count
          </p>
        
            <DaysSelection changeDayObj={changeDayObj}/>          
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button className="button1" onClick={HandleClick}>
          Save
        </button>
      </div>
    </div>
  );
};

const DaysSelection = ({changeDayObj}) => {
  const [weekDays, setWeekDays] = useState([
    {
      name:"Monday",
      count: 0,
    },
    {
      name:"Tuesday",
      count: 0,
    },
    {
      name:"Wednesday",
      count: 0,
    },
    {
      name:"Thursday",
      count: 0,
    },
    {
      name:"Friday",
      count: 0,
    },
    {
      name:"Saturday",
      count: 0,
    },
    {
      name:"Sunday",
      count: 0,
    },
  ]);
  // const weekDays = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];
  
  const countChange = (e)=>{
    setWeekDays((prev)=>{
      console.log(prev)
      
      const indexOfDay = prev.findIndex(item=>(item.name===e.target.name))
      return[
        ...prev,
        // prev[indexOfDay]={
        //   ...prev[indexOfDay],
        //   count:e.target.value
        // },
      ]
    })
    const listOfDay = weekDays.filter(day=>day.count!==0)
    changeDayObj(listOfDay)
  }


  return (
    <table>
      <thead>
        <tr>
          <td>Day</td>
          <td>Count</td>
        </tr>
      </thead>
      <tbody className="">
        {weekDays.map((day) => {
          return (
            
              <tr key={day.name}>
                <td>
                  {/* <input type="checkbox" name={day.name} id={day.name}  /> */}
                  <label htmlFor={day.name}>{day.name}</label>
                </td>
                <td>
                  <input
                    type="number"
                    name={day.name}
                    // id={day.name}
                    // defaultValue={}
                    className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/batch focus:border-primary focus:border-[1px] "
                    value={day.count}
                    onChange={(e) => countChange(e)}
                  />
                </td>
              </tr>
            
          );
        })}
        
      </tbody>
    </table>
  );
};

export default StudentForm;
