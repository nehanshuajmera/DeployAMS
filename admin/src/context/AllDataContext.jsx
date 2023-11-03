import { createContext } from "react";


const AllDataContext = createContext()


const AllDataContextProvider = ({children})=>{
    

    return(
        <AllDataContext.Provider>
            {children}
        </AllDataContext.Provider>
    )
}

export default AllDataContextProvider