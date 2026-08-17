import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type {
  UploadHistoryItem,
  UploadHistoryResponse,
} from "./upload-history.type";

const EMPTY_UPLOAD_HISTORY_RESPONSE: UploadHistoryResponse = {
  uploadedFiles: [],
  inspectionLogs: [],
  userComments: [],
};

const normalizeUploadHistoryItem = (item: unknown): UploadHistoryItem | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const raw = item as Record<string, unknown>;
  const fileUploadFlag =
    typeof raw.fileUploadFlag === "string"
      ? raw.fileUploadFlag
      : typeof raw.file_upload_flag === "string"
        ? raw.file_upload_flag
        : undefined;

  const currentCycle =
    typeof raw.currentCycle === "boolean"
      ? raw.currentCycle
      : typeof raw.current_cycle === "boolean"
        ? raw.current_cycle
        : undefined;

  return {
    ...(raw as unknown as UploadHistoryItem),
    fileUploadFlag,
    currentCycle,
  };
};
const normalizeUploadedFiles = (uploadedFiles: unknown): UploadHistoryItem[] => {
  if (!Array.isArray(uploadedFiles)) {
    return [];
  }

  return uploadedFiles
    .map(normalizeUploadHistoryItem)
    .filter((item): item is UploadHistoryItem => item !== null);
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
    uploadedFiles: normalizeUploadedFiles(uploadHistory.uploadedFiles),
    inspectionLogs: Array.isArray(uploadHistory.inspectionLogs)
      ? uploadHistory.inspectionLogs
      : [],
    userComments: Array.isArray(uploadHistory.userComments)
      ? uploadHistory.userComments
      : [],
  };
};
