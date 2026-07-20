import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type { UploadHistoryItem } from "./upload-history.type";

export const getUploadHistory = async (
  diaryNo: number,
  diaryYr: number,
  signal?: AbortSignal
): Promise<UploadHistoryItem[]> => {
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

  if (!Array.isArray(data)) {
    return [];
  }

  return data as UploadHistoryItem[];
};
