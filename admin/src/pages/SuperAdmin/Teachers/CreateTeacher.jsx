import { useState } from "react";


import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";
import { createTeacherAsync } from "../../../redux-toolkit/slices/crudteacherslice";
import { teacherFieldVerify } from "../../../action/InputFieldVerification";
import { useDispatch } from "react-redux";


const data = {
    teacher_id:"",
    name:"",
    department: "",
  faculty: "",
    email:"",
    phone_no:"",
    subjects:[],
    password:"medicaps",
}


const CreateTeacher = () => {
  const [teacher, setTeacher] = useState(data);
  const dispatch = useDispatch();

  
  const HandleClick = ()=>{
    if(teacherFieldVerify(teacher)){
      try {
        ;(async()=>{
          await dispatch(createTeacherAsync({...teacher}))
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
      <TopOfPage pagePath={"Dashboard >> Teacher >> Create"} pageName={"Create Teacher"}/>
      <TeacherForm teacher={teacher} setTeacher={setTeacher}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateTeacher
