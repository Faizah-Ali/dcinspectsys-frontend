import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice.ts";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
