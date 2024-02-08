import { useState } from "react";
import SubjectForm from "../../../components/SubjectForm";

// import TopOfPage from "../../../components/TopOfPage";

import DeleteButton from "../../../components/DeleteButton";
import { subjectFieldVerify } from "../../../action/InputFieldVerification";
import { updateSubjectAsync } from "../../../redux-toolkit/slices/crudsubjectslice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";

// const data = {
//   subject_name:"",
//   course_code:"",
//   branch:"",
//   section:"",
//   batch:"",
//   teacher_id:"",
//   day:[],
// };

const UpdateSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMsgType, setMsg } = useMsgErr();
  const { id } = useParams();
  const { state } = useLocation();

  // const [subject, setSubject] = useState(data);
  const [subject, setSubject] = useState(state);

  const HandleClick = () => {
    // if(subjectFieldVerify(subject)){
    try {
      (async () => {
        await dispatch(updateSubjectAsync({ ID: id, data: subject }));
        if (subjState.isErr) {
          setMsgType(TYPE.Err);
          setMsg(subjState.errMsg);
          console.log(subjState.isErr);
        } else {
          setMsgType(TYPE.Success);
          setMsg("Subject Updated successfully");
          navigate("/allsubject");
        }
      })();
    } catch (error) {
      console.log(`failed to update subject : ${error}`);
      setMsgType(TYPE.Err);
      setMsg("Failed to Update subject");
    }
    // }
    // else{
    //   let msg = "Fill all required fields"
    //   setMsgType(TYPE.Err)
    //   setMsg(msg)
    //   // setMsg({msg,msgType:msgType.WARNING})
    // }
  };
  const subjState = useSelector((state) => state.crudsubject);
  console.log(subjState);

  return (
    <div>
      <p className="text-2xl font-bold text-center mt-2">Update Subject</p>
      {/* <TopOfPage pagePath={"Dashboard >> Subject >> Update"} pageName={"Update Subject"}/> */}
      <SubjectForm
        subject={subject}
        setSubject={setSubject}
        HandleClick={HandleClick}
      />
      <div className="flex justify-end px-3">
        <DeleteButton itemId={subject.id} />
      </div>
    </div>
  );
};

export default UpdateSubject;
