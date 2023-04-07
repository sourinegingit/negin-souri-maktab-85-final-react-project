import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AppRouterProvider from "./providers/AppRouterProvider";
import store from './redux/store'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ToastContainer/>
      <Provider store={store}>
      <AppRouterProvider />
      </Provider>
  </React.StrictMode>
);
