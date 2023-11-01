import { createContext, useReducer } from "react";
import reducer from '../reducer/LoginReducer'

const LoginContext = createContext();

const initialState = {
    userId:'',
    password:'',
    isLogIn:false,
    isError:false,

}

const LoginContextProvider = (children)=>{
    const loginHandler = (data)=>{
        
        dispatch({type:"LOGIN",payload:data})
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <LoginContext.Provider value={{...state,loginHandler}}>
            {children}
        </LoginContext.Provider>
    )
}






export default LoginContextProvider