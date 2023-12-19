import {  useState } from "react";
import StudentForm from "../../../components/StudentForm";


import DeleteButton from "../../../components/DeleteButton";
import { useLocation } from "react-router-dom";
import TopOfPage from "../../../components/TopOfPage";
import { useDispatch } from "react-redux";
import { updateStudentasync } from "../../../redux-toolkit/slices/crudstudentslice";
import { studentFieldVerify } from "../../../action/InputFieldVerification";



const data = {
  name: "",
  enrollment_no: "",
  scholar_no: "",
  email: "",
  programme:'',
      faculty:'',
      specialisation:'',
      year:'',
  phone_no: "",
  branch: "",
  section: "",
  batch: "",
  password: "",
  subjects: [
    // {
    //   name: "OS",
    //   id: 1,
    // },
    // {
    //   name: "DBMS",
    //   id: 2,
    // },
  ],
};

const UpdateStudent = () => {
  const {state} = useLocation()
  const dispatch = useDispatch()
  // const [student, setStudent] = useState(data);
  const [student, setStudent] = useState({...state});
  
  const HandleClick = ()=>{
    const itemId =''
    if(studentFieldVerify(student)){
      try {
        ;(async()=>{
          await dispatch(updateStudentasync({Id:itemId,data:student}))
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
      <TopOfPage pagePath={"Dashboard >> Student >> Update"} pageName={"Update Student"}/>
      <StudentForm student={student} setSubject={setStudent}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton itemId={student.id} />
      </div>
    </div>
  )
}

export default UpdateStudent
