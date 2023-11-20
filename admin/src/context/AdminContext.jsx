import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AdminContext = createContext();

function AdminContextProvider(props) {

    const [allStudent, setAllStudent] = useState([]);
    const [allTeacher, setAllTeacher] = useState([]);
    const [allSubject, setAllSubject] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/allstudents")
            .then((res) => {
                // console.log("ALL STUDENTS API",res.data.message);
                setAllStudent(res.data.message);
            })
            .catch((err) => {
                console.log(err.message);
            });
        
        axios.get("/api/admin/allteachers")
            .then((res) => {
                setAllTeacher(res.data.message);
            })
            .catch((err) => {
                console.log(err.message);
            }); 
        
        axios.get("/api/admin/allsubjects")
            .then((res) => {
                console.log("ALL SUBJECTS API",res);
                setAllSubject(res.data.message);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


return (
    <AdminContext.Provider value={{allStudent, allSubject,allTeacher }}>
        {props.children}
    </AdminContext.Provider>
    );
}

export default AdminContext;
export { AdminContextProvider };