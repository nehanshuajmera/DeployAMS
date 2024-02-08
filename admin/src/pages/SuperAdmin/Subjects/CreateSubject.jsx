import { useState } from "react";
import SubjectForm from "../../../components/SubjectForm";

// import TopOfPage from "../../../components/TopOfPage";
import { subjectFieldVerify } from "../../../action/InputFieldVerification";
import { createSubjectAsync } from "../../../redux-toolkit/slices/crudsubjectslice";
import { useDispatch, useSelector } from "react-redux";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";
import { useNavigate } from "react-router-dom";




const data = {
  subject_name:"",
  course_code:"",
  branch:"",
  section:"",
  batch:"",
  class_name:'',
  department:'',
  teacher_id:"",
  day:[],
};


const CreateSubject = () => {
  const [subject, setSubject] = useState(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {setMsgType, setMsg} = useMsgErr()
  
  const HandleClick = ()=>{
    if(subjectFieldVerify(subject)){
      console.log(subjState)
      try {
        ;(async()=>{
          await dispatch(createSubjectAsync({...subject}))
          if(subjState.isErr ){
            setMsgType(TYPE.Err)
            setMsg(subjState.errMsg)
          }
          else{
            
            setMsgType(TYPE.Success)
            setMsg("Subject added successfully")
            navigate("/allsubject")
          }
          console.log(subjState)
        })()
        
      } catch (error) {
        console.log(`failed to add subject : ${error}`)
        setMsgType(TYPE.Err)
        setMsg("Failed to add subject")
      }
    }
    else{
      let msg = "Fill all required fields"
      setMsgType(TYPE.Err)
      setMsg(msg)
    }
  }
  const subjState = useSelector((state) => state.crudsubject)
  console.log(subjState)

  return (
    <div>
      <p className="text-2xl font-bold text-center mt-2">Create Subject</p>
      {/* <TopOfPage pagePath={"Dashboard >> subject >> create"} pageName={"Create subject"}/> */}
      <SubjectForm subject={subject} setSubject={setSubject}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateSubject
