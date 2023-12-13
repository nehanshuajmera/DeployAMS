import React, { useEffect, useState } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import { useDispatch, useSelector } from 'react-redux';
import GlobalFiltering from '../../../components/GlobalFiltering';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';

export default function MarkAttendence() {
  const dispatch = useDispatch();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  useEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(fetchdetailasync({ apiname: "allstudents" }));
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
    <div className='allStudentMain'>
      <h2>Attendence Sheet</h2>
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
              console.log(row)
              return (
                <tr className='adminStudentTableRow' {...row.getRowProps()} onClick={() => gotoUpdate(row)}>
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