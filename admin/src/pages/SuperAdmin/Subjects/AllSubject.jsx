import React, { useContext } from 'react'
import { useTable, usePagination } from 'react-table'
import AdminContext from '../../../context/AdminContext';
// import './All.css'

export default function AllSubject() {
  const {allSubject} = useContext(AdminContext);
  console.log(allSubject);
  const data = React.useMemo(() => allSubject, [allSubject]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Subject Name",
        accessor: "subject_name",
      },
      {
        Header: "Course Code",
        accessor: "course_code",
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
    prepareRow
  } = useTable({ columns, data, initialState, enableEditing:true }, usePagination);

  const { pageIndex } = state;

  return (
    <div className='allStudentMain'>
      <h2>All Subject List</h2>
      <div className="allStudentTable">
        <table className='adminStudentTable' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='adminStudentTableRow' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='adminStudentTableHead' {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className='adminStudentTableRow' {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className='adminStudentTableData' {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
    </div>
  )
}