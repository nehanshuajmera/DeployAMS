import React, { useEffect, useState } from "react";
import axios from "axios";
import { TYPE, useMsgErr } from "../context/MsgAndErrContext";
import { useDispatch, useSelector } from "react-redux";
import { userdetailasync } from "../redux-toolkit/slices/userdetailslice";

const AskPermission = ({ sub_id }) => {
const dispatch = useDispatch();
const [lectureList,setlectureList] = useState([])

const userDetail = useSelector(state=>state.userdetail);
useEffect(()=>{
  const unsub=async()=>{
    console.log("redl");
    try{
      
      dispatch(userdetailasync());
      
      if(userDetail.isErr){
        setMsgType(TYPE.Err)
        setMsg(userDetail.errMsg)
      }
      
      // const studentState = useSelector(state=>state.crudstudent)
      
    }catch(error){
      console.log(error);
    }
  }
  
  unsub();
},[])
const check=()=>{
  return userDetail.value

}
// console.log(userDetail);
// calculate total number of lecture on change of userDetail
// useEffect(()=>{
//   const temp = userDetail.details.subjects.find(subj=>subj.subject_id._id===sub_id).subject_id.lecture_dates
//   setlectureList(temp)
  
//   },[check])
  
  //calculate total number of lecture on change of userDetail
  const calulateTotal=()=>{
    const temp = userDetail.details.subjects.find(subj=>subj.subject_id._id===sub_id).subject_id.lecture_dates
    setlectureList(temp)
  }
  // let lectureList = userDetail?.details?.subjects.find(subj=>subj.subject_id._id===sub_id).subject_id.lecture_dates
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
      if(response.status==200){
        setMsgType(TYPE.SUCCESS);
        setMsg("Ask for permission successfully for selected date.");
      }
      // setMsgType(TYPE.SUCCESS);
      // setMsg("Ask for permission successfully for selected date.");
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
      <div className="askForPermission blockPermission">
        <h2>Ask For Permission</h2>
        <div className="askForPermissionText">
          
          <select name="date" id="permission" value={data.date} onClick={calulateTotal} onChange={(e) => changeHandler(e)}>
            
            <option value="">Date</option>
            {
              lectureList?.map(lecture=>{
                return(
                  <option key={lecture.date} value={lecture.date}>{convertDate(lecture.date)}</option>
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
