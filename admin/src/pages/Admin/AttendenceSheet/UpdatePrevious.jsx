import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import GlobalFiltering from "../../../components/GlobalFiltering";
import { fetchdetailasync } from "../../../redux-toolkit/slices/fetchdetailslice";
import "./MarkAttendance.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParticularAttendanceasync } from "../../../redux-toolkit/slices/teacherAPIslice/seeparticularatendanceslice";
import { checkclassasync } from "../../../redux-toolkit/slices/teacherAPIslice/checkclassSlice";
import { updateAttendanceAsync } from "../../../redux-toolkit/slices/teacherAPIslice/insertUpdateattendanceSlice";
import AskPermission from "../../../components/AskPermission";
import { updateAttendanceByPermissionAsync } from "../../../redux-toolkit/slices/teacherAPIslice/updateattendancebypermissionslice";
import { userdetailasync } from "../../../redux-toolkit/slices/userdetailslice";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";

export default function UpdatePrevious() {
  const {setMsgType,setMsg} = useMsgErr()
  const sub_id = useParams();
  const { totalLectures } = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  const [attendanceList, setAttendanceList] = useState([]);
  const [maxCount, setMaxCount] = useState(0); //default maxCount = 0
  const [studentIDs, setstudentIDs] = useState([]);
  const [dateToUpdate, setDateToUpdate] = useState(null);
  const [lectures, setLectures] = useState(null);
  useEffect(()=>{
    ;(async()=>{
      try{

        await dispatch(userdetailasync());
        // const studentState = useSelector(state=>state.crudstudent)
        
      }catch(error){
        console.log(error);
      }
    })();    
  },[])
  
  const userSubjectData = useSelector(
    (state) => state.userdetail.details
  ).subjects
  
console.log(userSubjectData)

  useEffect(()=>{
    let tempLecturesList = userSubjectData?.find((subj) => subj.subject_id._id === sub_id.id)?.subject_id.lecture_dates
    setLectures(tempLecturesList)
    console.log("templectures",tempLecturesList)
  },[userSubjectData])

  useEffect(()=>{
    let tempMaxCount = lectures?.find((ele) => {
        let tempTime = new Date(ele.date);
        return (
          convertDate(tempTime) === convertDate(dateToUpdate)
        );
      })?.count
      console.log("tempMax",tempMaxCount)
    setMaxCount(tempMaxCount)
  },[userSubjectData,dateToUpdate])

//   to convert date 
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  

  // get all the student of this particular subject
  useLayoutEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(ParticularAttendanceasync({ ID: sub_id.id }));
        if(dataofstudent.isErr){
          setMsgType(TYPE.Err)
          setMsg(dataofstudent.Err)
        }
      } catch (error) {
        console.log(error);
      }
    };
    unsub();
  }, []);
  // setdataofstudent(useSelector((state)=>state.fetchDetail));

  const dataofstudent = useSelector(
    (state) => state.particularattendanceDetail
  );
  // console.log(dataofstudent.details);

  const changeCount = ({ type, stud_id, count, index }) => {
    console.log( " change",type, stud_id,count);

    if (type === "increment") {
      console.log("increment");
      if (count === maxCount) {
        console.log(maxCount);
        count = maxCount;
      } else {
        count = count + 1;
      }
    } else {
      if (count === 0) {
        count = 0;
      } else {
        count = count - 1;
      }
    }

    // console.log({stud_id,count,index})
    setstudentIDs((prevStudentIDs) => {
      const updatedStudentIDs = [...prevStudentIDs];
      updatedStudentIDs[index].count = count;
      return updatedStudentIDs;
    });
    // console.log(studentIDs)
  };

  const gotoUpdate = () => {};

  // const markCount = ({ stud_id, count,index }) => {

  //   // var array=studentIDs;

  //   // setstudentIDs(array)
  //   // if(!assign){
  //   //   studentIDs.push({"studentid":stud_id,"count":count});
  //   // }

  // };

  useEffect(() => {
    var array = [];
    var idx = 0;
    
    dataofstudent.details.message.map((stud) => {
      // console.log({"studentid":stud._id,"enrollment_no":stud.enrollment_no,"name":stud.name, "count":0})
      // console.log(stud)
      // const woattendacne=stud.subjects.find(st=>st.subject_id=== sub_id.id);
      // console.log(woattendacne.attendance.length)
      // let tempLecture = stud.subjects.find(subj=>subj.subject_id === sub_id.id).lecture_dates.reduce((result,ele)=>(result+=ele.count),0)
      let tempAttendanceList = stud.subjects
        .find((subj) => subj.subject_id === sub_id.id)
        .attendance.reduce((result, ele) => (result += ele.count), 0);
      let tempCount = stud.subjects
        .find((subj) => subj.subject_id === sub_id.id)
        .attendance.find((ele) => {
          let tempTime = new Date(ele.date);
          return (
            convertDate(tempTime) === convertDate(dateToUpdate)
          );
        })?.count;
      // console.log(tempLecture)
      array.push({
        studentid: stud._id,
        enrollment_no: stud.enrollment_no,
        name: stud.name,
        count: tempCount ? tempCount : 0,
        index: idx,
        attendance: tempAttendanceList,
        totalLectures: totalLectures,
      });
      // console.log(array)
      idx++;
    });
    setstudentIDs(array);
  }, [dataofstud?.details, dataofstudent.details,dateToUpdate]);

  // submit handler
  const submitHandler = async () => {
    // if(!(isClassDetails?.message==="No Class Today" )&&)
    try {
      let payload = {
        ID: sub_id.id,
        data: {
        //   subjectId: sub_id.id,
          studentIDs: studentIDs,
        },
      };
      console.log(payload);
      await dispatch(updateAttendanceByPermissionAsync(payload));
      if(updateAttendance_Store.isErr){
        setMsgType(TYPE.Err)
        setMsg(updateAttendance_Store.errMsg)
      } 
    } catch (error) {
      console.log(error);
    }
  };
  const updateAttendance_Store  = useSelector(state=>state.updateAttendancebypermission)   
  
  
  
  

  const data = React.useMemo(() => studentIDs, [studentIDs]);
  // console.log(dataofstud)
  const columns = React.useMemo(
    () => [
      {
        Header: "Enrollment No.",
        accessor: "enrollment_no",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Total Lectures",
        accessor: "totalLectures",
      },
      {
        Header: "Total attendance",
        accessor: "attendance",
      },
      {
        Header: "Actions",
        Cell: (tableInstance) => {
          const { row: rowData } = tableInstance;

          // const , ] = useState();
          return (
            <div key={rowData.original._id}>
              <>
                <div>
                  {maxCount && maxCount > 0 ? (
                    // !(isClassDetails?.message === "No Class Today") &&
                    <>
                      <div
                        className="button1 cursor-pointer"
                        onClick={() => {
                          changeCount({
                            stud_id: rowData.original.studentid,
                            type: "decrement",
                            count: rowData.original.count,
                            index: rowData.original.index,
                          });
                        }}
                      >
                        -
                      </div>
                      <p>{rowData.original.count}</p>
                      <div
                        className="button1 cursor-pointer"
                        onClick={() =>
                          changeCount({
                            stud_id: rowData.original.studentid,
                            type: "increment",
                            count: rowData.original.count,
                            index: rowData.original.index,
                          })
                        }
                      >
                        +
                      </div>
                    </>
                  ) : (
                    <div>-</div>
                  )}
                </div>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/4553/4553011.png" alt="" /> */}
              </>
            </div>
          );
        },
      },
    ],
    [maxCount]
  );

  const initialState = {
    pageSize: 20,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
      enableEditing: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  return (
    <div className="markAttendanceMain w-screen h-screen">
      <h2>Update Past Attendance</h2>
      {/* {isClassDetails?.message === "No Class Today" && (
        <div className="w-full p-2 bg-primary text-dimWhite text-center font-semibold">
          <p>Class is not scheduled for Today, cannot mark the attendance </p>
        </div>
      )} */}
      <div>
        <h3>Date</h3>
        <input type="date" name="dateToUpdate" id="dateToUpdate" value={dateToUpdate} onChange={(e)=>setDateToUpdate(e.target.value)}/>
        <select name="dateToUpdate" id="dateToUpdate" value={dateToUpdate} onChange={(e)=>setDateToUpdate(e.target.value)}>
            <option value={''}>Date</option>
            {
                lectures &&
                lectures.map(lecture=>{
                    let dateValue = convertDate(lecture.date)
                    return(
                        <option key={dateValue} value={dateValue}>{dateValue}</option>
                    )
                })
            }
        </select>
      </div>
      <div className="sheet">
        <div className="attendenceFormat">
          <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="studentAttendanceTable">
            <table className="studentTable" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    className="studentTableRow"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        className="studentTableHead"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ⬇"
                              : " ⬆"
                            : " ↕"}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  // console.log(row)
                  return (
                    <tr
                      className="studentTableRow"
                      {...row.getRowProps()}
                      onClick={() => gotoUpdate(row)}
                    >
                      {row.cells.map((cell) => (
                        <td
                          className="studentTableData"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {page.length ? (
            <div className="tablePageButtons_MarkAttendance">
              <button
                className="nAndpButtons_MarkAttendance"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {" "}
                Previous{" "}
              </button>
              <span className="pageNoDetails_MarkAttendance">
                {" "}
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <button
                className="nAndpButtons_MarkAttendance"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {" "}
                Next{" "}
              </button>
            </div>
          ) : (
            <h2 className="noData">No Data</h2>
          )}
        </div>

        <div className="moreFeatures">
          <div className="previousAttendance">
            <button onClick={() => navigate("/previousattendance")}>
              See Previous Attendance
            </button>
          </div>
        </div>
      </div>
      {
        // maxCount &&
        maxCount > 0 &&
        <div className="button1" onClick={submitHandler}>
          Submit
        </div>
        // )
      }
    </div>
  );
}
