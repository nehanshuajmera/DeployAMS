import { actionType } from "../types/Types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_ERROR: 
    return {
        ...state,
        isError:true,
        isLoading: false,
        errMsg:action.payload,
        isAuthenticate: false,
    }
    case actionType.SET_LOADING: 
    return {
        ...state,
        isLoading: true,
    }
    case actionType.SET_LOGIN:
        return{
            ...state,
            isAuthenticate: false,
            isError:false,
            errMsg:'',
            isLoading:false,
        }

    case actionType.SET_LOGOUT:
        return{
            isLogIn:false,
            isError:false,
            errorMsg:'',
            isAuthenticate: false,
        }
    default:
      return state;
  }
};

export default LoginReducer;
