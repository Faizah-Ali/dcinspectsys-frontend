export interface CompleteApplicationRequest {
  diaryNo: number;
  diaryYr: number;
  remarks: string;
}

export interface CompleteApplicationResponse {
  message: string;
}
