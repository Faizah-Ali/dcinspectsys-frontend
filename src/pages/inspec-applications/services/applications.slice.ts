import { createSlice } from "@reduxjs/toolkit";
import { getApplications } from "./applications.action";
import type { ApplicationResponse } from "./applications.type";

interface ApplicationsState {
  applicationsList: ApplicationResponse[];

  loading: boolean;

  page: number;
  limit: number;

  totalRecords: number;
  totalPages: number;

  hasNext: boolean;
  hasPrevious: boolean;
}

const initialState: ApplicationsState = {
  applicationsList: [],

  loading: false,

  page: 0,
  limit: 20,

  totalRecords: 0,
  totalPages: 0,

  hasNext: false,
  hasPrevious: false,
};

const applicationsSlice = createSlice({
  name: "applications",

  initialState,

  reducers: {

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(getApplications.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getApplications.fulfilled, (state, action) => {

      state.loading = false;

      state.applicationsList = action.payload.content;

      state.page = action.payload.page;

      state.limit = action.payload.size;

      state.totalRecords = action.payload.totalRecords;

      state.totalPages = action.payload.totalPages;

      state.hasNext = action.payload.hasNext;

      state.hasPrevious = action.payload.hasPrevious;
    });

    builder.addCase(getApplications.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setPage,
  setLimit,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;