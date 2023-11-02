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
}

const LoginContextProvider = ({children})=>{

    const loginHandler = (data)=>{
        dispatch({type:actionType.SET_LOADING})
        const {userId,password} = data
        if(userId && password){
          try {
              ;(async()=>{
                    const res = axios.post("/api/teacher/login",{userId,password})
                    console.log(res)
                    dispatch({type:actionType.SET_LOGIN,payload:{userId,password}})                  
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