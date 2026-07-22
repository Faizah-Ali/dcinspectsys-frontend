import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type { UploadHistoryResponse } from "./upload-history.type";

const EMPTY_UPLOAD_HISTORY_RESPONSE: UploadHistoryResponse = {
  uploadedFiles: [],
  inspectionLogs: [],
  userComments: [],
};

export const getUploadHistory = async (
  diaryNo: number,
  diaryYr: number,
  signal?: AbortSignal
): Promise<UploadHistoryResponse> => {
  const query = new URLSearchParams({
    diaryNo: String(diaryNo),
    diaryYr: String(diaryYr),
  });

  const response = await authFetch(
    `${ENDPOINTS.UPLOAD_HISTORY}?${query.toString()}`,
    { signal }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message ?? "").trim()
        : "";

    throw new Error(message || "Failed to fetch upload history");
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return EMPTY_UPLOAD_HISTORY_RESPONSE;
  }

  const uploadHistory = data as Partial<UploadHistoryResponse>;

  return {
    uploadedFiles: Array.isArray(uploadHistory.uploadedFiles)
      ? uploadHistory.uploadedFiles
      : [],
    inspectionLogs: Array.isArray(uploadHistory.inspectionLogs)
      ? uploadHistory.inspectionLogs
      : [],
    userComments: Array.isArray(uploadHistory.userComments)
      ? uploadHistory.userComments
      : [],
  };
};
