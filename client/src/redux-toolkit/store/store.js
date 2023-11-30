import { configureStore} from '@reduxjs/toolkit'
import loginslice from '../slicees/loginslice'
import passwordreducer from '../slicees/passwordslice'
import detailreducer from '../slicees/studentdataslice'

export const store = configureStore({
  reducer: {
    login:loginslice,
    changePassword:passwordreducer,
    studentDetail:detailreducer,
  },
  
})