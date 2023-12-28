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
import { useNavigate, useParams } from "react-router-dom";
import { ParticularAttendanceasync } from "../../../redux-toolkit/slices/teacherAPIslice/seeparticularatendanceslice";
import { checkclassasync } from "../../../redux-toolkit/slices/teacherAPIslice/checkclassSlice";
import { updateAttendanceAsync } from "../../../redux-toolkit/slices/teacherAPIslice/insertUpdateattendanceSlice";

export default function MarkAttendance() {
  const sub_id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  const [attendanceList, setAttendanceList] = useState([]);
  const [maxCount, setMaxCount] = useState(0); //default maxCount = 0

  // get all the student of this particular subject
  useLayoutEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(ParticularAttendanceasync({ ID: sub_id.id }));
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
  // console.log(dataofstudent)

  // check if today is class
  useLayoutEffect(() => {
    (async () => {
      try {
        await dispatch(checkclassasync({ ID: sub_id.id }));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const isClassDetails = useSelector((state) => state.checkClass.message);
  console.log(isClassDetails);

  useEffect(() => {
    // console.log(isClassDetails)
    if (isClassDetails)
      // checking if isClassDetails !== undefine
      isClassDetails.message == "No Class Today"
        ? setMaxCount(0)
        : setMaxCount(isClassDetails.count);
  }, [isClassDetails]);

  // set the data in variables after fetching and creating attendance list
  useEffect(() => {
    // console.log("data is comming", dataofstudent);
    let studTempList = dataofstudent.map((stud) => {
      return {
        ...stud,
        count: 0,
      };
    });
    // setdataofstud({details:dataofstudent})
    setdataofstud({ details: studTempList });

    // creating attendance list
    // let temp = dataofstudent?.map(student=>{
    //   return{
    //     studentid:student._id,
    //     count : maxCount,
    //   }
    // })
    // setAttendanceList(temp)
    console.log(isClassDetails);
  }, [dataofstudent, maxCount]);

  const changeCount = ({type,stud_id,count}) => {
    count = type=='increment'? (count===maxCount?maxCount:count + 1):(count===0?0:count - 1)
    markCount({stud_id,count})
  };

  const markCount = ({ stud_id, count }) => {
    console.log("markcoutn");
    // console.log(object)
    let templist = dataofstud.details.map((ele) => {
      if (ele._id === stud_id) {
        return {
          ...ele,
          count: count,
        };
      }
      return {
        ...ele,
      };
    });
    
    setdataofstud({details:templist});
    
    
  };
  
  useEffect(() => {
    // creating attendance list
    let temp = dataofstud.details.map(student=>{
      return{
        studentid:student._id,
        count : student.count,
      }
    })
    setAttendanceList(temp)
  }, [dataofstud.details])
  

  // submit handler
  const submitHandler = async () => {
   
    try {
      let payload = {
        subjectId: sub_id.id,
        studentIDs: attendanceList,
      };
      console.log(payload);
      await dispatch(updateAttendanceAsync(payload));
    } catch (error) {
      console.log(error);
    }
  };

  const data = React.useMemo(() => dataofstud.details, [dataofstud.details]);
  // console.log(dataofstud)
  const columns = React.useMemo(
    () => [
      {
        Header: "Enrollment No.",
        accessor: "enrollment_no",
      },
      // {
      //   Header: "Scholar No.",
      //   accessor: "scholar_no",
      // },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Today's Addendence",
        accessor: "attendence",
      },
      {
        Header: "Actions",
        Cell: (tableInstance) => {
          const { row: rowData } = tableInstance;
          

          return (
            <div key={rowData.original._id}>
              <>
                <div>
                  <div
                    className="button1 cursor-pointer"
                    onClick={() => {
                      changeCount({stud_id:rowData.original._id,type:"decrement",count:rowData.original.count})
                    }}
                  >
                    -
                  </div>
                  <p>{rowData.original.count}</p>
                  <div
                    className="button1 cursor-pointer"
                    onClick={() =>
                      changeCount({stud_id:rowData.original._id,type:"increment",count:rowData.original.count})
                    }
                  >
                    +
                  </div>
                </div>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/4553/4553011.png" alt="" /> */}
              </>
            </div>
          );
        },
      },
    ],
    []
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
      <h2>Attendence Sheet</h2>
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
          <div className="askForPermission">
            <h2>Ask For Permission</h2>
            <div className="askForPermissionText">
              <textarea
                className="bg-dimwhite"
                name="permission"
                id="permission"
                cols="40"
                rows="5"
                placeholder="Type here to ask for Updating Attendance...."
              ></textarea>
            </div>
            <div className="askForPermissionBtn">
              <button>Ask</button>
            </div>
          </div>
          <div className="previousAttendance">
            <button onClick={() => navigate("/previousattendance")}>
              See Previous Attendance
            </button>
          </div>
        </div>
      </div>
      <div className="button1" onClick={submitHandler}>
        Submit
      </div>
    </div>
  );
}
