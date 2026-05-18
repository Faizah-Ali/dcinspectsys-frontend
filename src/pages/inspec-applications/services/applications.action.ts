import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  PaginatedApplicationResponse,
} from "./applications.type";
import { BASE_URL } from "../../../config";

type GetApplicationsPayload = {
  page: number;
  size: number;
};

export const getApplications = createAsyncThunk<
  PaginatedApplicationResponse,
  GetApplicationsPayload
>(
  "applications/getApplications",

  async ({ page, size }, { fulfillWithValue }) => {
    try {
      const response = await fetch(
  `${BASE_URL}/api/applications?owner=A&page=${page}&size=${size}`
)

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      return fulfillWithValue(data);

    } catch (error) {

      console.error("Error fetching applications:", error);

      return fulfillWithValue({
        content: [],
        page: 1,
        size: 20,
        totalRecords: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      });
    }
  }
);