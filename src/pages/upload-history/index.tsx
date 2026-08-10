import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import { IMAGES, VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";
import { formatDate } from "../../components/table/inspec-applications/helper";
import { styles as applicationDetailsStyles } from "../application-details/style";

import {
  getUploadHistoryRowKey,
  handleDeleteInspectionFile,
  handleDownloadInspectionFile,
  handlePreviewInspectionFile,
  isDeletedUploadFile,
} from "./helper";
import { getUploadHistory } from "./services/upload-history.action";
import type {
  InspectionLogItem,
  UploadHistoryItem,
  UserCommentItem,
} from "./services/upload-history.type";
import { styles } from "./style";
import type { UploadHistoryProps } from "./type";

const UploadHistory = ({
  diaryNo,
  diaryYr,
  applicationStatus,
  onClose,
}: UploadHistoryProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadHistoryItem[]>([]);
  const [inspectionLogs, setInspectionLogs] = useState<InspectionLogItem[]>([]);
  const [userComments, setUserComments] = useState<UserCommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewingUniqueId, setPreviewingUniqueId] = useState<string | null>(
    null
  );
  const [downloadingUniqueId, setDownloadingUniqueId] = useState<string | null>(
    null
  );
  const [deletingUniqueId, setDeletingUniqueId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setUploadedFiles([]);
    setInspectionLogs([]);
    setUserComments([]);

    getUploadHistory(diaryNo, diaryYr, controller.signal)
      .then((data) => {
        setUploadedFiles(data.uploadedFiles);
        setInspectionLogs(data.inspectionLogs);
        setUserComments(data.userComments);
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setUploadedFiles([]);
        setInspectionLogs([]);
        setUserComments([]);
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to fetch upload history"
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [diaryNo, diaryYr]);

  return (
    <Box sx={styles.container}>
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      {isLoading ? (
        <Box sx={styles.loadingWrap}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <Box sx={styles.accordionsWrap}>

          <Accordion sx={styles.accordion} disableGutters defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={styles.accordionSummary}
            >
              User Comments
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
              {userComments.length === 0 ? (
                <Box component="p" sx={styles.accordionEmptyText}>
                  No comments found
                </Box>
              ) : (
                <TableContainer component={Paper} sx={styles.tableWrapper}>
                  <Table sx={styles.table}>
                    <TableHead>
                      <TableRow sx={styles.headerRow}>
                        <TableCell align="center" sx={styles.headerCell}>Date</TableCell>
                        <TableCell align="center" sx={styles.headerCell}>Author</TableCell>
                        <TableCell align="center" sx={styles.headerCell}>Comment</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {userComments.map((comment, index) => (
                        <TableRow
                          key={`${comment.author}-${comment.commentDate}-${index}`}
                          sx={styles.dataRow}
                        >
                          <TableCell align="center" sx={styles.dataCell}>
                            {formatDate(comment.commentDate)}
                          </TableCell>
                          <TableCell align="center" sx={styles.dataCell}>
                            {comment.author}
                          </TableCell>
                          <TableCell align="center" sx={styles.dataCell}>
                            {comment.content}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion sx={styles.accordion} disableGutters defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={styles.accordionSummary}
            >
              Log
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
              {inspectionLogs.length === 0 ? (
                <Box component="p" sx={styles.accordionEmptyText}>
                  No logs found
                </Box>
              ) : (
                <TableContainer component={Paper} sx={styles.tableWrapper}>
                  <Table sx={styles.table}>
                    <TableHead>
                      <TableRow sx={styles.headerRow}>
                        <TableCell align="center" sx={styles.headerCell}>Date</TableCell>
                        <TableCell align="center" sx={styles.headerCell}>
                          Description
                        </TableCell>
                        <TableCell align="center" sx={styles.headerCell}>Actor</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {inspectionLogs.map((log, index) => (
                        <TableRow
                          key={`${log.entryDate}-${log.actor}-${index}`}
                          sx={styles.dataRow}
                        >
                          <TableCell align="center" sx={styles.dataCell}>
                            {formatDate(log.entryDate)}
                          </TableCell>
                          <TableCell align="center" sx={styles.dataCell}>
                            {log.description}
                          </TableCell>
                          <TableCell align="center" sx={styles.dataCell}>
                            {log.actor}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion sx={styles.accordion} disableGutters defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={styles.accordionSummary}
            >
              Summary of Uploaded Files
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
              {uploadedFiles.length === 0 ? (
                <Box component="p" sx={styles.accordionEmptyText}>
                  No upload history found.
                </Box>
              ) : (
                <TableContainer component={Paper} sx={styles.tableWrapper}>
                  <Table sx={styles.table}>
                    <colgroup>
                      {styles.uploadedFilesColumnWidths.map((width, colIndex) => (
                        <col key={colIndex} style={{ width }} />
                      ))}
                    </colgroup>
                    <TableHead>
                      <TableRow sx={styles.headerRow}>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.fileNameCell }}
                        >
                          File Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.emailCell }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.mobileCell }}
                        >
                          Mobile
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.uploadedByCell }}
                        >
                          Uploaded By
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.uploadedOnCell }}
                        >
                          Uploaded On
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...styles.headerCell, ...styles.actionCell }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {uploadedFiles.map((item, index) => {
                        const uniqueId = item.uniqueId?.trim() ?? "";
                        const isDeleted = isDeletedUploadFile(item);
                        const isPreviewing = previewingUniqueId === uniqueId;
                        const isDownloading = downloadingUniqueId === uniqueId;
                        const isDeleting = deletingUniqueId === uniqueId;
                        const canAccessFile = Boolean(uniqueId);
                        const canDeleteByStatus = applicationStatus === "P";
                        const canDelete =
                          canAccessFile && !isDeleted && canDeleteByStatus;

                        return (
                          <TableRow
                            key={getUploadHistoryRowKey(
                              item.uniqueId,
                              item.fileName,
                              item.entryDate,
                              index
                            )}
                            sx={
                              isDeleted ? styles.deletedDataRow : styles.dataRow
                            }
                          >
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.fileNameCell }}
                            >
                              {item.fileName}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.emailCell }}
                            >
                              {item.emailId}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.mobileCell }}
                            >
                              {item.mobileNo}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.uploadedByCell }}
                            >
                              {item.entryBy}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.uploadedOnCell }}
                            >
                              {formatDate(item.entryDate)}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ ...styles.dataCell, ...styles.actionCell }}
                            >
                              <Box sx={styles.actionButtonsWrap}>
                                <Box
                                  component="button"
                                  type="button"
                                  title="Download PDF"
                                  aria-label="Download PDF"
                                  disabled={
                                    !canAccessFile ||
                                    Boolean(downloadingUniqueId)
                                  }
                                  onClick={(event) => {
                                    event.currentTarget.blur();
                                    void handleDownloadInspectionFile(
                                      uniqueId,
                                      item.fileName,
                                      downloadingUniqueId,
                                      setDownloadingUniqueId
                                    )();
                                  }}
                                  sx={{
                                    ...applicationDetailsStyles.orangeIcon,
                                    ...((!canAccessFile ||
                                      Boolean(downloadingUniqueId)) && {
                                      opacity: 0.4,
                                      pointerEvents: "none",
                                    }),
                                  }}
                                >
                                  {isDownloading ? (
                                    <CircularProgress
                                      size={16}
                                      color="inherit"
                                    />
                                  ) : (
                                    <IMAGES.PictureAsPdfIcon
                                      sx={applicationDetailsStyles.actionIcon}
                                    />
                                  )}
                                </Box>

                                <Box
                                  component="button"
                                  type="button"
                                  title="Print Preview"
                                  aria-label="Print Preview"
                                  disabled={
                                    !canAccessFile || Boolean(previewingUniqueId)
                                  }
                                  onClick={(event) => {
                                    event.currentTarget.blur();
                                    void handlePreviewInspectionFile(
                                      uniqueId,
                                      previewingUniqueId,
                                      setPreviewingUniqueId
                                    )();
                                  }}
                                  sx={{
                                    ...applicationDetailsStyles.blueIcon,
                                    ...((!canAccessFile ||
                                      Boolean(previewingUniqueId)) && {
                                      opacity: 0.4,
                                      pointerEvents: "none",
                                    }),
                                  }}
                                >
                                  {isPreviewing ? (
                                    <CircularProgress
                                      size={16}
                                      color="inherit"
                                    />
                                  ) : (
                                    <IMAGES.PrintIcon
                                      sx={applicationDetailsStyles.actionIcon}
                                    />
                                  )}
                                </Box>

                                {isDeleted ? (
                                  <Box sx={styles.actionDeletedSlot}>
                                    <Box
                                      component="span"
                                      sx={styles.deletedChip}
                                    >
                                      Deleted
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box sx={styles.actionDeleteSlot}>
                                    <Box
                                      component="button"
                                      type="button"
                                      title={
                                        canDeleteByStatus
                                          ? "Delete file"
                                          : "Delete is only available when application status is Pending"
                                      }
                                      aria-label="Delete"
                                      disabled={
                                        !canDelete || Boolean(deletingUniqueId)
                                      }
                                      onClick={(event) => {
                                        event.currentTarget.blur();
                                        void handleDeleteInspectionFile(
                                          uniqueId,
                                          diaryNo,
                                          diaryYr,
                                          deletingUniqueId,
                                          setDeletingUniqueId,
                                          setUploadedFiles
                                        )();
                                      }}
                                      sx={{
                                        ...applicationDetailsStyles.orangeIcon,
                                        ...((!canDelete ||
                                          Boolean(deletingUniqueId)) && {
                                          opacity: 0.4,
                                          pointerEvents: "none",
                                        }),
                                      }}
                                    >
                                      {isDeleting ? (
                                        <CircularProgress
                                          size={16}
                                          color="inherit"
                                        />
                                      ) : (
                                        <DeleteIcon
                                          sx={applicationDetailsStyles.actionIcon}
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>

        </Box>
      )}

      <Box sx={styles.actionsWrap}>
        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={onClose}
          sx={styles.closeButton}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default UploadHistory;
