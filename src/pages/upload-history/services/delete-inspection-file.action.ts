import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type {
  DeleteInspectionFileRequest,
  DeleteInspectionFileResponse,
} from "./delete-inspection-file.type";

export const deleteInspectionFile = async ({
  uniqueId,
  diaryNo,
  diaryYr,
}: DeleteInspectionFileRequest): Promise<string> => {
  const payload: DeleteInspectionFileRequest = {
    uniqueId: uniqueId.trim(),
    diaryNo,
    diaryYr,
  };

  const response = await authFetch(ENDPOINTS.DELETE_INSPECTION_FILE, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data: DeleteInspectionFileResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to delete inspection file");
  }

  if (!message) {
    throw new Error("Failed to delete inspection file");
  }

  return message;
};
