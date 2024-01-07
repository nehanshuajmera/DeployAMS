import React, {  useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';
import GlobalFiltering from '../../../components/GlobalFiltering';
import './AllSubject.css'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { deleteSubjectAsync } from '../../../redux-toolkit/slices/crudsubjectslice';
import DeletePOP from '../../../components/DeletePOP';

export default function AllSubject() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  
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

  
  const [dataofsubjec, setdataofsubjec] = useState({ details: [] });
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
  // setdataofsubjec(useSelector((state)=>state.fetchDetail));

  const dataofsubject = useSelector((state) => state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofsubjec);
    setdataofsubjec(dataofsubject)
  }, [dataofsubject])

  const data = React.useMemo(() => dataofsubjec.details, [dataofsubjec.details]);

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
        Header: "Section",
        accessor: "section",
      }
      ,
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Class Name",
        accessor: "class_name",
      }
      ,
      {
        Header: 'Actions',
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          const {_id:itemId} = index.original
          return (
            <div className='tableActions'>
              <button className='actionBtn' onClick={() => navigate(`/updatesubject/`+itemId,{state:{...index.original}})}>
                <img src="/editBtn.png" alt="" />
              </button>
              <button className='actionBtn' onClick={() => handleDelete(itemId)}>
                <img src="/deleteBtn.png" alt="" />
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

   
  // state functions and variables for deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toggleDeleteConfirmation = (itemId = null) => {
    setDeleteItemId(itemId);
    setShowDeleteConfirmation(!showDeleteConfirmation);
    console.log(showDeleteConfirmation)
  };

  const handleDelete = async (itemId) => {
    toggleDeleteConfirmation(itemId);
    // Handle deletion if confirmed
    console.log(showDeleteConfirmation)
    if (showDeleteConfirmation) {
      try {
        await dispatch(deleteSubjectAsync(itemId));
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                    {column.Header!=="Actions"  ? <span>
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
      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <DeletePOP toggleDeleteConfirmation={toggleDeleteConfirmation} deleteItemId={deleteItemId} handleDelete={handleDelete}/>
      )}
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