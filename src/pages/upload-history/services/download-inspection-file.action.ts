import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type { DownloadInspectionFileParams } from "./download-inspection-file.type";

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message ?? "").trim()
        : "";

    if (message) {
      return message;
    }
  } catch {
    // Fall through to status-based defaults.
  }

  if (response.status === 404) {
    return "File not found.";
  }

  return "Unable to download document.";
};

export const downloadInspectionFile = async ({
  uniqueId,
  fileName,
}: DownloadInspectionFileParams): Promise<void> => {
  if (!uniqueId?.trim()) {
    throw new Error("File not found.");
  }

  const query = new URLSearchParams({
    uniqueId: uniqueId.trim(),
  });

  const response = await authFetch(
    `${ENDPOINTS.DOWNLOAD_INSPECTION_FILE}?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName || "inspection-file.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};
