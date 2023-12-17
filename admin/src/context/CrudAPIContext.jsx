import { createContext, useContext } from "react";


const CrudAPIContext = createContext()

const CrudAPIProvider = ({children})=>{
    return(
        <CrudAPIContext.Provider value={{}}>
            {children}
        </CrudAPIContext.Provider>
    )
}

const useCrudAPI = ()=>{
    return useContext(CrudAPIContext)
}

export default CrudAPIProvider
export {useCrudAPI}
