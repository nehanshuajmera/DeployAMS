import { createContext, useContext, useReducer } from "react";
import reducer from '../reducer/LoginReducer'
import { actionType } from "../types/Types";
import axios from 'axios'

const LoginContext = createContext();

const initialState = {
    userId:'',
    password:'',
    isLogIn:false,
    isError:false,
    errorMsg:''
}

const LoginContextProvider = ({children})=>{

    const loginHandler = (data)=>{
        dispatch({type:actionType.SET_LOADING})
        const {userId,password} = data
        if(userId && password){
            axios.post("/api/teacher/login",{teacher_id:userId,password:password})
            .then(res=>(console.log(res)))
            .catch(err=>(dispatch({type:actionType.SET_ERROR,payload:err.message})))
        //   try {
        //       ;(async()=>{
        //             const res =await axios.post("/api/teacher/login",{teacher_id:userId,password:password})
        //             console.log(res)
        //             // if(res.message ===401){
        //             //     console.log(res.message)
        //             // }
        //             dispatch({type:actionType.SET_LOGIN,payload:{userId,password}})                  
        //       })()
        //   } catch (error) {
        //     console.log(error)
        //   }
        }
        else{
            dispatch({type:actionType.SET_ERROR,payload:"Field/(s) is empty"})
            console.log("empty")
        }

    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <LoginContext.Provider value={{...state,loginHandler}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = ()=>{
    return useContext(LoginContext)
}

export default LoginContextProvider
export {useLogin}