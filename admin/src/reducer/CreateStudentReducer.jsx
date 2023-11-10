import { actionType } from "../types/Types";


const CreateStudentReducer = (state,action)=>{
    switch (action.type) {
        case actionType.SET_ERROR:
            return{
                ...state,
                isError:true,
                isLoading:false,
            }
        case actionType.SET_LOADING:
            return{
                ...state,
                isLoading:true,
            }
                
        default:
            return state;
    }
}

export default CreateStudentReducer