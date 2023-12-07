import { useState } from "react";
import { useAllData } from "../../../context/AllDataContext";
import { teacherFieldVerify } from "../../../action/InputFieldVerification";
import { API_Type, msgType } from "../../../types/Types";
import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";
import DeleteButton from "../../../components/DeleteButton";
import { useLocation } from "react-router-dom";


const data = {
    teacher_id:"",
    name:"",
    email:"",
    phone_no:"",
    subjects:[],
    password:"",
}


const UpdateTeacher = () => {
  const {state} = useLocation()
  const {createItem,setMsg} = useAllData()
  // const [teacher, setTeacher] = useState(data);
  const [teacher, setTeacher] = useState({...state});

  
  const HandleClick = ()=>{
    if(teacherFieldVerify(teacher)){
      createItem({API:API_Type.teacher,data:teacher})
    }
    else{
      let msg = "Fill all required fields"
      setMsg({msg,msgType:msgType.WARNING})
    }
  }


  return (
    <div>
      <TopOfPage pagePath={"Dashboard >> Teacher >> Update"} pageName={"Update Teacher"}/>
      <TeacherForm teacher={teacher} setTeacher={setTeacher}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton API={API_Type.student} itemId={teacher.id} />
      </div>
    </div>
  )
}

export default UpdateTeacher
