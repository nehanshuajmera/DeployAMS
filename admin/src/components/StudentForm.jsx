import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useAdmin } from "../context/AdminContext";
import { useEffect } from "react";

const StudentForm = ({ student, setStudent, HandleClick }) => {

  const [subject, setSubject] = useState("")
  


  
  
  const ChangeHandler = (e) => {
    setStudent((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  
  const removeSubject = (id) => {
    const newList = student.subjects.filter((subject) => {
      return subject.id != id;
    });
    setStudent((prev) => {
      return {
        ...prev,
        subjects: newList,
      };
    });
  };
  
  


  return (
    <div className="w-full px-5 py-10 gap-14 flex flex-col item-center justify-center  bg-dimWhite">
      <div className="flex justify-start items-center ">
        {/* name field */}
        <div className="relative w-full grid grid-cols-3 md:flex md:justify-start md:gap-5">
          <label
            htmlFor="name"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Name
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="name"
              id="name"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/name focus:border-primary focus:border-[1px] "
              value={student.name}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Name" />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/name:block">
              Incorrect input
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center flex-col md:flex-row gap-5 flex-1">
        {/* Email field */}
        <div className="relative w-full grid grid-cols-3 flex-1 md:flex md:justify-start md:gap-5">
          <label
            htmlFor="email"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Email
          </label>
          <div className="relative col-span-2">
            <input
              type="email"
              name="email"
              id="email"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/email focus:border-primary focus:border-[1px] "
              value={student.email}
              onChange={(e) => ChangeHandler(e)}
              required
              placeholder="email@gmail.com" />
            <p className="absolute text-sm z-10 text-primary left-0 top-[80%] md:top-[100%] hidden peer-invalid/email:block">
              Incorrect input
            </p>
          </div>
        </div>
        {/* Password field */}
        <div className="relative w-full grid grid-cols-3 md:flex md:justify-start md:gap-5 flex-1">
          <label
            htmlFor="password"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Password
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="password"
              id="password"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/password focus:border-primary focus:border-[1px] "
              value={student.password}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Password" />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/password:block">
              Incorrect input
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center flex-col md:flex-row md:grid  md:grid-cols-3 gap-5 flex-1">
        {/* Enrollment field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="enrollment_no"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Enrollment
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="enrollment_no"
              id="enrollment_no"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/enrollment_no focus:border-primary focus:border-[1px] "
              value={student.enrollment_no}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Enrollment No." />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/enrollment_no:block">
              Incorrect input
            </p>
          </div>
        </div>
        {/* scholar field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="scholar_no"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Scholar No.
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="scholar_no"
              id="scholar_no"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/scholar_no focus:border-primary focus:border-[1px]"
              value={student.scholar_no}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Scholar No." />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/scholar_no:block">
              Incorrect input
            </p>
          </div>
        </div>
        {/* phone No field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="phone_no"
            className={`px-3 py-2 text-secondary text-xl  col-span-1 `}>
            Phone No.
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="phone_no"
              id="phone_no"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/phone_no focus:border-primary focus:border-[1px] "
              value={student.phone_no}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Phone No." />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid:block">
              Incorrect input
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center flex-col md:flex-row md:grid  md:grid-cols-3 gap-5 flex-1">
        {/* Branch field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="branch"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Branch
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="branch"
              id="branch"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/branch focus:border-primary focus:border-[1px]   "
              value={student.branch}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Branch" />
            <p className="absolute text-sm text-primary left-0 bottom-0  hidden peer-invalid/branch:block">
              Incorrect input
            </p>
          </div>
        </div>
        {/* Section field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="section"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}>
            Section
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="section"
              id="section"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/section focus:border-primary focus:border-[1px]"
              value={student.section}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Section"
            />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/section:block">
              Incorrect input
            </p>
          </div>
        </div>
        {/* Batch field */}
        <div className="relative w-full grid grid-cols-3 ">
          <label
            htmlFor="name"
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
              value={student.batch}
              onChange={(e) => ChangeHandler(e)}
              placeholder="Batch"
            />
            <p className="absolute text-sm text-primary left-20 top-[100%] hidden peer-invalid/batch:block">
              Incorrect input
            </p>
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
              // value={student.subject}
              // onChange={(e) => ChangeHandler(e)}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <div className="flex gap-3 flex-wrap">
              {student.subjects.map((subject) => (
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
      <SearchBar  />
      <div className="flex justify-end items-center">
        <button className="button1" onClick={() => HandleClick()}>
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
  const {allSubject} = useAdmin()
  const listOfSubject = [...allSubject]
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


const SearchBar = () => {

  const {allSubject} = useAdmin()
  const [searchResult, setSearchResult] = useState([...allSubject]);
  const [search, setSearch] = useState('');
    
  const searchFunc = (e)=>{
      setSearch(e.target.value)
      console.log(search)
      if(search===''){
        setSearchResult([...allSubject])
      }
      else{

        const resultOfSearch = searchResult.filter(item=>{
          console.log(item.subject_name.toLowerCase())
          // filter out content either have same name or id
          // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))
          
          return (item.subject_name).toLowerCase().includes(search.toLowerCase())
        })        
        setSearchResult([...resultOfSearch])
      }
  }
  
  // to set new result when allSubject changes
  useEffect(() => {
    setSearchResult([...allSubject])  
   console.log("useEffect")
  }, [allSubject])


return (
  <div>
      <div className="relative w-[300px] md:w-[400px]">
          <input type="text" name="search" id="search" className="inputBox border-[1px] border-gray-500 w-[300px] md:w-[400px] peer/search" 
          value={search}
          onChange={(e)=>searchFunc(e)}
          />
          {/* dropdown */}
          <div className="absolute w-full h-[170px] bg-[#FFFBF5] left-0  hidden peer-focus/search:block">
              <div className="flexStart flex-col">
                  {
                    searchResult.map(data=>{
                      console.log(data.subject_name)
                      return(
                        <div key={data._id} className="text-black ">
                          {data.subject_name}
                        </div>
                      )
                    })
                  }
              </div>
          </div>
      </div>
  </div>
)
}

export default StudentForm;
