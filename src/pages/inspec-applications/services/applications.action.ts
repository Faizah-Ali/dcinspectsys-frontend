import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  PaginatedApplicationResponse,
} from "./applications.type";
import { BASE_URL } from "../../../config";

export type GetApplicationsPayload = {
  page: number;
  size: number;
  search?: string;
  caseStatus?: string;
  applicationStatus?: string;
};

export const getApplications = createAsyncThunk<
  PaginatedApplicationResponse,
  GetApplicationsPayload
>(
  "applications/getApplications",

  async (
    { page, size, search, caseStatus, applicationStatus },
    { signal, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const trimmedSearch = search?.trim() ?? "";

      const searchQuery = trimmedSearch
        ? `&search=${encodeURIComponent(trimmedSearch)}`
        : "";

      const caseStatusQuery = `&caseStatus=${encodeURIComponent(caseStatus ?? "")}`;
      const applicationStatusQuery = `&applicationStatus=${encodeURIComponent(applicationStatus ?? "")}`;

      const response = await fetch(
        `${BASE_URL}/api/applications?owner=A&page=${page}&size=${size}${searchQuery}${caseStatusQuery}${applicationStatusQuery}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      return fulfillWithValue(data);

    } catch (error) {
      // Let aborted requests propagate as a rejection so stale results don't
      // overwrite fresh state in the component.
      if (signal.aborted || (error as Error)?.name === "AbortError") {
        return rejectWithValue("aborted");
      }

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