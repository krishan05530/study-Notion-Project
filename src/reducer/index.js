// import {combineReducers} from 'redux';
// import authReducer from '../slices/authSlice';
// import profileReducer from "../slices/profileSlice"
// import cartReducer from "../slices/cartSlice"
// import courseReducer from "../slices/courseSlice"
// import viewCourseReducer from "../slices/viewCourseSlice"
// // create a root reducer
// // import all the reducers here
// const rootReducer=combineReducers({
//     // reducers , all the reducer mention here
//     auth:authReducer,
//     profile:profileReducer,
//     cart:cartReducer,
//     course:courseReducer,
//     viewCourse: viewCourseReducer,
// });

// export default rootReducer;




import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse: viewCourseReducer,
})

export default rootReducer