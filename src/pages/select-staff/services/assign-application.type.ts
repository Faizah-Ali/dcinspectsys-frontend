export interface AssignApplicationRequest {
  diaryNo: number;
  diaryYr: number;
  assigned: string;
  assignedname: string;
  remarks: string;
}

export interface AssignApplicationResponse {
  message: string;
}
