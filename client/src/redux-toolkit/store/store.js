import { configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import loginslice from '../slicees/loginslice'
import passwordreducer from '../slicees/passwordslice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    login:loginslice,
    changePassword:passwordreducer,
  },
  middleware: [...getDefaultMiddleware(), thunk], 
})