import { showErrorToast, showSuccessToast } from "../../components/toast/helper";

import { deleteInspectionFile } from "./services/delete-inspection-file.action";
import {
  downloadInspectionFile,
  previewInspectionFile,
} from "./services/download-inspection-file.action";
import type { UploadHistoryItem } from "./services/upload-history.type";

export const getUploadHistoryRowKey = (
  uniqueId: string,
  fileName: string,
  entryDate: string,
  index: number
) => `${uniqueId || fileName}-${entryDate}-${index}`;

export const isDeletedUploadFile = (file: UploadHistoryItem): boolean =>
  file.fileUploadFlag === "D";

/** Compact client-side page size so history tables fit without dialog scroll. */
export const UPLOAD_HISTORY_PAGE_SIZE = 6;

/** Items-per-page choices for Upload History only (multiples of 6). */
export const UPLOAD_HISTORY_LIMIT_OPTIONS = [6, 12, 18, 24, 30, 36] as const;

export const getUploadHistoryPageCount = (totalItems: number, pageSize = UPLOAD_HISTORY_PAGE_SIZE) =>
  Math.max(1, Math.ceil(Math.max(totalItems, 0) / pageSize));

export const paginateUploadHistoryItems = <T,>(
  items: T[],
  page: number,
  pageSize = UPLOAD_HISTORY_PAGE_SIZE
): T[] => {
  const safePage = Math.min(
    Math.max(page, 0),
    Math.max(getUploadHistoryPageCount(items.length, pageSize) - 1, 0)
  );
  const start = safePage * pageSize;
  return items.slice(start, start + pageSize);
};

/**
 * Current PDF for this assignment cycle only.
 * Historical files (currentCycle !== true) must not count as uploaded.
 */
export const isCurrentCycleActiveFile = (file: UploadHistoryItem): boolean => {
  if (file.currentCycle !== true) {
    return false;
  }

  if (file.fileUploadFlag === "D") {
    return false;
  }

  // When flag is present, require active ('A'). Missing flag + currentCycle stays current.
  if (typeof file.fileUploadFlag === "string" && file.fileUploadFlag.length > 0) {
    return file.fileUploadFlag === "A";
  }

  return true;
};

export const hasCurrentCycleActivePdf = (
  uploadedFiles: UploadHistoryItem[]
): boolean => uploadedFiles.some(isCurrentCycleActiveFile);

export const handlePreviewInspectionFile =
  (
    uniqueId: string,
    previewingUniqueId: string | null,
    setPreviewingUniqueId: React.Dispatch<React.SetStateAction<string | null>>
  ) =>
  async () => {
    if (!uniqueId || previewingUniqueId) {
      return;
    }

    // Open during the click gesture so the browser does not block the popup
    // after the async PDF fetch completes.
    const previewWindow = window.open("about:blank", "_blank");

    if (!previewWindow) {
      showErrorToast(
        "Unable to open document preview. Please allow pop-ups."
      );
      return;
    }

    setPreviewingUniqueId(uniqueId);

    try {
      await previewInspectionFile({ uniqueId, previewWindow });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Unable to open document."
      );
    } finally {
      setPreviewingUniqueId(null);
    }
  };

export const handleDownloadInspectionFile =
  (
    uniqueId: string,
    fileName: string,
    downloadingUniqueId: string | null,
    setDownloadingUniqueId: React.Dispatch<React.SetStateAction<string | null>>
  ) =>
  async () => {
    if (!uniqueId || downloadingUniqueId) {
      return;
    }

    setDownloadingUniqueId(uniqueId);

    try {
      await downloadInspectionFile({ uniqueId, fileName });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Unable to download document."
      );
    } finally {
      setDownloadingUniqueId(null);
    }
  };

export const handleDeleteInspectionFile =
  (
    uniqueId: string,
    diaryNo: number,
    diaryYr: number,
    deletingUniqueId: string | null,
    setDeletingUniqueId: React.Dispatch<React.SetStateAction<string | null>>,
    setUploadedFiles: React.Dispatch<React.SetStateAction<UploadHistoryItem[]>>
  ) =>
  async () => {
    if (!uniqueId || deletingUniqueId) {
      return;
    }

    setDeletingUniqueId(uniqueId);

    try {
      const message = await deleteInspectionFile({
        uniqueId,
        diaryNo,
        diaryYr,
      });

      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.uniqueId === uniqueId
            ? { ...file, fileUploadFlag: "D" }
            : file
        )
      );

      showSuccessToast(message);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to delete inspection file"
      );
    } finally {
      setDeletingUniqueId(null);
    }
  };
