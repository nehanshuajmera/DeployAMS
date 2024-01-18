import React, { useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchdetailasync } from "../../../redux-toolkit/slices/fetchdetailslice";
import GlobalFiltering from "../../../components/GlobalFiltering";
import "./AllSubject.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSubjectAsync } from "../../../redux-toolkit/slices/crudsubjectslice";
import DeletePOP from "../../../components/DeletePOP";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";

export default function AllSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMsgType, setMsg } = useMsgErr();
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
        if (fetchStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(fetchStore.errMsg);
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to fetch subjects");
      }
    };
    unsub();
  }, []);
  const fetchStore = useSelector((state)=>state.fetchDetail);

  const dataofsubject = useSelector((state) => state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofsubjec);
    setdataofsubjec(dataofsubject);
  }, [dataofsubject]);

  const data = React.useMemo(
    () => dataofsubjec.details,
    [dataofsubjec.details]
  );

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
      },
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Class Name",
        accessor: "class_name",
      },
      {
        Header: "Actions",
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          const { _id: itemId } = index.original;
          return (
            <div className="tableActions">
              <button
                className="actionBtn"
                onClick={() =>
                  navigate(`/updatesubject/` + itemId, {
                    state: { ...index.original },
                  })
                }
              >
                <>
  {/*?xml version="1.0" encoding="iso-8859-1"?*/}
  {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
  <svg
    fill="#000000"
    height="20px"
    width="20px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 306.637 306.637"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"
        />
        <path
          d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </g>
  </svg>
</>

              </button>
              <button
                className="actionBtn"
                onClick={() => handleDelete(itemId)}
              >
                <>
  {/*?xml version="1.0" encoding="utf-8"?*/}
  {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</>

              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const initialState = {
    pageSize: 20,
  };

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
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
      enableEditing: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  // state functions and variables for deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toggleDeleteConfirmation = (itemId = null) => {
    setDeleteItemId(itemId);
    setShowDeleteConfirmation(!showDeleteConfirmation);
    console.log(showDeleteConfirmation);
  };

  const subjectStore = useSelector((state) => state.crudsubject);

  const handleDelete = async (itemId) => {
    toggleDeleteConfirmation(itemId);
    // Handle deletion if confirmed
    console.log(showDeleteConfirmation);
    if (showDeleteConfirmation) {
      try {
        await dispatch(deleteSubjectAsync(itemId));
        if (subjectStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(subjectStore.errMsg);
        } else {
          setMsgType(TYPE.Success);
          setMsg("Subject deleted successfully");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to delete subject");
      }
    }
  };

  return (
    <div className="allSubjectMain">
      <h2>All Subjects List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allSubjectTable">
        <table className="adminSubjectTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="adminSubjectTableRow"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="adminSubjectTableHead"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.Header !== "Actions" ? (
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ⬇"
                            : " ⬆"
                          : " ↕"}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="adminSubjectTableRow" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      className="adminSubjectTableData"
                      {...cell.getCellProps()}
                    >
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
        <DeletePOP
          toggleDeleteConfirmation={toggleDeleteConfirmation}
          deleteItemId={deleteItemId}
          handleDelete={handleDelete}
        />
      )}
      {page.length ? (
        <div className="tablePageButtons">
          <button
            className="nAndpButtons"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {" "}
            Previous{" "}
          </button>
          <span className="pageNoDetails">
            {" "}
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            className="nAndpButtons"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {" "}
            Next{" "}
          </button>
        </div>
      ) : (
        <h2 className="noData">No Data</h2>
      )}
    </div>
  );
}
