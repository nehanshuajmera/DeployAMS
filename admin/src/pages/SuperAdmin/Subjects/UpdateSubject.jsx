// import { useState } from "react";
// import SubjectForm from "../../../components/SubjectForm";
// import { subjectFieldVerify } from "../../../action/InputFieldVerification";
// import TopOfPage from "../../../components/TopOfPage";
// import { useAllData } from "../../../context/AllDataContext";
// import { API_Type,msgType } from "../../../types/Types";
// import DeleteButton from "../../../components/DeleteButton";


// const data = {
//   subject_name:"OOPS",
//   course_code:"CB703021",
//   branch:"CSBS",
//   section:"A",
//   batch:"A",
//   teacher_id:"00001", 
//   day:[{"name":"Monday","count":1},{"name":"Thursday","count":1}]
// };


// const UpdateSubject = () => {
//   const {createItem,setMsg} = useAllData()
//   const [subject, setSubject] = useState(data);

  
//   const HandleClick = ()=>{
//     if(subjectFieldVerify(subject)){
//       createItem({API:API_Type.subject,data:subject})
//     }
//     else{
//       let msg = "Fill all required fields"
//       setMsg({msg,msgType:msgType.WARNING})
//     }
//   }


//   return (
//     <div>
//       <TopOfPage pageName={"Create subject"} pagePath={"createsubject"}/>
//       <SubjectForm subject={subject} setSubject={setSubject}  HandleClick={HandleClick}/>
//       <div className="flex justify-end px-3">
//         <DeleteButton API={API_Type.student} itemId={''} />
//       </div>
//     </div>
//   )
// }

// export default UpdateSubject
