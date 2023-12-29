import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/userReducer";
import college from "./reducers/collegeReducer";
import department from "./reducers/departmentReducer";
import student from "./reducers/studentReducer";
import faculty from "./reducers/facultyReducer";
import facultyInCharge from "./reducers/facultyInChargeReducer";
import research from "./reducers/researchReducer";
import favorite from "./reducers/favoriteReducer";
import feedback from "./reducers/feedbackReducer";
import course from "./reducers/courseReducer";
import theme from "./reducers/themeReducer";

export default configureStore({
  reducer: {
    theme,
    user,
    course,
    college,
    department,
    student,
    faculty,
    facultyInCharge,
    research,
    favorite,
    feedback,
  },
});
