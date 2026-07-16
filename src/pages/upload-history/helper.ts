import { showSuccessToast } from "../../components/toast/helper";

import type { UploadHistoryItem } from "./type";

export const MOCK_UPLOAD_HISTORY: UploadHistoryItem[] = [
  {
    id: 1,
    version: 1,
    documentType: "Inspection Report",
    fileName: "inspection_v1.pdf",
    uploadedBy: "Rahul Sharma",
    uploadedOn: "16-Jul-2026 11:30 AM",
    status: "Uploaded",
  },
  {
    id: 2,
    version: 2,
    documentType: "Order Sheet",
    fileName: "order_sheet.pdf",
    uploadedBy: "Rahul Sharma",
    uploadedOn: "16-Jul-2026 12:05 PM",
    status: "Uploaded",
  },
  {
    id: 3,
    version: 3,
    documentType: "Annexure",
    fileName: "annexure.pdf",
    uploadedBy: "Rahul Sharma",
    uploadedOn: "16-Jul-2026 01:15 PM",
    status: "Uploaded",
  },
];

export const handleView = (file: string) => {
  console.log(file);
  showSuccessToast("Opening file (UI Demo)");
};
