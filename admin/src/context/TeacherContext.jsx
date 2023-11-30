import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TeacherContext = createContext();

function TeacherContextProvider(props) {

const [teachers, setTeachers] = useState([]);
const [alerts, setAlert] = useState([]);

// useEffect(() => {
//     axios.get("/api/").then((res) => {
//         setTeachers(res.data);
//     });
// }, []);

useEffect(() => {
    axios.get("/api/alert").then((res) => {
        setAlert(res.data.message);
    });
}   
, []);



return (
    <TeacherContext.Provider value={{alerts}}>
        {props.children}
    </TeacherContext.Provider>
    );
}

const useTeacher= ()=>{
    return useContext(TeacherContext)
}

export default TeacherContext;
export { TeacherContextProvider,useTeacher };