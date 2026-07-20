import { useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { VARIANTS } from "../../common/constants";

import {
  DOCUMENT_TYPE_OPTIONS,
  getFileIdentity,
  handleChooseFileClick,
  handleDocumentTypeChange,
  handleFileChange,
  handleRemoveFile,
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
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canUpload = isUploadEnabled(documentType, files);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(documentType, files, setIsSubmitting, onSubmit)}
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
            disabled={isSubmitting}
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
          multiple
          accept=".pdf"
          onChange={handleFileChange(setFiles)}
          disabled={isSubmitting}
          style={styles.hiddenFileInput}
        />

        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={handleChooseFileClick(fileInputRef)}
          disabled={isSubmitting}
          sx={styles.chooseFileButton}
        >
          Choose File
        </Button>

        <Box sx={styles.selectedFileWrap}>
          <Box component="span" sx={styles.selectedFileLabel}>
            Selected File{files.length === 1 ? "" : "s"}:
          </Box>

          {files.length === 0 ? (
            <Box component="span" sx={styles.emptyFileName}>
              No file selected
            </Box>
          ) : (
            files.map((file) => (
              <Box
                key={getFileIdentity(file)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Box component="span" sx={styles.selectedFileName}>
                  ✔ {file.name}
                </Box>
                <IconButton
                  type="button"
                  size="small"
                  aria-label={`Remove ${file.name}`}
                  disabled={isSubmitting}
                  onClick={handleRemoveFile(file, setFiles)}
                  sx={{ padding: "2px" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Box sx={styles.actionsWrap}>
        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={onCancel}
          disabled={isSubmitting}
          sx={styles.cancelButton}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant={VARIANTS.CONTAINED}
          disabled={!canUpload || isSubmitting}
          sx={styles.submitButton}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Upload"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadFile;
