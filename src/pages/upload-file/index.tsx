import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";

import {
  DOCUMENT_TYPE_OPTIONS,
  getSelectedFileName,
  handleChooseFileClick,
  handleDocumentTypeChange,
  handleFileChange,
  handleSubmit,
  isUploadEnabled,
} from "./helper";
import { styles } from "./style";
import type { UploadFileProps } from "./type";

const UploadFile = ({
  diaryNo,
  diaryYr,
  onSubmit,
  onCancel,
}: UploadFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const selectedFileName = getSelectedFileName(file);
  const canUpload = isUploadEnabled(documentType, file);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(documentType, file, onSubmit)}
      sx={styles.form}
    >
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      <Box sx={styles.fieldSection}>
        <Box component="label" htmlFor="upload-document-type" sx={styles.fieldLabel}>
          Document Type *
        </Box>

        <FormControl fullWidth>
          <Select
            id="upload-document-type"
            value={documentType}
            onChange={handleDocumentTypeChange(setDocumentType)}
            displayEmpty
            sx={styles.documentTypeSelect}
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Box component="span" sx={styles.placeholderText}>
                    Select Document
                  </Box>
                );
              }

              return selectedValue;
            }}
          >
            {DOCUMENT_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={styles.filePickerSection}>
        <Box component="label" htmlFor="upload-pdf-file" sx={styles.fieldLabel}>
          Upload PDF *
        </Box>

        <input
          ref={fileInputRef}
          id="upload-pdf-file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange(setFile)}
          style={styles.hiddenFileInput}
        />

        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={handleChooseFileClick(fileInputRef)}
          sx={styles.chooseFileButton}
        >
          Choose File
        </Button>

        <Box sx={styles.selectedFileWrap}>
          <Box component="span" sx={styles.selectedFileLabel}>
            Selected File:
          </Box>
          <Box
            component="span"
            sx={file ? styles.selectedFileName : styles.emptyFileName}
          >
            {selectedFileName}
          </Box>
        </Box>
      </Box>

      <Box sx={styles.actionsWrap}>
        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={onCancel}
          sx={styles.cancelButton}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant={VARIANTS.CONTAINED}
          disabled={!canUpload}
          sx={styles.submitButton}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default UploadFile;
