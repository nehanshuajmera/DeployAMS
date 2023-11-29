import React, { useContext } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import './AllTeacher.css'
import AdminContext from '../../../context/AdminContext';
import GlobalFiltering from '../../../components/GlobalFiltering';

export default function AllTeacher() {

  const { allTeacher } = useContext(AdminContext);
  const data = React.useMemo(() => allTeacher, [allTeacher]);


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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
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
    <div className='allTeacherMain'>
  {/* {console.log("YE TEACHER HEY",allTeacher)} */}

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
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
                <tr className='adminTeacherTableRow' {...row.getRowProps()}>
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