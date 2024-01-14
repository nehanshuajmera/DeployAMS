import { useState } from "react";
import StudentForm from "../../../components/StudentForm";
import { studentFieldVerify } from "../../../action/InputFieldVerification";
import { useDispatch, useSelector } from "react-redux";
import { createStudentasync } from "../../../redux-toolkit/slices/crudstudentslice";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";
import { useNavigate } from "react-router-dom";

const data = {
  name: "",
  enrollment_no: "",
  scholar_no: "",
  email: "",
  programme: "",
  faculty: "",
  specialisation: "",
  year: "",
  phone_no: "",
  branch: "",
  section: "",
  batch: "",
  password: "",
  class_name: "",
  department: "",
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

const CreateStudent = () => {
  const [student, setStudent] = useState(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMsgType, setMsg } = useMsgErr();

  const HandleClick = () => {
    
    if (studentFieldVerify(student)) {
      // createItem({API:API_Item_Type.student,data:student})
      (async () => {
        try {
          await dispatch(createStudentasync({ ...student }));
          if (studState.isErr) {
            setMsgType(TYPE.Err);
            setMsg(studState.errMsg);
          } else {
            setMsgType(TYPE.Success);
            setMsg("Student added successfully");
            navigate("/allstudent");
          }
          console.log(studState);
        } catch (error) {
          console.log(`failed to add student : ${error}`);
          setMsgType(TYPE.Err);
          setMsg("Failed to add student");
        }
      })();
    } else {
      let msg = "Fill all required fields";
      setMsgType(TYPE.Err);
      setMsg(msg);
    }
  };

  const studState = useSelector((state) => state.crudstudent);

  return (
    <div>
      {/* <TopOfPage pagePath={"Dashboard >> Student >> create"} pageName={"Create Student"}/> */}
      <StudentForm
        student={student}
        setStudent={setStudent}
        HandleClick={HandleClick}
      />
    </div>
  );
};

export default CreateStudent;
