import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import countryReducer from "./slices/countrySlice";
import courseReducer from "./slices/courseSlice";
import universityReducer from "./slices/universitySlice";
import courseSearchReducer from "./slices/courseSearchSlice";
import germanProgramReducer from "./slices/germanProgramSlice";
import findCourseReducer from "./slices/findCourseDBSlice";
import studentReducer from "./slices/studentSlice";




export const store = configureStore({
    reducer:{
        auth:authReducer,
         studentData: studentReducer,
        countryData:countryReducer,
         courseData: courseReducer,
         universityData: universityReducer,
         courseSearch: courseSearchReducer,
          germanProgramData: germanProgramReducer,
          findCourse: findCourseReducer
        
    },
})