import {  useState } from "react";
import StudentForm from "../../../components/StudentForm";

import TopOfPage from "../../../components/TopOfPage";
import { studentFieldVerify } from "../../../action/InputFieldVerification";

import { useDispatch, useSelector } from 'react-redux';
import {createStudentasync} from '../../../redux-toolkit/slices/crudstudentslice'

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



const CreateStudent = () => {
  const [student, setStudent] = useState(data);
  const dispatch = useDispatch();
  
  const HandleClick = ()=>{
    const unsub=async()=>{
      try{

        await dispatch(createStudentasync({...student}));

      }catch(error){
          console.log(error);
      }
    }
   
    unsub();
    // if(studentFieldVerify(student)){
    //   // createItem({API:API_Item_Type.student,data:student})
    //   ;(async()=>{
    //     try{  
    //       await dispatch(createStudentasync({...student}));
  
    //     }catch(error){
    //         console.log(error);
    //     }
    //   })()
    // }
    
    // else{
    //   let msg = "Fill all required fields"
    //   // set an error message
    // }
  }


  return (
    <div>
      <TopOfPage pagePath={"Dashboard >> Student >> create"} pageName={"Create Student"}/>
      <StudentForm student={student} setStudent={setStudent}  HandleClick={HandleClick}/>
    </div>
  )
}

export default CreateStudent
