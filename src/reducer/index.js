import {combineReducers} from 'redux';
import authReducer from '../slicer/authSlice';
import profileReducer from "../slicer/profileSlice"
import cartReducer from "../slicer/cartSlice"
// create a root reducer
// import all the reducers here
const rootReducer=combineReducers({
    // reducers , all the reducer mention here
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,

});

export default rootReducer;