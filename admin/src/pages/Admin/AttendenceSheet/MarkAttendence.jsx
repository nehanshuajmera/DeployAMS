import React, { useEffect, useState } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import { useDispatch, useSelector } from 'react-redux';
import GlobalFiltering from '../../../components/GlobalFiltering';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';
import './MarkAttendance.css'
import { useNavigate, useParams } from 'react-router-dom';
import { ParticularAttendanceasync } from '../../../redux-toolkit/slices/teacherAPIslice/seeparticularatendanceslice';

export default function MarkAttendance() {
  const sub_id = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataofstud, setdataofstud] = useState([]);
  useEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(ParticularAttendanceasync({ID:sub_id}));
      }
      catch (error) {
        console.log(error);
      }
    }
    unsub();
  }, [])
  // setdataofstudent(useSelector((state)=>state.fetchDetail));

  const dataofstudent = useSelector((state) => state.particularattendanceDetail.details)
  console.log(dataofstudent)

  useEffect(() => {
    console.log("data is comming", dataofstudent);
    setdataofstud([...dataofstudent])
  }, [dataofstudent])

  
  const data = React.useMemo(() => dataofstud.details, [dataofstud.details]);
  console.log(dataofstud)
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
        Header: 'Actions',
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          return (
            <div>
              <button className='actionBtn' onClick={() => console.log(index)}>
                <img src="https://cdn-icons-png.flaticon.com/512/4553/4553011.png" alt="" />
              </button>
            </div>
          )
        }
      }
    ],
    []
  );

  const initialState = {
    pageSize: 20
  }

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
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState,
      enableEditing: true
    }, useGlobalFilter, useSortBy, usePagination);

  const { pageIndex, globalFilter } = state;

  return (
    <div className='markAttendanceMain'>
      <h2>Attendence Sheet</h2>
      <div className='sheet'>
        <div className='attendenceFormat'>
          <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="studentAttendanceTable">
            <table className='studentTable' {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className='studentTableRow' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th className='studentTableHead' {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? ' ⬇' : ' ⬆') : ' ↕'}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  console.log(row)
                  return (
                    <tr className='studentTableRow' {...row.getRowProps()} onClick={() => gotoUpdate(row)}>
                      {row.cells.map((cell) => (
                        <td className='studentTableData' {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {page.length ?
            <div className="tablePageButtons_MarkAttendance">
              <button className='nAndpButtons_MarkAttendance' onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
              <span className="pageNoDetails_MarkAttendance">
                {' '}Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <button className='nAndpButtons_MarkAttendance' onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
            </div>
            : <h2 className="noData">No Data</h2>}
        </div>

        <div className='moreFeatures'>
          <div className="askForPermission">
            <h2>Ask For Permission</h2>
            <div className="askForPermissionText">
              <textarea className='bg-dimwhite' name="permission" id="permission" cols="40" rows="5" placeholder='Type here to ask for Updating Attendance....'></textarea>
            </div>
            <div className="askForPermissionBtn">
              <button>Ask</button>
            </div>
          </div>
          <div className="previousAttendance">
            <button onClick={() => navigate("/previousattendance")}>See Previous Attendance</button>
          </div>
        </div>
      </div>
    </div>
  )
}