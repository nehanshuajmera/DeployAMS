import React, { useState } from "react";
import axios from "axios";
import { TYPE, useMsgErr } from "../context/MsgAndErrContext";
import { useSelector } from "react-redux";

const AskPermission = ({ sub_id }) => {
  const userDetail = useSelector(state=>state.userdetail)
  // console.log(userDetail)
  
  let lectureList = userDetail?.details?.subjects.find(subj=>subj.subject_id._id===sub_id).subject_id.lecture_dates
  // let lectureList1 = userDetail?.details.subjects.find(subj=>console.log(subj))
  console.log(lectureList)
  const { setMsgType, setMsg } = useMsgErr();
  const [data, setdata] = useState({
    date: "",
  });
  // const 
  const changeHandler = (e) => {
    setdata({ date: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(`/api/updatepastattendance/asktoupdate/${sub_id}`, {
        date: data.date,
      });
      
      setMsgType(TYPE.SUCCESS);
      setMsg(response.data.message);
    } catch (error) {
      console.error("Error asking for permission:", error);
      setMsgType(TYPE.ERROR);
      setMsg("Error asking for permission. Please try again.");
    }
  };

  const convertDate = (date)=>{
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      
    })
  }

  return (
    <>
      <div className="askForPermission">
        <h2>Ask For Permission</h2>
        <div className="askForPermissionText">
          <input
            type="date"
            className="bg-dimWhite"
            name="date"
            id="permission"
            value={data.date}
            onChange={(e) => changeHandler(e)}
          />
          <select name="date" id="permission" value={data.date} onChange={(e) => changeHandler(e)}
>
            <option value="">Date</option>
            {
              lectureList?.map(lecture=>{
                return(
                  <option value={convertDate(lecture.date)}>{convertDate(lecture.date)}</option>
                )
              })
            }
          </select>
        </div>
        <div className="askForPermissionBtn">
          <button onClick={submitHandler}>Ask</button>
        </div>
      </div>
    </>
  );
};

export default AskPermission;
