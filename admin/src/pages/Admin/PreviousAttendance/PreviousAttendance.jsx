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
        console.log(dataofstudent)
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

  const convertDate = (inputDate)=>{
    const dateObj = new Date(inputDate);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate
   }


  return (
    <div >
       <div className="previousAttendanceContainer">Preivous attendance</div>
       
      <div >
        {dataofstudent.map(student => {

          // const formattedAttendance = subject.attendance.map((dates)=> convertDate(dates.date));
          //map for getting into subject
          return (<table >
            <thead >
              <tr>
                <th >{student.name} </th>
                {/* <th > attendance percentage  </th> */}

                {
                  student.subjects.map(name => {
                    //map for lecture dates

                  
                      return (
                        <>
                      {  name.attendance.map(count => {
                     
                        return(
                          <>
                         
                          <th>{convertDate(count.date) }</th>
                          {/* <th>{count.count}</th> */}
                           </>
                        )
                      })
                      }
                        </>
   
                        // <th className='headingForStudents'>{convertDate(lecture_dates.date)} ({lecture_dates.count})</th>
                      )
                  
                  })
                }


              </tr>
            </thead>
            <tbody >

              {/* <td >{student.name}</td> */}
                <th >{student.enrollment_no}</th>
                {/* <th >student</th> */}
            
                {
                  student.subjects.map(name => {
                    //map for lecture dates

                  
                      return (
                        <>
                      {  name.attendance.map(count => {
                     
                        return(
                          <>
                         
                          {/* <th>{count.date }</th> */}
                          <th>{count.count}</th>
                           </>
                        )
                      })
                      }
                        </>
   
                        // <th className='headingForStudents'>{convertDate(lecture_dates.date)} ({lecture_dates.count})</th>
                      )
                  
                  })
                }
                      
                 



            </tbody>
            <br/>
          </table>)
        })
        }
      </div>
    </div>
  )
}
