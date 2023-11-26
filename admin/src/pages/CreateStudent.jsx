import { useReducer, useState } from "react";
import reducer from '../reducer/CreateStudentReducer'
import StudentForm from "../components/StudentForm";
import { studentFieldVerify } from "../action/InputFieldVerification";
import { useAllData } from "../context/AllDataContext";
import { API_Type } from "../types/Types";

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
  subject_id: '',
  attendance: []
}
const CreateStudent = () => {
  const { createItem } = useAllData()
  const [student, setStudent] = useState(data);

  const [state, dispatch] = useReducer(reducer, initState);

  const HandleClick = () => {
    if (studentFieldVerify(student)) {
      createItem({ API: API_Type.student, data: student })
    }
  }
  return (
    <div>
      <StudentForm student={student} setStudent={setStudent} HandleClick={HandleClick} />
    </div>
  )
}

export default CreateStudent
