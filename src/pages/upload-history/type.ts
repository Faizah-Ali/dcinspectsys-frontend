export interface UploadHistoryItem {
  id: number;
  version: number;
  documentType: string;
  fileName: string;
  uploadedBy: string;
  uploadedOn: string;
  status: string;
}

export interface UploadHistoryProps {
  diaryNo: number;
  diaryYr: number;
  onClose: () => void;
}
