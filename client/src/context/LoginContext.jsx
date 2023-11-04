import { createContext, useContext, useReducer } from "react";
import reducer from '../reducer/LoginReducer'
import { actionType } from "../types/Types";
import axios from 'axios'

const LoginContext = createContext();

const initialState = {
    isLogIn:false,
    isError:false,
    errorMsg:'',
    isAuthenticate: false,
}

const LoginContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    // const history = 

    const loginHandler = (data)=>{
        dispatch({type:actionType.SET_LOADING})
        const {userId,password} = data

        if(userId && password){
            axios.post("/api/teacher/login",{teacher_id:userId,password:password})
            .then(()=>{
                return axios.get("/api/authentic")
            }).then(res=>(
                dispatch({payload:res.message})
                ))
                .catch(err=>(dispatch({type:actionType.SET_ERROR,payload:err.message})))
        }
        else{
            dispatch({type:actionType.SET_ERROR,payload:"Field/(s) is empty"})
            console.log("empty")
        }

    }

    const logOut = () =>{
         dispatch({type:actionType.SET_LOGOUT})
    }

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