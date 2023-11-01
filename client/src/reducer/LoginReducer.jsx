import { actionType } from "../types/Types";
import axios from "axios";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case actionType.LOGIN: {
      let { userId, password } = action.type;
      if (userId || password) {
        // api call
        
        (async()=>{
            try {
                const res = await axios.post("api/teacher/login",{
                    teacher_id: action.payload.userId,
                    password: action.payload.password
                })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        })()
      }
      return {
        ...state,
        isError: true,
      };
    }

    default:
      return state;
  }
};

export default LoginReducer;
