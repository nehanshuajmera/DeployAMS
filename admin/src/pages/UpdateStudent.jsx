import {  useState } from "react";
import StudentForm from "../components/StudentForm";


import DeleteButton from "../components/DeleteButton";
import { useLocation } from "react-router-dom";
import TopOfPage from "../components/TopOfPage";



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

const UpdateStudent = () => {
  const {state} = useLocation()
  console.log(state)
  const {updateItem,setMsg} = useAllData()
  // const [student, setStudent] = useState(data);
  const [student, setStudent] = useState({...state});
  
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
      <TopOfPage pagePath={"Dashboard >> Student >> Update"} pageName={"Update Student"}/>
      <StudentForm student={student} setSubject={setStudent}  HandleClick={HandleClick}/>
      <div className="flex justify-end px-3">
        <DeleteButton API={API_Type.student} itemId={student.id} />
      </div>
    </div>
  )
}

export default UpdateStudent
