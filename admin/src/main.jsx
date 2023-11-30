import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginContextProvider from './context/LoginContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AllDataContextProvider from './context/AllDataContext.jsx'
import { AdminContextProvider } from './context/AdminContext.jsx'
import { TeacherContextProvider } from './context/TeacherContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <TeacherContextProvider>
    <AdminContextProvider>
      <LoginContextProvider>
        <AllDataContextProvider>
          <App />
        </AllDataContextProvider>
      </LoginContextProvider>      
    </AdminContextProvider>
    </TeacherContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
