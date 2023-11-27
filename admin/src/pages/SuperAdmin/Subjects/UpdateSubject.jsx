import { useState } from "react";
import SubjectForm from "../../../components/SubjectForm";
import { subjectFieldVerify } from "../../../action/InputFieldVerification";
import TopOfPage from "../../../components/TopOfPage";
import { useAllData } from "../../../context/AllDataContext";
import { API_Type,msgType } from "../../../types/Types";
import DeleteButton from "../../../components/DeleteButton";


const data = {
  subject_name:"",
  course_code:"",
  branch:"",
  section:"",
  batch:"",
  teacher_id:"",
  day:[],
};


const UpdateSubject = () => {
  const {createItem,setMsg} = useAllData()
  const [subject, setSubject] = useState(data);

  
  const HandleClick = ()=>{
    if(subjectFieldVerify(subject)){
      createItem({API:API_Type.subject,data:subject})
    }
    else{
      let msg = "Fill all required fields"
      setMsg({msg,msgType:msgType.WARNING})
    }
  }


  return (
    <div>
      <TopOfPage pagePath={"Dashboard >> Subject >> Update"} pageName={"Update Subject"}/>
      <SubjectForm subject={subject} setSubject={setSubject}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton API={API_Type.student} itemId={''} />
      </div>
    </div>
  )
}

export default UpdateSubject
