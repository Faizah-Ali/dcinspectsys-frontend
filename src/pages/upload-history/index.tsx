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

import { VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";
import { formatDate } from "../../components/table/inspec-applications/helper";

import {
  getUploadHistoryRowKey,
  handleDownloadInspectionFile,
} from "./helper";
import { getUploadHistory } from "./services/upload-history.action";
import type {
  InspectionLogItem,
  UploadHistoryItem,
  UserCommentItem,
} from "./services/upload-history.type";
import { styles } from "./style";
import type { UploadHistoryProps } from "./type";

const UploadHistory = ({ diaryNo, diaryYr, onClose }: UploadHistoryProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadHistoryItem[]>([]);
  const [inspectionLogs, setInspectionLogs] = useState<InspectionLogItem[]>([]);
  const [userComments, setUserComments] = useState<UserCommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingUniqueId, setDownloadingUniqueId] = useState<string | null>(
    null
  );

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
                        <TableCell sx={styles.headerCell}>Date</TableCell>
                        <TableCell sx={styles.headerCell}>Author</TableCell>
                        <TableCell sx={styles.headerCell}>Comment</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {userComments.map((comment, index) => (
                        <TableRow
                          key={`${comment.author}-${comment.commentDate}-${index}`}
                          sx={styles.dataRow}
                        >
                          <TableCell sx={styles.dataCell}>
                            {formatDate(comment.commentDate)}
                          </TableCell>
                          <TableCell sx={styles.dataCell}>
                            {comment.author}
                          </TableCell>
                          <TableCell sx={styles.dataCell}>
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
                        <TableCell sx={styles.headerCell}>Date</TableCell>
                        <TableCell sx={styles.headerCell}>
                          Description
                        </TableCell>
                        <TableCell sx={styles.headerCell}>Actor</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {inspectionLogs.map((log, index) => (
                        <TableRow
                          key={`${log.entryDate}-${log.actor}-${index}`}
                          sx={styles.dataRow}
                        >
                          <TableCell sx={styles.dataCell}>
                            {formatDate(log.entryDate)}
                          </TableCell>
                          <TableCell sx={styles.dataCell}>
                            {log.description}
                          </TableCell>
                          <TableCell sx={styles.dataCell}>
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
                    <TableHead>
                      <TableRow sx={styles.headerRow}>
                        <TableCell sx={styles.headerCell}>File Name</TableCell>
                        <TableCell sx={styles.headerCell}>Email</TableCell>
                        <TableCell sx={styles.headerCell}>Mobile</TableCell>
                        <TableCell sx={styles.headerCell}>
                          Uploaded By
                        </TableCell>
                        <TableCell sx={styles.headerCell}>
                          Uploaded On
                        </TableCell>
                        <TableCell sx={styles.headerCell}>Action</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {uploadedFiles.map((item, index) => {
                        const isDownloading =
                          downloadingUniqueId === item.uniqueId;

                        return (
                          <TableRow
                            key={getUploadHistoryRowKey(
                              item.uniqueId,
                              item.fileName,
                              item.entryDate,
                              index
                            )}
                            sx={styles.dataRow}
                          >
                            <TableCell sx={styles.dataCell}>
                              {item.fileName}
                            </TableCell>
                            <TableCell sx={styles.dataCell}>
                              {item.emailId}
                            </TableCell>
                            <TableCell sx={styles.dataCell}>
                              {item.mobileNo}
                            </TableCell>
                            <TableCell sx={styles.dataCell}>
                              {item.entryBy}
                            </TableCell>
                            <TableCell sx={styles.dataCell}>
                              {formatDate(item.entryDate)}
                            </TableCell>
                            <TableCell sx={styles.dataCell}>
                              <Button
                                type="button"
                                variant={VARIANTS.OUTLINED}
                                disabled={
                                  !item.uniqueId ||
                                  Boolean(downloadingUniqueId)
                                }
                                onClick={handleDownloadInspectionFile(
                                  item.uniqueId,
                                  item.fileName,
                                  downloadingUniqueId,
                                  setDownloadingUniqueId
                                )}
                                sx={styles.viewButton}
                              >
                                {isDownloading ? (
                                  <CircularProgress
                                    size={16}
                                    color="inherit"
                                  />
                                ) : (
                                  "Download"
                                )}
                              </Button>
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
