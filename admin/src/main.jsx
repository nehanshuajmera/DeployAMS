import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { store } from "./redux-toolkit/store/store.js";
import { Provider } from "react-redux";
import MsgAndErrProvider from "./context/MsgAndErrContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <MsgAndErrProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
          <App />
        </AuthContextProvider>
        </Provider>
      </BrowserRouter>
    </MsgAndErrProvider>
  // </React.StrictMode>
);
