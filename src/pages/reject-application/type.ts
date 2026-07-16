export interface RejectApplicationValues {
  reason: string;
  remarks: string;
}

export interface RejectApplicationProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: RejectApplicationValues) => void;
  onCancel: () => void;
}

export interface RejectionReasonOption {
  value: string;
  label: string;
}
