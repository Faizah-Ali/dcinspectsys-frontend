export interface UploadInspectionFileParams {
  files: File[];
  diaryNo: number;
  diaryYr: number;
}

export interface UploadInspectionFileResponse {
  message: string;
}
