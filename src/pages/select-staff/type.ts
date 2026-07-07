export interface SelectStaffValues {
  staffId: string;
  remarks: string;
}

export interface SelectStaffProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: SelectStaffValues) => void;
}
