import React, { useContext, useEffect, useState } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import './AllStudent.css'
import AdminContext from '../../../context/AdminContext';
// import TopOfPage from '../../../components/TopOfPage';
// import SearchBar from '../../../components/SearchBar';

export default function AllStudent() {
  const { allStudent } = useContext(AdminContext);
  const data = React.useMemo(() => allStudent, [allStudent]);
  // const [sortData, setSortData] = useState([...allStudent]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Enrollment No.",
        accessor: "enrollment_no",
      },
      {
        Header: "Scholar No.",
        accessor: "scholar_no",
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
      },
      // {
      //   Header: 'Action',
      //   accessor: (originalRow, rowIndex) => (
      //     <div>
      //       <button style={{color:"black"}} onClick={() => handleEdit(originalRow)}>Edit</button>
      //       <button onClick={() => handleDelete(originalRow)}>Delete</button>
      //     </div>
      //   ),
      //   id: 'action',
      // }
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
  } = useTable(
    {
      columns,
      data,
      initialState,
      enableEditing: true
    },useSortBy, usePagination);

  const { pageIndex } = state;

  return (
    <div className='allStudentMain'>
      {/* <TopOfPage pageName={"Student"} pagePath={"student"}/> */}
      <h2>All Students List</h2>
      {/* <SearchBar sortData={sortData} setSortData={setSortData} /> */}
      <div className="allStudentTable">
        <table className='adminStudentTable' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='adminStudentTableRow' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='adminStudentTableHead' {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* <span>
                    {column.isSortedDesc ? ' 🔽' : ' 🔼'}
                  </span> */}
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