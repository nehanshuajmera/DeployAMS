import { configureStore} from '@reduxjs/toolkit'
import loginslice from '../slicees/loginslice'
import passwordreducer from '../slicees/passwordslice'
import detailreducer from '../slicees/studentdataslice'

import authapislice from '../slicees/authapislice';

export const store = configureStore({
  reducer: {
    login:loginslice,
    auth:authapislice,
    changePassword:passwordreducer,
    studentDetail:detailreducer,
  },
  
})