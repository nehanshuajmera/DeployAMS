import React, { useEffect, useState } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchdetailasync } from "../../../redux-toolkit/slices/fetchdetailslice";
import { deleteStudentAsync } from "../../../redux-toolkit/slices/crudstudentslice";
import { useNavigate } from "react-router-dom";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";
import GlobalFiltering from "../../../components/GlobalFiltering";
import DeletePOP from "../../../components/DeletePOP";
import "./AllStudent.css";

export default function AllStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { setMsgType, setMsg } = useMsgErr();

  useEffect(() => {
    const unsub = async () => {
      console.log("clicked");
      try {
        await dispatch(fetchdetailasync({ apiname: "allstudents" }));
        if (fetchStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(fetchStore.errMsg);
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to fetch students");
      }
    };
    unsub();
  }, []);

  const fetchStore = useSelector((state) => state.fetchDetail);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataofstudent = useSelector((state) => state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofstudent);
    setdataofstud(dataofstudent);
  }, [dataofstudent]);

  const data = React.useMemo(() => dataofstud.details, [dataofstud.details]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        show: true,
      },
      {
        Header: "Enrollment No.",
        accessor: "enrollment_no",
        show: true,
      },
      {
        Header: "Scholar No.",
        accessor: "scholar_no",
        show: true,
      },
      {
        Header: "Year",
        accessor: "year",
        show: true,
      },
      {
        Header: "Branch",
        accessor: "branch",
        show: true,
      },
      {
        Header: "Section",
        accessor: "section",
        show: windowWidth > 800,
      },
      {
        Header: "Specialization",
        accessor: "specialisation",
        show: windowWidth > 800,
      },
      {
        Header: "Programme",
        accessor: "programme",
        show: windowWidth > 800,
      },
      {
        Header: "Actions",
        Cell: (tableInstance) => {
          const { row: index } = tableInstance;
          const { id: itemId } = index.original;
          return (
            <div className="tableActions">
              <button className="actionBtn" onClick={() => navigate(`/updatestudent/` + itemId, { state: { ...index.original } })}>
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
              <button className="actionBtn" onClick={() => handleDelete(itemId)}>
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
        show: true,
      },
    ],
    [windowWidth]
  );

  const initialState = {
    pageSize: 60,
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
  } = useTable({
    columns,
    data,
    initialState,
    enableEditing: true,
  }, useGlobalFilter, useSortBy, usePagination);

  const { pageIndex, globalFilter } = state;

  // state functions and variables for deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toggleDeleteConfirmation = (itemId = null) => {
    setDeleteItemId(itemId);
    setShowDeleteConfirmation(!showDeleteConfirmation);
    console.log(showDeleteConfirmation);
  };

  const studentStore = useSelector((state) => state.crudStudent);

  const handleDelete = async (itemId) => {
    toggleDeleteConfirmation(itemId);
    // Handle deletion if confirmed
    console.log(showDeleteConfirmation);
    if (showDeleteConfirmation) {
      try {
        await dispatch(deleteStudentAsync(itemId));
        if (studentStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(studentStore.errMsg);
        } else {
          setMsgType(TYPE.Success);
          setMsg("Student Deleted successfully");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to delete student");
      }
    }
  };

  return (
    <div className="allStudentMain">
      <h2>All Students List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allStudentTable">
        <table className="adminStudentTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="adminStudentTableRow" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="adminStudentTableHead" {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ display: column.show ? "table-cell" : "none" }}>
                    {column.render("Header")}
                    {column.Header !== "Actions" ? (
                      <span>
                        {column.isSorted ? column.isSortedDesc ? " ⬇" : " ⬆" : " ↕"}
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
              // console.log(row);
              return (
                <tr className="adminStudentTableRow" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="adminStudentTableData" {...cell.getCellProps()}
                      style={{ display: cell.column.show ? "table-cell" : "none", }}>
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
        <DeletePOP toggleDeleteConfirmation={toggleDeleteConfirmation}
          deleteItemId={deleteItemId}
          handleDelete={handleDelete} />
      )}
      {page.length ? (
        <div className="tablePageButtons">
          <button className="nAndpButtons" onClick={() => previousPage()} disabled={!canPreviousPage}>
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
          <button className="nAndpButtons" onClick={() => nextPage()} disabled={!canNextPage}>
            {" "}
            Next{" "}
          </button>
        </div>
      ) : (
        <>
        <h2 className="noData">No Data</h2>
        </>
      )}
    </div>
  );
}
