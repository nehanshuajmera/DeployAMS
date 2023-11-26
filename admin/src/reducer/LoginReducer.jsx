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
            errorMsg:'',
            isLoading:false,
        }

    case actionType.SET_LOGOUT:
        return{
            ...state,
            isLogIn:false,
            isError:false,
            errorMsg:'',
            isAdmin:false,
        }
    case actionType.SET_USERTYPE:
        return{
            ...state,
            isAdmin: action.payload,
        }
    default:
      return state;
  }
};

export default LoginReducer;
