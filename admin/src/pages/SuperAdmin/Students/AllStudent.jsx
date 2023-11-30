import React, { useContext, useEffect, useState } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import AdminContext from '../../../context/AdminContext';
import GlobalFiltering from '../../../components/GlobalFiltering';
import './AllStudent.css'

export default function AllStudent() {
  const { allStudent } = useContext(AdminContext);
  const data = React.useMemo(() => allStudent, [allStudent]);

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
        accessor: "specialisation",
      },
      // {
      //   Header: "Faculty",
      //   accessor: "faculty",
      // },
      {
        Header: "Programme",
        accessor: "programme",
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
    <div className='allStudentMain'>
      <h2>All Students List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allStudentTable">
        <table className='adminStudentTable' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='adminStudentTableRow' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='adminStudentTableHead' {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tr className='adminStudentTableRow' {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className='adminStudentTableData' {...cell.getCellProps()}>
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