import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import SubjectSearch from "./SubjectSearch";

// import { useAdmin } from "../context/AdminContext";

const StudentForm = ({ student, setStudent, HandleClick }) => {
  const [subject, setSubject] = useState("");

  const ChangeHandler = (e) => {
    setStudent((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // remove subject
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

  // change the subject's array
  const changeSubjectList = (subjectsList) => {
    setStudent((prev) => {
      return {
        ...prev,
        subjects: subjectsList,
      };
    });
  };

  return (
    <div className="w-full px-5 py-10 gap-14 flex flex-col item-center justify-center  bg-dimWhite">
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* name field */}
        <div className="relative w-full grid grid-cols-3 flex-1">
          <label
            htmlFor="name"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
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
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        {/* password field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="password"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
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
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* email field */}
        <div className="relative w-full grid grid-cols-3 flex-1">
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
              value={student.email}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        {/* phone_no field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
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
              value={student.phone_no}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        
      </div>

      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* year field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="year"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Year
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="year"
              id="year"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/year focus:border-primary focus:border-[1px] "
              value={student.year}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
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
              value={student.branch}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
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
              value={student.section}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
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
              value={student.batch}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>

          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* programme field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="programme"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Programme
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="programme"
              id="programme"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/programme focus:border-primary focus:border-[1px] "
              value={student.programme}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        {/* faculty field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="faculty"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Faculty
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="faculty"
              id="faculty"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/faculty focus:border-primary focus:border-[1px] "
              value={student.faculty}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>

          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* specialisation field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="specialisation"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            specialisation
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="specialisation"
              id="specialisation"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/specialisation focus:border-primary focus:border-[1px] "
              value={student.specialisation}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        {/* year field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="year"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Year
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="year"
              id="year"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/year focus:border-primary focus:border-[1px] "
              value={student.year}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>

          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row gap-5 flex-1">
        {/* Enrollment field */}
        <div className="relative w-full grid grid-cols-3  flex-1">
          <label
            htmlFor="enrollment_no"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
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
            />
                      <span className="ml-2 text-lg text-primary">*</span>
          </div>
        </div>
        {/* scholar field */}
        <div className="relative w-full grid grid-cols-3 flex-1 ">
          <label
            htmlFor="scholar_no"
            className={`px-3 py-2 text-secondary text-xl col-span-1 `}
          >
            Scholar
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              name="scholar_no"
              id="scholar_no"
              className="inputBox max-w-full outline-none bg-dimGray  border-secondary peer/scholar_no focus:border-primary focus:border-[1px] "
              value={student.scholar_no}
              onChange={(e) => ChangeHandler(e)}
            />
                      <span className="ml-2 text-lg text-primary">*</span>

          </div>
        </div>
      </div>
      <div className="flex justify-start items-center ">
        {/* students field */}
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
      {/* <SearchBar  /> */}
      <SubjectSearch subjects={student.subjects} changeSubjectList={changeSubjectList} />
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

// const SubjectSearch = ({selectedSubject})=>{
//   const {allSubject} = useAdmin()
//   const listOfSubject = [...allSubject]
//   return(
//     <div>
//       {
//         listOfSubject.map(subject=>{
//           return(
//             <div key={subject}>
//               {subject}
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }

// const SearchBar = () => {

//   // const {allSubject} = useAdmin()
//   const [searchResult, setSearchResult] = useState([...allSubject]);
//   const [search, setSearch] = useState('');

//   const searchFunc = (e)=>{
//       setSearch(e.target.value)
//       console.log(search)
//       if(search===''){
//         setSearchResult([...allSubject])
//       }
//       else{

//         const resultOfSearch = searchResult.filter(item=>{
//           console.log(item.subject_name.toLowerCase())
//           // filter out content either have same name or id
//           // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))

//           return (item.subject_name).toLowerCase().includes(search.toLowerCase())
//         })
//         setSearchResult([...resultOfSearch])
//       }
//   }

//   // to set new result when allSubject changes
//   useEffect(() => {
//     setSearchResult([...allSubject])
//    console.log("useEffect")
//   }, [allSubject])

//   useEffect(()=>{

//     (()=>{

//       if(search===''){
//         setSearchResult([...allSubject])
//       }
//       else{

//         const resultOfSearch = searchResult.filter(item=>{
//           console.log(item.subject_name.toLowerCase())
//           // filter out content either have same name or id
//           // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))

//           return (item.subject_name).toLowerCase().includes(search.toLowerCase())
//         })
//         setSearchResult([...resultOfSearch])
//       }
//     })()
//   },[search,allSubject])

// return (
//   <div>
//       <div className="relative w-[300px] md:w-[400px]">
//           <input type="text" name="search" id="search" className="inputBox border-[1px] border-gray-500 w-[300px] md:w-[400px] peer/search"
//           value={search ||''}
//           onChange={(e)=>searchFunc(e)}
//           />
//           {/* dropdown */}
//           <div className="absolute w-full h-[170px] bg-[#FFFBF5] left-0  hidden peer-focus/search:block">
//               <div className="flexStart flex-col">
//                   {
//                     searchResult.map(data=>{
//                       console.log(data.subject_name)
//                       return(
//                         <div key={data._id} className="text-black ">
//                           {data.subject_name}
//                         </div>
//                       )
//                     })
//                   }
//               </div>
//           </div>
//       </div>
//   </div>
// )
// }

export default StudentForm;
