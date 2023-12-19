import React, { useContext, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';
import GlobalFiltering from '../../../components/GlobalFiltering';
import './AllSubject.css'
import { useEffect } from 'react';

export default function AllSubject() {
  const dispatch=useDispatch();
  
  // const logdata=useSelector((state)=>state.login)
  // useEffect(() => {
  //   const unsub=()=>{
  //      dispatch(fetchdetailasync({apiname:"allsubjects"}));
  //   }
   
  //    return () => {
  //      unsub()
  //    }
  //  }, [logdata])
  
  // const dataofsubjec=useSelector((state)=>state.fetchDetail.details);
  // console.log(dataofsubjec);
  const [dataofstud, setdataofstud] = useState({ details: [] });
  useEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(fetchdetailasync({ apiname: "allsubjects" }));
      }
      catch (error) {
        console.log(error);
      }
    }
    unsub();
  }, [])
  // setdataofstudent(useSelector((state)=>state.fetchDetail));

  const dataofstudent = useSelector((state) => state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofstudent);
    setdataofstud(dataofstudent)
  }, [dataofstudent])

  const data = React.useMemo(() => dataofstud.details, [dataofstud.details]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Subject Name",
        accessor: "subject_name",
      },
      {
        Header: "Course Code",
        accessor: "course_code",
      },
      {
        Header: 'Actions',
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          return (
            <div>
              <button className='actionBtn' onClick={() => console.log(index)}>
                <img src="https://cdn-icons-png.flaticon.com/512/11608/11608686.png" alt="" />
              </button>
              <button className='actionBtn' onClick={() => console.log(index)}>
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

  return (
    <div className='allSubjectMain'>
      <h2>All Subjects List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allSubjectTable">
        <table className='adminSubjectTable' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='adminSubjectTableRow' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='adminSubjectTableHead' {...column.getHeaderProps(column.getSortByToggleProps())}>
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
              return (
                <tr className='adminSubjectTableRow' {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className='adminSubjectTableData' {...cell.getCellProps()}>
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