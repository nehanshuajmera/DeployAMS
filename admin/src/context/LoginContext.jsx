import { createContext, useContext, useReducer } from "react";
import reducer from '../reducer/LoginReducer'
import { actionType } from "../types/Types";
import axios from 'axios'

const LoginContext = createContext();

const initialState = {
    teacher_id:'',
    password:'',
    isLogIn:false,
    isError:false,
}

const LoginContextProvider = ({children})=>{

    const loginHandler = (data)=>{
        dispatch({type:actionType.SET_LOADING})
        const {teacher_id,password} = data
        if(teacher_id && password){
          try {
              ;(async()=>{
                    const res = axios.post("http://localhost:5000/api/teacher/login",{teacher_id,password})
                    console.log(res)
                    dispatch({type:actionType.SET_LOGIN,payload:{teacher_id,password}})                  
              })()
          } catch (error) {
            console.log(error)
          }
        }
        else{
            dispatch({type:actionType.SET_ERROR})
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