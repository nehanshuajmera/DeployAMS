import { useEffect, useState } from "react";
import StudentForm from "../../../components/StudentForm";
import DeleteButton from "../../../components/DeleteButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentasync } from "../../../redux-toolkit/slices/crudstudentslice";
import { studentFieldVerify } from "../../../action/InputFieldVerification";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";

// const data = {
//   name: "",
//   enrollment_no: "",
//   scholar_no: "",
//   email: "",
//   programme:'',
//       faculty:'',
//       specialisation:'',
//       year:'',
//   phone_no: "",
//   branch: "",
//   section: "",
//   batch: "",
//   password: "",
//   subjects: [
//     // {
//     //   name: "OS",
//     //   id: 1,
//     // },
//     // {
//     //   name: "DBMS",
//     //   id: 2,
//     // },
//   ],
// };

const UpdateStudent = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMsgType, setMsg } = useMsgErr();
  // const [student, setStudent] = useState({...data});
  const [student, setStudent] = useState({ ...state });
  useEffect(() => {
    setStudent((prev) => {
      return {
        ...prev,
        subjects: [...state.subjects],
      };
    });

    console.log(state.subjects);
    console.log(student.subjects);
  }, [state]);

  // const dataofstudent = useSelector((state) => state.fetchDetail);
  // console.log(dataofstudent)
  const HandleClick = () => {
    if (studentFieldVerify(student)) {
      (async () => {
        try {
          await dispatch(updateStudentasync({ ID: id, data: student }));
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
      <p className="text-3xl font-bold text-center my-6">Update Student</p>
      <StudentForm
        student={student}
        setStudent={setStudent}
        HandleClick={HandleClick}
      />
      <div className="flex justify-end px-3">
        <DeleteButton itemId={student.id} />
      </div>
    </div>
  );
};

export default UpdateStudent;
