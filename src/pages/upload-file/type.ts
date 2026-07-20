export interface UploadFileValues {
  documentType: string;
  files: File[];
}

export interface UploadFileProps {
  diaryNo: number;
  diaryYr: number;
  onSubmit: (values: UploadFileValues) => void | Promise<void>;
  onCancel: () => void;
}

export interface DocumentTypeOption {
  value: string;
  label: string;
}
