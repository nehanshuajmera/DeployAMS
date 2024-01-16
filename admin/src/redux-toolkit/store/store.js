import { configureStore } from "@reduxjs/toolkit";
import loginslice from "../slices/loginslice";
import userdetailslice from "../slices/userdetailslice";
import fetchdetailslice from "../slices/fetchdetailslice"; // Change the import statement
import { composeWithDevTools } from "redux-devtools-extension";
import academicCalenderslice from "../slices/academicCalenderslice";
import crudstudentslice from "../slices/crudstudentslice";
import crudteacherslice from "../slices/crudteacherslice";
import crudsubjectslice from "../slices/crudsubjectslice";
import permissionslice from "../slices/acceptRejectPermission";
import logslice from "../slices/logslice";
import particularattendanceslice from "../slices/teacherAPIslice/seeparticularatendanceslice";
import checkclassslice from "../slices/teacherAPIslice/checkclassSlice";
import attendanceUpdationslice from "../slices/teacherAPIslice/insertUpdateattendanceSlice";
import passwordslice from "../slices/teacherAPIslice/passwordslice";
import pastattendanceslice from "../slices/teacherAPIslice/pastattendanceslice";
import updateattendancebypermissionslice from "../slices/teacherAPIslice/updateattendancebypermissionslice";
// import authapislice from '../slices/authapislice';

export const store = configureStore({
  reducer: {
    login: loginslice,
    userdetail: userdetailslice,
    fetchDetail: fetchdetailslice,
    academicCalender: academicCalenderslice,
    crudstudent: crudstudentslice,
    crudteacher: crudteacherslice,
    crudsubject: crudsubjectslice,
    permission: permissionslice,
    logdetail: logslice,
    particularattendanceDetail: particularattendanceslice,
    checkClass: checkclassslice,
    updateAttendance: attendanceUpdationslice,
    password: passwordslice,
    pastattendancepermission: pastattendanceslice,
    updateAttendancebypermission: updateattendancebypermissionslice,
    // auth:authapislice,
  },
});
