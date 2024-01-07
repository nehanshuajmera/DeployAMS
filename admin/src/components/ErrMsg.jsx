import { useEffect } from "react";
import { TYPE, useMsgErr } from "../context/MsgAndErrContext";

const ErrMsg = () => {
  const { msg, msgType, clearMsg } = useMsgErr();
  useEffect(() => {
    setTimeout(() => {
      clearMsg();
    }, [5000]);
  }, [msg]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div>
      {/* error msg  */}
      {msg && msgType === TYPE.Err && (
        <div
          className={`w-full py-1 px-2 rounded-md flexCenter bg-red-400`}
        >
          <h4 className="text-center text-white ">{msg}</h4>
        </div>
      )}

      </div>
      <div>
      {/* success msg */}
      {msg && msgType === TYPE.Success &&(
        
        <div
        className={`w-full py-1 px-2 rounded-md flexCenter ${
            msgType === TYPE.Success ?  "bg-green-500": " bg-red-500"
          }`}
          >
          <h4 className="text-center text-white ">{msg}</h4>
        </div>
      )}
      </div>
      {
        // msg &&
        <div
        // className={`w-[40%] fixed top-0 left-0 translate-x-[50%] py-1 px-2 rounded-md flexCenter ${msgType?" bg-green-400":" bg-red-400"} z-10 `}
        >
          <h4 className="text-center text-white ">{}</h4>
        </div>
      }
    </div>
  );
};

export default ErrMsg;
