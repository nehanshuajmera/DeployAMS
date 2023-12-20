import { useState } from "react";
import SubjectForm from "../../../components/SubjectForm";

import TopOfPage from "../../../components/TopOfPage";
import { subjectFieldVerify } from "../../../action/InputFieldVerification";
import { createSubjectAsync } from "../../../redux-toolkit/slices/crudsubjectslice";
import { useDispatch } from "react-redux";




const data = {
  subject_name:"",
  course_code:"",
  branch:"",
  section:"",
  batch:"",
  teacher_id:"",
  day:[],
};


const CreateSubject = () => {
  const [subject, setSubject] = useState(data);
  const dispatch = useDispatch();
  
  
  const HandleClick = ()=>{
    if(subjectFieldVerify(subject)){
      try {
        ;(async()=>{
          await dispatch(createSubjectAsync({...subject}))

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
      <TopOfPage pagePath={"Dashboard >> subject >> create"} pageName={"Create subject"}/>
      <SubjectForm subject={subject} setSubject={setSubject}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateSubject
