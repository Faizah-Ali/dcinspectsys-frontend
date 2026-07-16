export interface SendForApprovalRequest {
  diaryNo: number;
  diaryYr: number;
  approverId: string;
  approverName: string;
  remarks: string;
}

export interface SendForApprovalResponse {
  message: string;
}
