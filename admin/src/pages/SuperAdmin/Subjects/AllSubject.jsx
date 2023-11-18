import React from 'react'
import fakeData from "./MockData.json";
import { useTable, usePagination } from 'react-table'
// import './All.css'

export default function AllSubject() {
  const data = React.useMemo(() => fakeData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Enrollment No.",
        accessor: "enrollmentNo",
      },
      {
        Header: "Scholar No.",
        accessor: "scholarNo",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Section",
        accessor: "section",
      },
      {
        Header: "Specialization",
        accessor: "specialization",
      },
      {
        Header: "Faculty",
        accessor: "faculty",
      },
      {
        Header: "Programme",
        accessor: "programme",
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
      <h2>All Students List</h2>
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