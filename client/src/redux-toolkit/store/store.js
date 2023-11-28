import { configureStore } from '@reduxjs/toolkit'
import loginreducer from '../slicees/loginslice'
export const store = configureStore({
  reducer: {
    login:loginreducer
  },
})