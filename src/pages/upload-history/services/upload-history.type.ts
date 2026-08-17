export interface UploadHistoryItem {
  uniqueId: string;
  emailId: string;
  fileName: string;
  diaryNo: number;
  diaryYr: number;
  mobileNo: string;
  entryDate: string;
  entryBy: string;
  fileUploadFlag?: string;
  /** True when the file belongs to the current assignment/upload cycle. */
  currentCycle?: boolean;
}

export interface InspectionLogItem {
  entryDate: string;
  description: string;
  actor: string;
}

export interface UserCommentItem {
  content: string;
  author: string;
  commentDate: string;
}

export interface UploadHistoryResponse {
  uploadedFiles: UploadHistoryItem[];
  inspectionLogs: InspectionLogItem[];
  userComments: UserCommentItem[];
}
