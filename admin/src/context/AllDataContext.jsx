import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { actionType, msgType } from "../types/Types";
import reducer from '../reducer/AllDataReducer'
import { useNavigate } from "react-router-dom";

const AllDataContext = createContext()


const initState = {
    allStudents:[],
    allTeachers:[],
    allCourses:[],
    isError:false,
    isLoading:false,
    errMsg:'',
    msg:'',
    msgType:'',
}

const AllDataContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initState);
    const navigate = useNavigate()


    // get the complete data of teachers/students/subjects
    const getAllDataOf = (data)=>{
        const {name,API} = data
        // name -> field's name
        dispatch({type:actionType.SET_LOADING})
        axios.get(`/api/admin/${API}`)
        .then(res=>(
            dispatch({type:actionType.SET_DATA,payload:{name,data:res}})
        ))
        .catch(err=>{
            
            dispatch({type:actionType.SET_ERROR,payload:err})
            setMsg({msg:err.Message,msgType:msgType.WARNING})
        })
    }

    // create teacher/student/subject
    const createItem = (content)=>{
        const {API,data} = content
        axios.post(`/api/admin/create${API}`,data)
        .then((res)=>{
          console.log(res);
          navigate('/')
        })
        .catch(err=>{            
            dispatch({type:actionType.SET_ERROR,payload:err})
            setMsg({msg:err.Message,msgType:msgType.WARNING})
        })
    }

    // update teacher/student/subject
    const updateItem = (content) => {
        const {API,itemId,data} = content
        axios.post(`/api/admin/update${API}/${itemId}`,data)
        .then((res)=>{
            console.log(res)
            // navigate("/")
        })
        .catch(err=>{            
            dispatch({type:actionType.SET_ERROR,payload:err})
            setMsg({msg:err.Message,msgType:msgType.WARNING})
        })
    }

    // delete teacher/student/subject
    const deleteItem = (content)=>{
        const {API,itemId} = content
        axios.get(`/api/admin/delete${API}/${itemId}`)
        .then(res=>{
            console.log(res)
            // navigate('/')
        })
        .catch(err=>{
            
            dispatch({type:actionType.SET_ERROR,payload:err})
            setMsg({msg:err.Message,msgType:msgType.WARNING})
        })
    }

    // set message to None/success/error
    const setMsg = (obj)=>{
        const {msg,msgType} = obj
        console.log(msgType)
        dispatch({type:actionType.SET_MSG,payload:{msg,msgType}})
        
        // to remove msg in 5s time
        const timerRef = setTimeout(() => {
            dispatch({type:actionType.SET_MSG,payload:{msg:'',msgType:''}})            
        }, 5000);
    }

    return(
        <AllDataContext.Provider value={{...state,getAllDataOf,createItem,updateItem,deleteItem,setMsg}}>
            {children}
        </AllDataContext.Provider>
    )
}


const useAllData = () => {
    return useContext(AllDataContext)
}

export default AllDataContextProvider
export {useAllData}