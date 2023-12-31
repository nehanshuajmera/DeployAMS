import React, { useContext } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';
import GlobalFiltering from '../../../components/GlobalFiltering';
import { useEffect } from 'react';
// import { deleteTeacherAsync } from '../../../redux-toolkit/slices/crudteacherslice';
import { useNavigate } from 'react-router-dom';

export default function SubstituteTeacher() {

  const dispatch=useDispatch();
  const navigate = useNavigate();
  
  const logdata=useSelector((state)=>state.login)
  useEffect(() => {
    const unsub=()=>{
       dispatch(fetchdetailasync({apiname:"allteachers"}));
    }
   
     return () => {
       unsub()
     }
   }, [logdata])
  
  const dataofteacher=useSelector((state)=>state.fetchDetail.details);
  console.log(dataofteacher);
  const data = React.useMemo(() =>dataofteacher, [dataofteacher]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Teacher Id",
        accessor: "teacher_id",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
      },
      {
        Header: 'Actions',
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          return (
            <div>
              <button className='actionBtn' onClick={() => console.log(index)}>
                <img src="/substituteAlarm.png" alt="" />
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

  const handleDelete = async(itemId)=>{
    try {
      // await dispatch(deleteTeacherAsync(itemId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='allTeacherMain'>
       <h2>All Teacher List</h2>
     <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allTeacherTable">
        <table className='adminTeacherTable' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='adminTeacherTableRow' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='adminTeacherTableHead' {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' ↕️'}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className='adminTeacherTableRow' {...row.getRowProps()} onClick={()=>gotoUpdate(row)}>
                  {row.cells.map((cell) => (
                    <td className='adminTeacherTableData' {...cell.getCellProps()}>
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
        <div className="tablePageButtons">
          <button className='nAndpButtons' onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
          <span className="pageNoDetails">
            {' '}Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button className='nAndpButtons' onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
        </div>
        : <h2 className="noData">No Data</h2>}
    </div>
  )
}