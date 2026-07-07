import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice.ts";
import applicationsSlice from "../pages/inspec-applications/services/applications.slice";
import loginSlice from "../pages/login/services/login.slice";
import selectStaffSlice from "../pages/select-staff/services/select-staff.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  applications: applicationsSlice,
  login: loginSlice,
  selectStaff: selectStaffSlice,
});

export default rootReducer;
