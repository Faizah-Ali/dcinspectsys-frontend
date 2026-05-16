export interface ApplicationResponse {
  username: string;
  casetype: string;
  regNo: number;
  regYr: number;
  diaryNo: number;
  diaryYr: number;
  remarks: string | null;
  ecourtFeeId: string;
  caseTitle: string;
  appliedDate: string;
  status: string;

  caseStatus: string | null;
  ecourtMessage: string | null;
  courtFeeAmount: string | null;
  courtFeeReason: string | null;
}

export interface PaginatedApplicationResponse {
  content: ApplicationResponse[];
  page: number;
  size: number;
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}