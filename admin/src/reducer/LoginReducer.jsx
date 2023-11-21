import { actionType } from "../types/Types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_ERROR: 
    console.log("action.payload = ", action.payload)
    return {
        ...state,
        isError:true,
        isLoading: false,
        errorMsg:action.payload,
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
            errorMsg:'',
            isLoading:false,
        }

    case actionType.SET_LOGOUT:
        return{
            ...state,
            isLogIn:false,
            isError:false,
            errorMsg:'',
            isAuthenticate: false,
        }
    case actionType.SET_AUTHENTICATE:
        return{
            ...state,
            isLogIn:false,
            isError:false,
            errorMsg:'',
            isAuthenticate: true,
        }
    default:
      return state;
  }
};

export default LoginReducer;
