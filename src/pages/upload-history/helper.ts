import { showErrorToast } from "../../components/toast/helper";

import { downloadInspectionFile } from "./services/download-inspection-file.action";

export const getUploadHistoryRowKey = (
  uniqueId: string,
  fileName: string,
  entryDate: string,
  index: number
) => `${uniqueId || fileName}-${entryDate}-${index}`;

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
