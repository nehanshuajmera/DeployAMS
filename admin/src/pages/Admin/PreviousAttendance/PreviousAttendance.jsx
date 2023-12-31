import React,{useState,useEffect,useLayoutEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './PreviousAttendance.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParticularAttendanceasync } from "../../../redux-toolkit/slices/teacherAPIslice/seeparticularatendanceslice";


export default function PreviousAttendance() {
  
  const sub_id = useParams();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  const dispatch = useDispatch();
  const [studentIDs, setstudentIDs] = useState([]);

   // get all the student of this particular subject
   useLayoutEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(ParticularAttendanceasync({ ID: sub_id.id }));
        // console.log(dataofstudent)
        // await dispatch(checkclassasync({ID:sub_id.id}));
      } catch (error) {
        console.log(error);
      }
    };
    unsub();
  }, []);
  // setdataofstudent(useSelector((state)=>state.fetchDetail));

  const dataofstudent = useSelector(
    (state) => state.particularattendanceDetail.details
  );

 

  return (
    <div className='previousAttendanceContainer'>
        Previous Attendance
        {  console.log(dataofstudent)}
    </div>
  )
}
