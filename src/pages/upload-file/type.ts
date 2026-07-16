export interface UploadFileValues {
  documentType: string;
  file: File | null;
}

export interface UploadFileProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: UploadFileValues) => void;
  onCancel: () => void;
}

export interface DocumentTypeOption {
  value: string;
  label: string;
}
