import { useState } from "react";
import { useAllData } from "../../../context/AllDataContext";
import { teacherFieldVerify } from "../../../action/InputFieldVerification";
import { API_Type, msgType } from "../../../types/Types";
import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";


const data = {
    teacher_id:"",
    name:"",
    email:"",
    phone_no:"",
    subjects:[],
    password:"",
}


const CreateTeacher = () => {
  const {createItem,setMsg} = useAllData()
  const [teacher, setTeacher] = useState(data);

  
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
      <TopOfPage pagePath={"Dashboard >> Teacher >> Create"} pageName={"Create Teacher"}/>
      <TeacherForm teacher={teacher} setTeacher={setTeacher}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateTeacher
