import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ErrMsg from "./components/ErrMsg";
import Dashboard from "./pages/SuperAdmin/Dashboard/Dashboard";
import AllStudent from "./pages/SuperAdmin/Students/AllStudent";
import AllTeacher from "./pages/SuperAdmin/Teachers/AllTeacher";
import AllSubject from "./pages/SuperAdmin/Subjects/AllSubject";
import CreateStudent from "./pages/SuperAdmin/Students/CreateStudent";
import UpdateStudent from "./pages/SuperAdmin/Students/UpdateStudent";
import UpdateTeacher from "./pages/SuperAdmin/Teachers/UpdateTeacher";
import CreateTeacher from "./pages/SuperAdmin/Teachers/CreateTeacher";
import UpdateSubject from "./pages/SuperAdmin/Subjects/UpdateSubject";
import CreateSubject from "./pages/SuperAdmin/Subjects/CreateSubject";
import Alert from "./pages/SuperAdmin/Alert&Notice/Alert";
import MarkAttendence from "./pages/Admin/AttendenceSheet/MarkAttendence";
import TeacherDashboard from "./pages/Admin/Dashboard/TeacherDashboard";
import ProtectedRoute from "./protectrouter/ProtectedRoute";
import Calendar from "./pages/SuperAdmin/Calendar/Calendar";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttendancePermission from "./pages/SuperAdmin/AttendancePermission/AttendancePermission";
import PreviousAttendence from "./pages/Admin/PreviousAttendance/PreviousAttendance";
import SubstituteTeacher from "./pages/Admin/Substitute Teacher/SubstituteTeacher";
import ArangementClass from "./pages/Admin/ArangementClass/ArangementClass";
import UpdatePrevious from "./pages/Admin/AttendenceSheet/UpdatePrevious";

import { authasync } from "./redux-toolkit/slices/authapislice";
import Header from "./Universal/header";
import AdminRoute from "./protectrouter/AdminRoute";
import AuthContext from "./context/AuthContext";
import UploadBulkData from "./pages/SuperAdmin/UploadData/UploadBulkData";
import UpdateAttendanceRequestPage from "./pages/Admin/PastAttendance/UpdateAttendanceRequestPage";

function App() {

const dispatch=useDispatch();

  useEffect(() => {
    const unsub=async()=>{
      try{
        await dispatch(authasync());
      }catch(error){
          console.log(error);
      }
    }
    unsub();
   }, [])
  
   const {IsLogin}=useContext(AuthContext);

  return (
    <div className="w-full overflow-hidden bg-dimWhite ">
      {IsLogin? <Header/>:null}
      <ErrMsg/>
      <Routes>
        <Route
          path={"/"}
          element={
              <Login />
          }
        />
        <Route
          path={"/teacherdashboard"}
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/previousattendance/:id"}
          element={
            <ProtectedRoute>
              <PreviousAttendence />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/substituteteacher"}
          element={
            <ProtectedRoute>
              <SubstituteTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/arangementclass"}
          element={
            <ProtectedRoute>
              <ArangementClass />
            </ProtectedRoute>
          }
        />
      <Route
          path={"/pastattendance"}
          element={
            <ProtectedRoute>
              <UpdateAttendanceRequestPage/>
            </ProtectedRoute>
          }
        />
        
        <Route
          path={"/dashboard"}
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path={"/allstudent"}
          element={
            <AdminRoute>
              <AllStudent />
            </AdminRoute>
          }
        />
        <Route
          path={"/allteacher"}
          element={
            <AdminRoute>
              <AllTeacher />
            </AdminRoute>
          }
        />
        <Route
          path={"/allsubject"}
          element={
            <AdminRoute>
              <AllSubject />
            </AdminRoute>
          }
        />
        <Route
          path={"/createstudent"}
          element={
            <AdminRoute>
              <CreateStudent />
            </AdminRoute>
          }
        />
        <Route
          path={"/updatestudent/:id"}
          element={
            <AdminRoute>
              <UpdateStudent />
            </AdminRoute>
          }
        />
        <Route
          path={"/createsubject"}
          element={
            <AdminRoute>
              <CreateSubject />
            </AdminRoute>
          }
        />
        <Route
          path={"/updatesubject/:id"}
          element={
            <AdminRoute>
              <UpdateSubject />
            </AdminRoute>
          }
        />
        <Route
          path="/createteacher"
          element={
            <AdminRoute>
              <CreateTeacher />
            </AdminRoute>
          }
        />
        <Route
          path="/updateteacher/:id"
          element={
            <AdminRoute>
              <UpdateTeacher />
            </AdminRoute>
          }
        />
        <Route
          path="/dataupload"
          element={
            <AdminRoute>
              <UploadBulkData />
            </AdminRoute>
          }
        />
        <Route
          path="/markattendance/:id"
          element={
            <ProtectedRoute>
              <MarkAttendence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updatepreviousattendace/:id"
          element={
            <ProtectedRoute>
              <UpdatePrevious />
            </ProtectedRoute>
          }
        />
        <Route
          path="/academiccalendar"
          element={
            <AdminRoute>
              <Calendar />
            </AdminRoute>
          }
        />
        <Route
          path="/attendancepermission"
          element={
            <ProtectedRoute>
              <AttendancePermission />
            </ProtectedRoute>
          }
        />
        <Route path="/alert" element={<Alert />} />
        <Route path="*" element={<ErrMsg />} />
      </Routes>

      {/* <MarkAttendence/> */}
    </div>
  );
}

export default App;
