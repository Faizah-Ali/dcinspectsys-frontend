import { useEffect, useRef, useState } from "react";
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
import { getUploadHistory } from "../upload-history/services/upload-history.action";
import type { UploadHistoryItem } from "../upload-history/services/upload-history.type";

import {
  DOCUMENT_TYPE_OPTIONS,
  getFileIdentity,
  handleChooseFileClick,
  handleDocumentTypeChange,
  handleDocumentTypeToggle,
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadHistoryItem[]>([]);
  const [isLoadingUploadedFiles, setIsLoadingUploadedFiles] = useState(true);

  const canUpload = isUploadEnabled(documentType, files);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingUploadedFiles(true);
    setUploadedFiles([]);

    getUploadHistory(diaryNo, diaryYr, controller.signal)
      .then((data) => {
        setUploadedFiles(data.uploadedFiles);
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setUploadedFiles([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingUploadedFiles(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [diaryNo, diaryYr]);

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
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={handleDocumentTypeToggle(
                  documentType,
                  option.value,
                  setDocumentType
                )}
              >
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

        <Box sx={styles.fileListsRow}>
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
                  sx={styles.selectedFileRow}
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

          <Box sx={styles.uploadedFilesSection}>
            <Box component="span" sx={styles.selectedFileLabel}>
              Uploaded File{uploadedFiles.length === 1 ? "" : "s"}:
            </Box>

            {isLoadingUploadedFiles ? (
              <CircularProgress size={18} />
            ) : uploadedFiles.length === 0 ? (
              <Box component="span" sx={styles.emptyFileName}>
                No files uploaded yet
              </Box>
            ) : (
              uploadedFiles.map((item, index) => {
                const isDeleted = item.fileUploadFlag === "D";

                return (
                  <Box
                    key={`${item.uniqueId || item.fileName}-${index}`}
                    component="span"
                    sx={
                      isDeleted
                        ? styles.deletedUploadedFileName
                        : styles.selectedFileName
                    }
                  >
                    {isDeleted ? (
                      <>
                        ✕ {item.fileName} -{" "}
                        <Box component="span" sx={styles.deletedLabel}>
                          Deleted
                        </Box>
                      </>
                    ) : (
                      <>✔ {item.fileName}</>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
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
