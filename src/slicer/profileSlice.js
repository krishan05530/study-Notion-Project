// import { createSlice } from "@reduxjs/toolkit";

// // initial state
// const initialState = {
//     user:null,
// }
// // on the basic of token i am creating suthslice, its an reducer
// const profileSlice = createSlice({
//     name: "profile",
//     initialState:initialState,
//     reducers: {
//      setUser(state,value){
//          state.user=value.payload;
//      }
//     },
// });

// export const { setUser } = profileSlice.actions;
// export default profileSlice.reducer;



import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;