import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import countryReducer from "./slices/countrySlice";
import courseReducer from "./slices/courseSlice";
import universityReducer from "./slices/universitySlice";



export const store = configureStore({
    reducer:{
        auth:authReducer,
        countryData:countryReducer,
         courseData: courseReducer,
         universityData: universityReducer
    },
})