import { createSlice } from "@reduxjs/toolkit";

import { getApproversList } from "./select-staff.action";
import type { Approver } from "./select-staff.type";

interface SelectStaffState {
  approvers: Approver[];
  loading: boolean;
}

const initialState: SelectStaffState = {
  approvers: [],
  loading: false,
};

const selectStaffSlice = createSlice({
  name: "selectStaff",

  initialState,

  reducers: {
    resetSelectStaffState: (state) => {
      state.approvers = [];
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getApproversList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getApproversList.fulfilled, (state, action) => {
      state.loading = false;
      state.approvers = action.payload;
    });

    builder.addCase(getApproversList.rejected, (state, action) => {
      state.loading = false;

      if (action.payload !== "aborted") {
        state.approvers = [];
      }
    });
  },
});

export const { resetSelectStaffState } = selectStaffSlice.actions;

export default selectStaffSlice.reducer;
