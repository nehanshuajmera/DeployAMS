import { useState } from "react";

// import TopOfPage from "../../../components/TopOfPage";
import TeacherForm from "../../../components/TeacherForm";
import { createTeacherAsync } from "../../../redux-toolkit/slices/crudteacherslice";
import { teacherFieldVerify } from "../../../action/InputFieldVerification";
import { useDispatch, useSelector } from "react-redux";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";
import { useNavigate } from "react-router-dom";

const data = {
  teacher_id: "",
  name: "",
  department: "",
  faculty: "",
  email: "",
  phone_no: "",
  subjects: [],
  password: "medicaps",
};

const CreateTeacher = () => {
  const [teacher, setTeacher] = useState(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMsgType, setMsg } = useMsgErr();

  const HandleClick = () => {
    if (teacherFieldVerify(teacher)) {
      try {
        (async () => {
          await dispatch(createTeacherAsync({ ...teacher }));
          if (teacherState.isErr) {
            setMsgType(TYPE.Err);
            setMsg(teacherState.errMsg);
          } else {
            setMsgType(TYPE.Success);
            setMsg("Teacher added successfully");
            navigate("/allteacher");
          }
          console.log(teacherState);
        })();
      } catch (error) {
        console.log(`failed to add teacher : ${error}`);
        setMsgType(TYPE.Err);
        setMsg("Failed to add teacher");
      }
    } else {
      let msg = "Fill all required fields";
      setMsgType(TYPE.Err);
      setMsg(msg);
    }
  };

  const teacherState = useSelector((state) => state.crudteacher);

  return (
    <div>
      {/* <TopOfPage pagePath={"Dashboard >> Teacher >> Create"} pageName={"Create Teacher"}/> */}
      <TeacherForm
        teacher={teacher}
        setTeacher={setTeacher}
        HandleClick={HandleClick}
      />
    </div>
  );
};

export default CreateTeacher;
