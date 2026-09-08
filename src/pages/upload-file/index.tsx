import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PORTFOLIO_TO_PDF_CONVERSION_URL, VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import SearchableSelect from "../../components/searchable-select";
import { getUploadHistory } from "../upload-history/services/upload-history.action";
import type { UploadHistoryItem } from "../upload-history/services/upload-history.type";
import {
  hasCurrentCycleActivePdf,
  isCurrentCycleActiveFile,
  isDeletedUploadFile,
} from "../upload-history/helper";

import {
  DOCUMENT_TYPE_OPTIONS,
  getFileIdentity,
  handleChooseFileClick,
  handleDocumentTypeChange,
  handleFileChange,
  handleRemoveFile,
  handleSubmit,
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

  const hasCurrentPdf = hasCurrentCycleActivePdf(uploadedFiles);

  const handleOpenPortfolioConversion = () => {
    window.open(
      PORTFOLIO_TO_PDF_CONVERSION_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

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
    <Box sx={styles.pageShell}>
      <Box
        component="form"
        onSubmit={handleSubmit(documentType, files, setIsSubmitting, onSubmit)}
        sx={styles.uploadForm}
      >
        <ReferenceNoBanner diaryNo={diaryNo} diaryYr={diaryYr} />

        <Box sx={styles.section}>
          <Box component="p" sx={styles.sectionEyebrow}>
            Document Details
          </Box>
          <Box sx={styles.fieldSection}>
            <Box
              component="label"
              htmlFor="upload-document-type"
              sx={styles.fieldLabel}
            >
              Document Type
            </Box>

            <SearchableSelect
              id="upload-document-type"
              value={documentType}
              options={DOCUMENT_TYPE_OPTIONS}
              onChange={handleDocumentTypeChange(setDocumentType)}
              placeholder="Select Document"
              disabled={isSubmitting}
              sx={styles.documentTypeSelect}
            />
          </Box>
        </Box>

        <Box sx={styles.section}>
          <Box component="p" sx={styles.sectionEyebrow}>
            Upload Document
          </Box>

          <Box sx={styles.uploadPanel}>
            <Box sx={styles.uploadPanelCopy}>
              <Box
                component="label"
                htmlFor="upload-pdf-file"
                sx={styles.uploadPanelTitle}
              >
                Select PDF files
              </Box>
              <Box component="p" sx={styles.uploadPanelHint}>
                PDF format only
              </Box>
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
          </Box>
        </Box>

        <Box sx={styles.fileListsRow}>
          <Box sx={styles.filePanel}>
            <Box component="p" sx={styles.filePanelTitle}>
              Selected Files
            </Box>
            <Box sx={styles.filePanelBody}>
              {files.length === 0 ? (
                <Box component="span" sx={styles.emptyFileName}>
                  No file selected
                </Box>
              ) : (
                files.map((file) => (
                  <Box key={getFileIdentity(file)} sx={styles.selectedFileRow}>
                    <Box component="span" sx={styles.selectedFileName}>
                      ✔ {file.name}
                    </Box>
                    <IconButton
                      type="button"
                      size="small"
                      aria-label={`Remove ${file.name}`}
                      disabled={isSubmitting}
                      onClick={handleRemoveFile(file, setFiles)}
                      sx={styles.removeFileButton}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          <Box sx={styles.filePanel}>
            <Box component="p" sx={styles.filePanelTitle}>
              Uploaded Files
            </Box>
            <Box sx={styles.filePanelBody}>
              {isLoadingUploadedFiles ? (
                <CircularProgress size={18} />
              ) : uploadedFiles.length === 0 ? (
                <Box component="span" sx={styles.emptyFileName}>
                  No files uploaded yet
                </Box>
              ) : (
                <>
                  {!hasCurrentPdf && (
                    <Box component="span" sx={styles.emptyFileName}>
                      No current PDF uploaded
                    </Box>
                  )}

                  {uploadedFiles.map((item, index) => {
                    const isDeleted = isDeletedUploadFile(item);
                    const isCurrent = isCurrentCycleActiveFile(item);

                    return (
                      <Box
                        key={`${item.uniqueId || item.fileName}-${index}`}
                        component="span"
                        sx={
                          isDeleted || !isCurrent
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
                        ) : isCurrent ? (
                          <>✔ {item.fileName}</>
                        ) : (
                          <>
                            {item.fileName} -{" "}
                            <Box component="span" sx={styles.deletedLabel}>
                              {/* Historical */}
                              Old
                            </Box>
                          </>
                        )}
                      </Box>
                    );
                  })}
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={styles.portfolioSection}>
          <Box component="p" sx={styles.portfolioPrompt}>
            PDF Portfolio?
          </Box>
          <Box
            component="button"
            type="button"
            onClick={handleOpenPortfolioConversion}
            sx={styles.portfolioConversionLink}
          >
            Convert Portfolio to PDF →
          </Box>
        </Box>

        <Box sx={styles.footerActions}>
          <Button
            type="button"
            variant={VARIANTS.OUTLINED}
            onClick={onCancel}
            disabled={isSubmitting}
            sx={styles.uploadCancelButton}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting}
            sx={styles.uploadSubmitButton}
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Upload"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadFile;
