import React, { useContext, useEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import GlobalFiltering from "../../../components/GlobalFiltering";
import "./AllStudent.css";
import { fetchdetailasync } from "../../../redux-toolkit/slices/fetchdetailslice";
import { deleteStudentAsync } from "../../../redux-toolkit/slices/crudstudentslice";
import { useNavigate } from "react-router-dom";
import DeletePOP from "../../../components/DeletePOP";

export default function AllStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataofstud, setdataofstud] = useState({ details: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const unsub = async () => {
      console.log("clicked");
      try {
        await dispatch(fetchdetailasync({ apiname: "allstudents" }));
      } catch (error) {
        console.log(error);
      }
    };
    unsub();
  }, []);
  // setdataofstudent(useSelector((state)=>state.fetchDetail));

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
      // {
      //   Header: "Faculty",
      //   accessor: "faculty",
      // },
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
              <button
                className="actionBtn"
                onClick={() =>
                  navigate(`/updatestudent/` + itemId, {
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
        await dispatch(deleteStudentAsync(itemId));
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleDelete = async (itemId) => {
  //   try {
  //     await dispatch(deleteStudentAsync(itemId));
  //     // navigate('/allstudent')
  //     // reload the page
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="allStudentMain">
      <h2>All Students List</h2>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="allStudentTable">
        <table className="adminStudentTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="adminStudentTableRow"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="adminStudentTableHead"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ display: column.show ? "table-cell" : "none" }}
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
              // console.log(row);
              return (
                <tr className="adminStudentTableRow" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      className="adminStudentTableData"
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
        <DeletePOP toggleDeleteConfirmation={toggleDeleteConfirmation} deleteItemId={deleteItemId} handleDelete={handleDelete}/>
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


