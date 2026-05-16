import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice.ts";
import applicationsSlice from "../pages/inspec-applications/services/applications.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  applications: applicationsSlice,
});

export default rootReducer;
