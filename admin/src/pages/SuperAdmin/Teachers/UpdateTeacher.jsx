import { useState } from "react";


import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";
import DeleteButton from "../../../components/DeleteButton";


const data = {
    teacher_id:"",
    name:"",
    email:"",
    phone_no:"",
    subjects:[],
    password:"",
}


const UpdateTeacher = () => {
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
      <TopOfPage pagePath={"Dashboard >> Teacher >> Update"} pageName={"Update Teacher"}/>
      <TeacherForm teacher={teacher} setTeacher={setTeacher}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton API={API_Type.student} itemId={''} />
      </div>
    </div>
  )
}

export default UpdateTeacher
