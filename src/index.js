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


// issue faced 
/* in week 2 lect 7
importance of localstorage:-
after login when we do refresh , code fat gaya
when login :-> set user in profile but when reload user become null ,it mean data was not persisiting,AS WE hadnt store it in localstorage
,as we have store the token in localstorage , we need to store user in localstorage as well
we will do chnages in profileslces and in operation-> authAPI , set the user in localstorage
*/

/*
thre is no text-red things in tailwindcss
*/

/*
issue faced in week 3 lect 3:-> when we updated the subsection , the updated subsection was not showing on UI, hum courseSet() me section ko feed kar rhe the ,hume course hi feed karna hota he
solution :-> we were setCourse() me neccesory feeding nahi ki thi , hum data return nahi kar rhe the , , ab hum subsection edit me :-> backedn se subsection edi tkarke , section ko return karte he , jis section se hum updated course bana kar setCourse() ko feed kar sakte he
*/

/* while creating navbar ,
issue faced , was not able to get the courses details in thee catgeory section , as  we  had not declared it in array in category modal , so we were not able to use ALLcategory.course.lneght>0 in navbar section in catalog and was getting error
*/