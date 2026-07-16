export interface ApproverProcessValues {
  remarks: string;
  forwardTo: string;
  action: "APPROVE" | "REJECT" | "FORWARD";
}

export interface ApproverProcessProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: ApproverProcessValues) => void | Promise<void>;
  onCancel: () => void;
}

export interface ForwardUser {
  id: string;
  name: string;
}
