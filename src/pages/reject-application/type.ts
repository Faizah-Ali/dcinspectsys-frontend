export interface RejectApplicationValues {
  reason: string;
  remarks: string;
}

export interface RejectApplicationProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: RejectApplicationValues) => void;
  onCancel: () => void;
  /**
   * Legacy REJECTID lifecycle mirror for Complete parity (userlist.jsp takeaction).
   * Called when the reason dropdown changes (clears to "") or when Other text is edited.
   * Does not affect Officer Reject submit payload construction.
   */
  onRejectIdChange?: (value: string) => void;
}

export interface RejectionReasonOption {
  value: string;
  label: string;
}
