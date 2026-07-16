import type { SelectChangeEvent } from "@mui/material";

import type { DocumentTypeOption, UploadFileValues } from "./type";

export const DOCUMENT_TYPE_OPTIONS: DocumentTypeOption[] = [
  { value: "Inspection Report", label: "Inspection Report" },
  { value: "Order Sheet", label: "Order Sheet" },
  { value: "Case File", label: "Case File" },
  { value: "Annexure", label: "Annexure" },
  { value: "Other", label: "Other" },
];

export const isUploadEnabled = (documentType: string, file: File | null) =>
  Boolean(documentType) && file !== null;

export const getSelectedFileName = (file: File | null) =>
  file?.name ?? "No file selected";

export const handleDocumentTypeChange =
  (setDocumentType: React.Dispatch<React.SetStateAction<string>>) =>
  (event: SelectChangeEvent<string>) => {
    setDocumentType(event.target.value);
  };

export const handleFileChange =
  (setFile: React.Dispatch<React.SetStateAction<File | null>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    setFile(isPdf ? selectedFile : null);
    event.target.value = "";
  };

export const handleChooseFileClick =
  (fileInputRef: React.RefObject<HTMLInputElement | null>) => () => {
    fileInputRef.current?.click();
  };

export const handleSubmit =
  (
    documentType: string,
    file: File | null,
    onSubmit: (values: UploadFileValues) => void
  ) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUploadEnabled(documentType, file)) {
      return;
    }

    onSubmit({
      documentType,
      file,
    });
  };
