import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type {
  CompleteApplicationRequest,
  CompleteApplicationResponse,
} from "./complete-application.type";

export const completeApplication = async (
  diaryNo: number,
  diaryYr: number,
  remarks: string
): Promise<string> => {
  const payload: CompleteApplicationRequest = {
    diaryNo,
    diaryYr,
    remarks: remarks.trim(),
  };

  const response = await authFetch(ENDPOINTS.COMPLETE_APPLICATION, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data: CompleteApplicationResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to complete application");
  }

  if (!message) {
    throw new Error("Failed to complete application");
  }

  return message;
};
