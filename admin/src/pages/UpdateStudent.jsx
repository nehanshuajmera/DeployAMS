import {  useState } from "react";
import StudentForm from "../components/StudentForm";


import DeleteButton from "../components/DeleteButton";



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
  const {updateItem,setMsg} = useAllData()
  const [student, setStudent] = useState(data);
  
  const HandleClick = ()=>{
    const itemId =''
    if(studentFieldVerify(student)){
      updateItem({API:API_Type.student,itemId,data:student})
    }
    else{
      let msg = "Fill all required fields"
      setMsg({msg,msgType:msgType.WARNING})
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
