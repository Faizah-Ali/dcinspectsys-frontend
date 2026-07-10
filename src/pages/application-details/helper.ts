import { ENDPOINTS } from "../../common/constants/endpoint";
import { authFetch } from "../../utils/api";

import type { ApplicationResponse } from "../inspec-applications/services/applications.type";

export const getDiarySearchParams = (searchParams: URLSearchParams) => ({
  diaryNo: searchParams.get("diaryNo")?.trim() ?? "",
  diaryYear: searchParams.get("diaryYear")?.trim() ?? "",
});

export interface ApplicationDetailsFetchResult {
  applications: ApplicationResponse[];
  message?: string;
}

const normalizeApplicationDetailsResponse = (
  data: unknown
): ApplicationResponse[] => {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object") {
    return [data as ApplicationResponse];
  }

  return [];
};

const getResponseMessage = (data: unknown): string | undefined => {
  if (typeof data === "string") {
    const message = data.trim();
    return message || undefined;
  }

  if (data && typeof data === "object" && "message" in data) {
    const message = String((data as { message: unknown }).message ?? "").trim();
    return message || undefined;
  }

  return undefined;
};

const parseApplicationDetailsResponse = (
  responseText: string
): ApplicationDetailsFetchResult => {
  const trimmedText = responseText.trim();

  if (!trimmedText) {
    return { applications: [] };
  }

  try {
    const data = JSON.parse(trimmedText);
    const applications = normalizeApplicationDetailsResponse(data);

    if (applications.length > 0) {
      return { applications };
    }

    return {
      applications: [],
      message: getResponseMessage(data),
    };
  } catch {
    return {
      applications: [],
      message: trimmedText,
    };
  }
};

export const fetchApplicationDetails = async (
  diaryNo: string,
  diaryYear: string,
  signal?: AbortSignal
): Promise<ApplicationDetailsFetchResult> => {
  const query = new URLSearchParams({
    diary_no: diaryNo,
    diary_yr: diaryYear,
  });

  const response = await authFetch(
    `${ENDPOINTS.APPLICATION_DETAILS}?${query.toString()}`,
    { signal }
  );

  const responseText = await response.text();
  const trimmedText = responseText.trim();

  if (!response.ok) {
    throw new Error(trimmedText || "Failed to fetch application details");
  }

  return parseApplicationDetailsResponse(responseText);
};
