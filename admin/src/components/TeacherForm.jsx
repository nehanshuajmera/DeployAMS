import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

const TeacherForm = ({ teacher, setTeacher, HandleClick }) => {


  const ChangeHandler = (e) => {
    setTeacher((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const removeSubject = (id) => {
    const newList = teacher.subjects.filter((subject) => {
      return subject.id != id;
    });
    setTeacher((prev) => {
      return {
        ...prev,
        subjects: newList,
      };
    });
  };


  return (
    <div className="w-full px-5 py-10 gap-14 flex flex-col item-center justify-center  bg-dimWhite">
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* teacher_name field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="teacher_name"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Teacher Name
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="name"
              id="name"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/name focus:border-primary focus:border-[1px] "
              value={teacher.name}
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
              value={teacher.teacher_id}
              onChange={(e) => ChangeHandler(e)}
              placeholder="teacher_id"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* email field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="email"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Email
          </label>
          <div className="relative col-span-2">
            <input
              type="email"
              name="email"
              id="email"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/email focus:border-primary focus:border-[1px] "
              value={teacher.email}
              onChange={(e) => ChangeHandler(e)}
            />
          </div>
        </div>
        {/* phone no field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="phone_no"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Phone No.
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="phone_no"
              id="phone_no"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/phone_no focus:border-primary focus:border-[1px] "
              value={teacher.phone_no}
              onChange={(e) => ChangeHandler(e)}
            />
          </div>
        </div>
      </div>

      
      <div className="flex justify-start items-center ">
        {/* subjects field */}
        <div className="relative w-full grid grid-cols-3  md:flex md:justify-start">
          <label
            htmlFor="subjects"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Subjects
          </label>
          <div className="flex flex-col gap-3 col-span-2 ">
            <input
              type="text"
              name="subjects"
              id="subjects"
              className="inputBox md:w-[340px] outline-none bg-dimGray  border-secondary peer/subjects focus:border-primary focus:border-[1px] "
              // value={teacher.subject}
              // onChange={(e) => ChangeHandler(e)}
              // value={subject}
              // onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <div className="flex gap-3 flex-wrap">
              {teacher.subjects.map((subject) => (
                <SubjectCollection
                  key={subject.id}
                  subject={subject}
                  removeSubject={removeSubject}
                />
              ))}
            </div>
          </div>
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



const SubjectCollection = ({ subject, removeSubject }) => {
  return (
    <div className="bg-primary relative text-white pl-3 py-2 rounded-3xl flex justify-between items-center gap-1">
      <p>{subject.name}</p>
      <div
        className=" right-2 text-3xl flexCenter cursor-pointer"
        onClick={() => removeSubject(subject.id)}
      >
        <IoIosClose />
      </div>
    </div>
  );
};


const SubjectSearch = ({selectedSubject})=>{
  const {allsubject} = useAdmin()
  const listOfSubject = [...allsubject]
  return(
    <div>
      {
        listOfSubject.map(subject=>{
          return(
            <div key={subject}>
              {subject}
            </div>
          )
        })
      }
    </div>
  )
}



export default TeacherForm;
