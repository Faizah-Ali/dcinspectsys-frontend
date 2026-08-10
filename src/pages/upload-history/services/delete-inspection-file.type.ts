export interface DeleteInspectionFileRequest {
  uniqueId: string;
  diaryNo: number;
  diaryYr: number;
}

export interface DeleteInspectionFileResponse {
  message: string;
}
