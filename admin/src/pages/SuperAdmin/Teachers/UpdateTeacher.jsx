import { useEffect, useState } from "react";
// import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";
import DeleteButton from "../../../components/DeleteButton";
import { useLocation, useParams } from "react-router-dom";
import { updateTeacherAsync } from "../../../redux-toolkit/slices/crudteacherslice";
import { useDispatch } from "react-redux";
import { teacherFieldVerify } from "../../../action/InputFieldVerification";
import cloneDeep from 'lodash/cloneDeep';

// const data = {
//     teacher_id:"",
//     name:"",
//     email:"",
//     phone_no:"",
//     subjects:[],
//     password:"",
// }


const UpdateTeacher = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const {state} = useLocation()
  const newVal = {...state}
  console.log(newVal)
  // const [teacher, setTeacher] = useState({...state});
  // const [teacher, setTeacher] = useState({...newVal});
  const [teacher, setTeacher] = useState(cloneDeep(newVal));
  useEffect(()=>{
    setTeacher(prev=>{return{
      ...prev,
      subjects:[...state.subjects]
    }})

    console.log(state.subjects)
    console.log(teacher.subjects)
    
  },[state])
  
  
  const HandleClick = ()=>{
    if(teacherFieldVerify(teacher)){
      try {
        ;(async()=>{
          await dispatch(updateTeacherAsync({ID:id,data:teacher}))
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
      {/* <TopOfPage pagePath={"Dashboard >> Teacher >> Update"} pageName={"Update Teacher"}/> */}
      <TeacherForm teacher={teacher} setTeacher={setTeacher}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton  itemId={teacher.id} />
      </div>
    </div>
  )
}

export default UpdateTeacher
