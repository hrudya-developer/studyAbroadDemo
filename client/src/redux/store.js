import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import countryReducer from "./slices/countrySlice";
import courseReducer from "./slices/courseSlice";
import universityReducer from "./slices/universitySlice";
import courseSearchReducer from "./slices/courseSearchSlice";
import germanProgramReducer from "./slices/germanProgramSlice";
import findCourseReducer from "./slices/findCourseDBSlice";
<<<<<<< HEAD
import studentReducer from "./slices/studentSlice";
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e




export const store = configureStore({
    reducer:{
        auth:authReducer,
<<<<<<< HEAD
         studentData: studentReducer,
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        countryData:countryReducer,
         courseData: courseReducer,
         universityData: universityReducer,
         courseSearch: courseSearchReducer,
          germanProgramData: germanProgramReducer,
          findCourse: findCourseReducer
        
    },
})