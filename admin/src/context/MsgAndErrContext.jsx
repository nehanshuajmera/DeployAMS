import { createContext, useContext, useReducer } from "react";

const MsgAndErrContext = createContext();

const initialState = {
  msg: "",
  msgType: null, // error||success||null
};

const MsgAndErrProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMsgType = (msgType) => {
    console.log("setMsgTYPE", msgType);
    dispatch({ type: "SET_TYPE", payload: msgType });
  };
  const setMsg = (msg) => {
    console.log("setMsg", msg);
    dispatch({ type: "SET_MSG", payload: msg });
  };
  // clear msg and msgType
  const clearMsg = () => {
    console.log("clearMSg");
    dispatch({ type: "CLEAR" });
  };

  return (
    <MsgAndErrContext.Provider
      value={{ ...state, setMsgType, setMsg, clearMsg }}
    >
      {children}
    </MsgAndErrContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MSG":
      return {
        ...state,
        msg: action.payload,
      };
    case "SET_TYPE":
      return {
        ...state,
        msgType: action.payload,
      };
    case "CLEAR":
      return {
        ...state,
        msg: "",
        msgType: "",
      };

    default:
      return state;
  }
};

export const useMsgErr = () => {
  return useContext(MsgAndErrContext);
};
export const TYPE = {
  Err: "Err",
  Success: "Success",
  None: "None",
};
// exports [useMsgErr,TYPE]
export default MsgAndErrProvider;
