import { useReducer, useState } from "react";
import reducer from '../reducer/CreateStudentReducer'
import StudentForm from "../components/StudentForm";
import { studentFieldVerify } from "../action/InputFieldVerification";
import { useAllData } from "../context/AllDataContext";
import { API_Type } from "../types/Types";
import DeleteButton from "../components/DeleteButton";

const initState = {
  
  isError: false,
  isLoading: false,
}

const data = {
  name: "",
  enrollment_no: "",
  scholar_no: "",
  email: "",
  phone_no: "",
  branch: "",
  section: "",
  batch: "",
  password: "",
  subjects: [
    {
      name: "OS",
      id: 1,
    },
    {
      name: "DBMS",
      id: 2,
    },
  ],
};

const Subject = {
  subject_id:'',
  attendance:[]
}
const UpdateStudent = () => {
  const {updateItem} = useAllData()
  const [student, setStudent] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);
  
  const HandleClick = ()=>{
    const itemId =''
    if(studentFieldVerify(student)){
      updateItem({API:API_Type.student,itemId,data:student})
    }
  }
  return (
    <div>
      <StudentForm student={student} setSubject={setStudent}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton API={API_Type.student} itemId={''} />
      </div>
    </div>
  )
}

export default UpdateStudent
