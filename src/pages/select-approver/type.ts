export interface SelectApproverValues {
  approverId: string;
  approverName: string;
  remarks: string;
}

export interface SelectApproverProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: SelectApproverValues) => void | Promise<void>;
  onCancel: () => void;
}
