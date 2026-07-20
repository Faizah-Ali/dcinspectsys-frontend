import { useEffect, useState } from "react";
import {
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

import { VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";
import { formatDate } from "../../components/table/inspec-applications/helper";

import {
  getUploadHistoryRowKey,
  handleDownloadInspectionFile,
} from "./helper";
import { getUploadHistory } from "./services/upload-history.action";
import type { UploadHistoryItem } from "./services/upload-history.type";
import { styles } from "./style";
import type { UploadHistoryProps } from "./type";

const UploadHistory = ({ diaryNo, diaryYr, onClose }: UploadHistoryProps) => {
  const [history, setHistory] = useState<UploadHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingUniqueId, setDownloadingUniqueId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setHistory([]);

    getUploadHistory(diaryNo, diaryYr, controller.signal)
      .then((data) => {
        setHistory(data);
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setHistory([]);
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
      ) : history.length === 0 ? (
        <Box component="p" sx={styles.emptyText}>
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
                <TableCell sx={styles.headerCell}>Uploaded By</TableCell>
                <TableCell sx={styles.headerCell}>Uploaded On</TableCell>
                <TableCell sx={styles.headerCell}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {history.map((item, index) => {
                const isDownloading = downloadingUniqueId === item.uniqueId;

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
                    <TableCell sx={styles.dataCell}>{item.fileName}</TableCell>
                    <TableCell sx={styles.dataCell}>{item.emailId}</TableCell>
                    <TableCell sx={styles.dataCell}>{item.mobileNo}</TableCell>
                    <TableCell sx={styles.dataCell}>{item.entryBy}</TableCell>
                    <TableCell sx={styles.dataCell}>
                      {formatDate(item.entryDate)}
                    </TableCell>
                    <TableCell sx={styles.dataCell}>
                      <Button
                        type="button"
                        variant={VARIANTS.OUTLINED}
                        disabled={!item.uniqueId || Boolean(downloadingUniqueId)}
                        onClick={handleDownloadInspectionFile(
                          item.uniqueId,
                          item.fileName,
                          downloadingUniqueId,
                          setDownloadingUniqueId
                        )}
                        sx={styles.viewButton}
                      >
                        {isDownloading ? (
                          <CircularProgress size={16} color="inherit" />
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
