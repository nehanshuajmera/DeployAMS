import React, { useState } from "react";
import { postAttendancePermissionAsync } from "../redux-toolkit/slices/teacherAPIslice/pastattendanceslice";
import { useDispatch } from "react-redux";

const AskPermission = ({ sub_id }) => {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    date: "",
  });
  const changeHandler = (e) => {
    setdata({ date: e.target.value });
  };
  const submitHandler = async() => {
    try {
      await dispatch(postAttendancePermissionAsync({ ID: sub_id, data }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="askForPermission">
        <h2>Ask For Permission</h2>
        <div className="askForPermissionText">
          <input
            type="date"
            className="bg-dimwhite"
            name="date"
            id="permission"
            value={data.date}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="askForPermissionBtn">
          <button onClick={submitHandler}>Ask</button>
        </div>
      </div>
    </>
  );
};

export default AskPermission;
