import { useState } from "react";
import SubjectForm from "../../../components/SubjectForm";

// import TopOfPage from "../../../components/TopOfPage";


import DeleteButton from "../../../components/DeleteButton";
import { subjectFieldVerify } from "../../../action/InputFieldVerification";
import { updateSubjectAsync } from "../../../redux-toolkit/slices/crudsubjectslice";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";


// const data = {
//   subject_name:"",
//   course_code:"",
//   branch:"",
//   section:"",
//   batch:"",
//   teacher_id:"",
//   day:[],
// };


const UpdateSubject = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const {state} = useLocation()
  
  // const [subject, setSubject] = useState(data);
  const [subject, setSubject] = useState(state);

  const HandleClick = ()=>{
    if(subjectFieldVerify(subject)){
      try {
        ;(async()=>{
          await dispatch(updateSubjectAsync({ID:id,data:subject}))
        })()
        
      } catch (error) {
        console.log(error)
      }
    }
    else{
      let msg = "Fill all required fields"
      // setMsg({msg,msgType:msgType.WARNING})
    }
  }


  return (
    <div>
      {/* <TopOfPage pagePath={"Dashboard >> Subject >> Update"} pageName={"Update Subject"}/> */}
      <SubjectForm subject={subject} setSubject={setSubject}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton  itemId={subject.id} />
      </div>
    </div>
  )
}

export default UpdateSubject
