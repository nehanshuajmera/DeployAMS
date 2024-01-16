import React, { useContext, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import "./AllTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchdetailasync } from "../../../redux-toolkit/slices/fetchdetailslice";
import GlobalFiltering from "../../../components/GlobalFiltering";
import { useEffect } from "react";
import { deleteTeacherAsync } from "../../../redux-toolkit/slices/crudteacherslice";
import { useNavigate } from "react-router-dom";
import DeletePOP from "../../../components/DeletePOP";
import { TYPE, useMsgErr } from "../../../context/MsgAndErrContext";

export default function AllTeacher() {
  const [dataofteach, setdataofteach] = useState({ details: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMsgType, setMsg } = useMsgErr();
  const fetchStore = useSelector((state) => state.fetchDetail);


  useEffect(() => {
    const unsub = () => {
      try {
        dispatch(fetchdetailasync({ apiname: "allteachers" }));
        if (fetchStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(fetchStore.errMsg);
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to fetch teachers");
      }
    };

    unsub();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataofteacher = useSelector((state) => state.fetchDetail);
  useEffect(() => {
    console.log("data is comming", dataofteacher);
    setdataofteach(dataofteacher);
  }, [dataofteacher]);
  console.log(dataofteacher);
  const data = React.useMemo(() => dataofteach.details, [dataofteach.details]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        show: true,
      },
      {
        Header: "Teacher Id",
        accessor: "teacher_id",
        show: true,
      },
      {
        Header: "Department",
        accessor: "department",
        show: true,
      },
      {
        Header: "Faculty",
        accessor: "faculty",
        show: windowWidth > 800,
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
        show: true,
      },
      {
        Header: "Email",
        accessor: "email",
        show: windowWidth > 800,
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
                  navigate(`/updateteacher/` + itemId, {
                    state: { ...index.original },
                  })
                }
              >
                <img src="/editBtn.png" alt="" />
              </button>
              <button
                className="actionBtn"
                onClick={() => handleDelete(itemId)}
              >
                <img src="/deleteBtn.png" alt="" />
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

  // delete function and variables
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toggleDeleteConfirmation = (itemId = null) => {
    setDeleteItemId(itemId);
    setShowDeleteConfirmation(!showDeleteConfirmation);
    console.log(showDeleteConfirmation);
  };

  const teacherStore = useSelector((state) => state.crudteacher);

  const handleDelete = async (itemId) => {
    toggleDeleteConfirmation(itemId);
    // Handle deletion if confirmed
    console.log(showDeleteConfirmation);
    if (showDeleteConfirmation) {
      try {
        await dispatch(deleteTeacherAsync(itemId));
        if (teacherStore.isErr) {
          setMsgType(TYPE.Err);
          setMsg(teacherStore.errMsg);
        } else {
          setMsgType(TYPE.Success);
          setMsg("Teacher deleted successfully");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        setMsgType(TYPE.Err);
        setMsg("Failed to delete teacher");
      }
    }
  };

  return (
    <div className="allTeacherMain">
      <h2>All Teacher List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allTeacherTable">
        <table className="adminTeacherTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="adminTeacherTableRow"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="adminTeacherTableHead"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ display: column.show ? "table-cell" : "none" }}
                  >
                    {column.render("Header")}
                    {column.Header !== "Actions" &&
                      column.Header !== "Email" &&
                      column.Header !== "Phone No." ? (
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
                <tr
                  className="adminTeacherTableRow"
                  {...row.getRowProps()}
                  onClick={() => gotoUpdate(row)}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="adminTeacherTableData"
                      {...cell.getCellProps()}
                      style={{
                        display: cell.column.show ? "table-cell" : "none",
                      }}
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
