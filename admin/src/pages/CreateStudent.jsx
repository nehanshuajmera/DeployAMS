import {  useState } from "react";
import StudentForm from "../components/StudentForm";

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
  // password: "",
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

const Subject = {
  subject_id: '',
  attendance: []
}
const CreateStudent = () => {
  // const {createItem,setMsg} = useAllData()
  const [student, setStudent] = useState(data);

  
  const HandleClick = ()=>{
    if(studentFieldVerify(student)){
      createItem({API:API_Type.student,data:student})
    }
    else{
      let msg = "Fill all required fields"
      setMsg({msg,msgType:msgType.WARNING})
    }
  }


  return (
    <div>
      <TopOfPage pagePath={"Dashboard >> Student >> create"} pageName={"Create Student"}/>
      <StudentForm student={student} setStudent={setStudent}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateStudent
