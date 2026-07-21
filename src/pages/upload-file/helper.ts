import type { SelectChangeEvent } from "@mui/material";

import { showErrorToast } from "../../components/toast/helper";

import type { DocumentTypeOption, UploadFileValues } from "./type";

export const DOCUMENT_TYPE_OPTIONS: DocumentTypeOption[] = [
  { value: "Inspection Report", label: "Inspection Report" },
  { value: "Order Sheet", label: "Order Sheet" },
  { value: "Case File", label: "Case File" },
  { value: "Annexure", label: "Annexure" },
  { value: "Other", label: "Other" },
];

export const MAX_UPLOAD_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const isPdfFile = (file: File) =>
  file.type === "application/pdf" ||
  file.name.toLowerCase().endsWith(".pdf");

export const isUploadEnabled = (documentType: string, files: File[]) =>
  Boolean(documentType) && files.length > 0;

export const getFileIdentity = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

export const validateSelectedFiles = (files: File[]): string | null => {
  if (!files.length) {
    return "Please select a PDF file";
  }

  for (const file of files) {
    if (!isPdfFile(file)) {
      return "Only PDF files are allowed";
    }

    if (file.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
      return "File size must be 10 MB or less";
    }
  }

  return null;
};

export const handleDocumentTypeChange =
  (setDocumentType: React.Dispatch<React.SetStateAction<string>>) =>
  (event: SelectChangeEvent<string>) => {
    setDocumentType(event.target.value);
  };

// MUI Select does not fire onChange when the selected item is clicked
// again, so clearing is handled via MenuItem onClick.
export const handleDocumentTypeToggle =
  (
    documentType: string,
    optionValue: string,
    setDocumentType: React.Dispatch<React.SetStateAction<string>>
  ) =>
  () => {
    if (documentType === optionValue) {
      setDocumentType("");
    }
  };

export const handleFileChange =
  (setFiles: React.Dispatch<React.SetStateAction<File[]>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) {
      return;
    }

    const validationError = validateSelectedFiles(selectedFiles);

    if (validationError) {
      showErrorToast(validationError);
      event.target.value = "";
      return;
    }

    setFiles((prevFiles) => {
      const existingIdentities = new Set(prevFiles.map(getFileIdentity));
      const nextFiles = [...prevFiles];

      selectedFiles.forEach((file) => {
        const identity = getFileIdentity(file);

        if (!existingIdentities.has(identity)) {
          existingIdentities.add(identity);
          nextFiles.push(file);
        }
      });

      return nextFiles;
    });

    event.target.value = "";
  };

export const handleRemoveFile =
  (
    fileToRemove: File,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) =>
  () => {
    const identity = getFileIdentity(fileToRemove);

    setFiles((prevFiles) =>
      prevFiles.filter((file) => getFileIdentity(file) !== identity)
    );
  };

export const handleChooseFileClick =
  (fileInputRef: React.RefObject<HTMLInputElement | null>) => () => {
    fileInputRef.current?.click();
  };

export const handleSubmit =
  (
    documentType: string,
    files: File[],
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (values: UploadFileValues) => void | Promise<void>
  ) =>
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateSelectedFiles(files);

    if (validationError) {
      showErrorToast(validationError);
      return;
    }

    if (!isUploadEnabled(documentType, files)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        documentType,
        files,
      });
    } catch {
      setIsSubmitting(false);
    }
  };
