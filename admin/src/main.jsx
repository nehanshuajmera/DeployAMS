import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginContextProvider from './context/LoginContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AllDataContextProvider from './context/AllDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <AllDataContextProvider>
          <App />
        </AllDataContextProvider>
      </LoginContextProvider>      
    </BrowserRouter>
  </React.StrictMode>,
)
