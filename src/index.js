import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>

  </React.StrictMode>
);
// install npm i->  npm start to run frontend
//packgae  npm i concurrently , to run both frontend and backend on sam eterminal
// npm run dev

// dependncies to install
//browserRouter -> react rout dom 

