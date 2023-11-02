import { actionType } from "../types/Types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_ERROR: 
    return {
        ...state,
        isError:true,
        isLoading: false,
    }
    case actionType.SET_LOADING: 
    return {
        ...state,
        isLoading: true,
    }
    case actionType.SET_LOGIN:
        return{
            ...state,
            isError:false,
            isLoading:false,
            userId:action.payload.userId,
            password:action.payload.password,
        }

    default:
      return state;
  }
};

export default LoginReducer;
