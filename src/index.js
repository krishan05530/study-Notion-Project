// npm run dev to run it

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./reducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const store=configureStore(
  {
    reducer:rootReducer,
  }
);
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>

    </Provider>
 
  </React.StrictMode>
);
// install npm i->  npm start to run frontend
//packgae  npm i concurrently , to run both frontend and backend on sam eterminal
// npm run dev

// dependncies to install
//browserRouter -> react rout dom 


// to go for redux need to install:-> npm install redux-toolkit
// now wrap <App/> into Provider
// import {Provider} from 'react-redux';
// import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './reducer';
// const store = configureStore({   
//     reducer: rootReducer
//   });

// carete reducer folder
// index.js file inside reducer folder
// import {combineReducers} from 'redux';
// import authReducer from '../slicer/authSlice';
// const rootReducer=combineReducers({
//     auth:authReducer,
// });
// export default rootReducer;

// from slice
// crate slice and export them 


// now for cart slice , we need toast
// toaster :- use :npm i react-hot-toast
// import {Toaster} from react-hot-toast
//<APP/>
//<Toaster/>

// then in cartslice -> import {toast} from react-hot-toast