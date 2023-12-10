import { configureStore } from '@reduxjs/toolkit';
import loginslice from '../slices/loginslice';
import userdetailslice from '../slices/userdetailslice';
import fetchdetailslice from '../slices/fetchdetailslice'; // Change the import statement
import { composeWithDevTools } from 'redux-devtools-extension';
import academicCalenderslice from '../slices/academicCalenderslice';
import crudstudentslice from '../slices/crudstudentslice';
import crudteacherslice from '../slices/crudteacherslice';
import crudsubjectslice from '../slices/crudsubjectslice';
export const store = configureStore({
  reducer: {
    login: loginslice,
    userdetail: userdetailslice,
    fetchDetail: fetchdetailslice,
    academicCalender:academicCalenderslice,
    crudstudent:crudstudentslice,
    crudteacher:crudteacherslice,
    crudsubject:crudsubjectslice,
  },
  
});
