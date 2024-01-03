import React, { useContext,useState } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import './AllTeacher.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';
import GlobalFiltering from '../../../components/GlobalFiltering';
import { useEffect } from 'react';
import { deleteTeacherAsync } from '../../../redux-toolkit/slices/crudteacherslice';
import { useNavigate } from 'react-router-dom';

export default function AllTeacher() {
  const [dataofteach, setdataofteach] = useState({ details: [] });
  const dispatch=useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsub=()=>{
      try {
       dispatch(fetchdetailasync({apiname:"allteachers"}));
      }
      catch (error) {
        console.log(error);
      }
    }
   
    unsub()
   }, [])
  
  const dataofteacher=useSelector((state)=>state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofteacher);
    setdataofteach(dataofteacher)
  }, [dataofteacher])
  console.log(dataofteacher);
  const data = React.useMemo(() =>dataofteach.details, [dataofteach.details]);
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
        Header: "Faculty",
        accessor: "faculty",
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: 'Actions',
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          const {_id:itemId} = index.original
          return (
            <div>
              <button className='actionBtn' onClick={() => navigate(`/updateteacher/`+itemId,{state:{...index.original}})}>
                <img src="https://cdn-icons-png.flaticon.com/512/11608/11608686.png" alt="" />
              </button>
              <button className='actionBtn' onClick={() => handleDelete(itemId)}>
                <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" />
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
      await dispatch(deleteTeacherAsync(itemId))
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
                    {column.Header!=="Actions" && column.Header!=="Email" && column.Header!=="Phone No." ? <span>
                      {column.isSorted ? (column.isSortedDesc ? ' ⬇' : ' ⬆') : ' ↕'}
                    </span>:null }
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