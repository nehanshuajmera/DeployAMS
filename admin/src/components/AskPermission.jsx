import React, { useState } from "react";
import axios from "axios";
import { TYPE, useMsgErr } from "../context/MsgAndErrContext";

const AskPermission = ({ sub_id }) => {
  const { setMsgType, setMsg } = useMsgErr();
  const [data, setdata] = useState({
    date: "",
  });

  const changeHandler = (e) => {
    setdata({ date: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(`/api/updatepastattendance/asktoupdate/${sub_id}`, {
        date: data.date,
      });
      
      setMsgType(TYPE.SUCCESS);
      setMsg(response.data.message);
    } catch (error) {
      console.error("Error asking for permission:", error);
      setMsgType(TYPE.ERROR);
      setMsg("Error asking for permission. Please try again.");
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
