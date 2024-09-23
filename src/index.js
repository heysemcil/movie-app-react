import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MovieContextProvider } from "./context/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
      <ToastContainer />
    </AuthContextProvider>
  </BrowserRouter>,
);
