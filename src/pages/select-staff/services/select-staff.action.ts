import { createAsyncThunk } from "@reduxjs/toolkit";

import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type { Approver } from "./select-staff.type";

export const getApproversList = createAsyncThunk<Approver[]>(
  "selectStaff/getApproversList",

  async (_, { signal, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authFetch(ENDPOINTS.APPROVERS_LIST, { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch approvers list");
      }

      const data = await response.json();

      return fulfillWithValue(Array.isArray(data) ? data : []);
    } catch (error) {
      if (signal.aborted || (error as Error)?.name === "AbortError") {
        return rejectWithValue("aborted");
      }

      console.error("Error fetching approvers list:", error);

      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch approvers list"
      );
    }
  }
);
