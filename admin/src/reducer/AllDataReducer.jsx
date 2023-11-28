import { actionType } from "../types/Types";

const AllDataReducer = (state,action)=>{
    switch (action.type) {
        case actionType.SET_ERROR:
            return{
                ...state,
                isError:true,
                isLoading: false,
                errMsg:action.payload
            }
        case actionType.SET_MSG:
            {
                let {msg,msgType} = action.payload
                return{
                    ...state,
                    msg:msg,
                    msgType:msgType,
                }
            }
        case actionType.SET_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case actionType.SET_DATA:
            {
                const {name,data} = action.payload
                return{
                    ...state,
                    [name]:data,
                    isLoading:false,
                }
            }
    
        default:
            return state;
    }
}

export default AllDataReducer