export interface SelectStaffValues {
  staffId: string;
  staffName: string;
  remarks: string;
}

export interface SelectStaffProps {
  diaryNo: number;
  diaryYr: number;
  initialAssignedName?: string | null;
  initialAssignedId?: string | null;
  onSubmit: (values: SelectStaffValues) => void | Promise<void>;
}
