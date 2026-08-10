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

const fetchInspectionFileBlob = async (uniqueId: string): Promise<Blob> => {
  const trimmedUniqueId = uniqueId.trim();

  if (!trimmedUniqueId) {
    throw new Error("File not found.");
  }

  const query = new URLSearchParams({
    uniqueId: trimmedUniqueId,
  });

  const response = await authFetch(
    `${ENDPOINTS.DOWNLOAD_INSPECTION_FILE}?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const blob = await response.blob();

  if (blob.type === "application/pdf") {
    return blob;
  }

  return new Blob([blob], { type: "application/pdf" });
};

/** Force-download the PDF using the existing download endpoint. */
export const downloadInspectionFile = async ({
  uniqueId,
  fileName,
}: DownloadInspectionFileParams): Promise<void> => {
  const blob = await fetchInspectionFileBlob(uniqueId);
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

/** Open the PDF in a new tab for native browser print/preview. */
export const previewInspectionFile = async ({
  uniqueId,
  previewWindow,
}: Pick<DownloadInspectionFileParams, "uniqueId"> & {
  previewWindow: Window;
}): Promise<void> => {
  try {
    const blob = await fetchInspectionFileBlob(uniqueId);
    const objectUrl = URL.createObjectURL(blob);

    // Navigate the already-opened tab (opened during the click gesture)
    // so browsers do not treat this as a blocked popup.
    previewWindow.location.href = objectUrl;

    // Keep the blob URL alive long enough for the new tab to load the PDF.
    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 60_000);
  } catch (error) {
    previewWindow.close();
    throw error;
  }
};
