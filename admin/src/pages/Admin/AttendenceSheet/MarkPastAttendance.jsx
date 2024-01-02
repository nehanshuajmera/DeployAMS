import axios from "axios";
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
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";
import { set } from "mongoose";


export default function MarkPastAttendance() {
  const req_id = useParams();
  const navigate = useNavigate();
  const [subjectId, setSubjectId] = useState("");
  const [maxCount, setMaxCount] = useState(0);
  const [isClassScheduled, setIsClassScheduled] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalLectures, settotalLectures] = useState({});
  const [requestData, setRequestData] = useState({});


  useEffect(() => {
    // Fetch request details and set subject ID
    axios
      .get(`/api/updatepastattendance/viewmyrequestdetail/${req_id.id}`)
      .then((res) => {
        // console.log("Request data",res.data);
        if (res.data.request.status === "approved") {
          setSubjectId(res.data.request.subject);
          setRequestData(res.data.request);
          // console.log("Subject id 1",res.data.request.subject);
          fetchStudentAttendance(res.data.request.subject);
        } else {
          // Redirect to teacher dashboard if the request is not approved
          navigate("/teacherdashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [studentIDs, setstudentIDs] = useState([]);

 const [subjectDeatils, setSubjectDeatils] = useState({});

    // Fetch student attendance data based on subject ID
    const fetchStudentAttendance = async (subject_id) => {
      try {
        // console.log("Subject id",subject_id); 
        const response = await axios.get(`/api/teacher/studentsattendance/${subject_id}`);
        settotalLectures(response.data.subject.lecture_dates.reduce((result,ele)=>(result+=ele.count),0))
        // find the maximum count of the lecture
         // Check if lecture_dates and proposedDateTime are defined before accessing them
         setSubjectDeatils(response.data.subject);
         
        // console.log("Total lectures",response.data.subject.lecture_dates);
        // console.log("Student data",response.data);
        setStudentData(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const proposedDateTime = requestData?.proposedDateTime;
      const lectureDates = subjectDeatils.lecture_dates;
     if (lectureDates && proposedDateTime) {
       const subject_count =  lectureDates.find((ele) => ele.date === proposedDateTime)?.count;
       // console.log("Subject count",subject_count);
       setMaxCount(subject_count);
     }
    }, [requestData,subjectDeatils]);

    const changeCount = ({ type, stud_id, count, index }) => {
      // console.log( " change",type, stud_id,count);
  
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
  

  const submitHandler = async () => {
    try {
      const payload = {
          studentIDs: studentIDs,
      };
      await axios.post(`/api/updatepastattendance/updateattendancebypermission/${req_id.id}`, payload);
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    var array = [];
    var idx = 0;
    studentData.map((stud) => {
      // console.log({"studentid":stud._id,"enrollment_no":stud.enrollment_no,"name":stud.name, "count":0})
      // console.log(stud)
      // const woattendacne=stud.subjects.find(st=>st.subject_id=== sub_id.id);
      // console.log(woattendacne.attendance.length)
      let pastDate = new Date(requestData.proposedDateTime)
      // console.log(pastDate.getDate())
      // let tempLecture = stud.subjects.find(subj=>subj.subject_id === sub_id.id).lecture_dates.reduce((result,ele)=>(result+=ele.count),0)
      let tempAttendanceList = stud.subjects.find(subj=>subj.subject_id === subjectId).attendance.reduce((result,ele)=>(result+=ele.count),0)

      let tempCount = stud.subjects.find(subj=>subj.subject_id === subjectId).attendance.find(ele=>{
        let tempTime = new Date(ele.date)
        
        // console.log(tempTime.getDate(),pastDate.getDate(),tempTime.getMonth(),pastDate.getMonth(),tempTime.getFullYear(),pastDate.getFullYear())

        return (tempTime.getDate() === pastDate.getDate() && tempTime.getMonth() === pastDate.getMonth() && tempTime.getFullYear() === pastDate.getFullYear() )
      })
      // console.log({tempCount})
      tempCount = tempCount.count;

      console.log(tempCount,stud.name)
      // console.log(tempLecture)
      
      array.push({
        studentid: stud._id,
        enrollment_no: stud.enrollment_no,
        name: stud.name,
        count: tempCount?tempCount:0,
        index: idx,
        attendance:tempAttendanceList,
        totalLectures:totalLectures,
        date:pastDate
      });
      // console.log(array)
      idx++;
    });
    setstudentIDs(array);
  }, [studentData]);

  

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
      <h2>Attendance Sheet</h2>
      <p>Date : { new Date(requestData?.proposedDateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    
  })}</p>
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

      
      </div>

      {isClassScheduled && (
        <div className="button1" onClick={submitHandler}>
          Submit
        </div>
      )}
    </div>
  );
}
