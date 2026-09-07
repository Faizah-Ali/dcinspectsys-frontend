import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { IMAGES, VARIANTS } from "../../common/constants";
import PaginationSection from "../../components/pagination";
import Popup from "../../components/popup";
import { ConfirmPopUp } from "../../components/popup/confimation";
import ReferenceNoBanner from "../../components/reference-no-banner";
import { showErrorToast } from "../../components/toast/helper";
import { formatDate } from "../../components/table/inspec-applications/helper";
import { styles as applicationDetailsStyles } from "../application-details/style";

import {
  getUploadHistoryPageCount,
  getUploadHistoryRowKey,
  handleDeleteInspectionFile,
  handleDownloadInspectionFile,
  handlePreviewInspectionFile,
  isDeletedUploadFile,
  paginateUploadHistoryItems,
  UPLOAD_HISTORY_LIMIT_OPTIONS,
  UPLOAD_HISTORY_PAGE_SIZE,
} from "./helper";
import { getUploadHistory } from "./services/upload-history.action";
import type {
  InspectionLogItem,
  UploadHistoryItem,
  UserCommentItem,
} from "./services/upload-history.type";
import { styles } from "./style";
import type { UploadHistoryProps } from "./type";

type HistoryTab = "comments" | "log" | "files";

const TAB_OPTIONS: Array<{ value: HistoryTab; label: string }> = [
  { value: "comments", label: "User Comments" },
  { value: "log", label: "Activity Log" },
  { value: "files", label: "Uploaded Files" },
];

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
  const [activeTab, setActiveTab] = useState<HistoryTab>("comments");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(UPLOAD_HISTORY_PAGE_SIZE);
  const [previewingUniqueId, setPreviewingUniqueId] = useState<string | null>(
    null
  );
  const [downloadingUniqueId, setDownloadingUniqueId] = useState<string | null>(
    null
  );
  const [deletingUniqueId, setDeletingUniqueId] = useState<string | null>(null);
  const [pendingDeleteUniqueId, setPendingDeleteUniqueId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setUploadedFiles([]);
    setInspectionLogs([]);
    setUserComments([]);
    setActiveTab("comments");
    setPage(1);
    setLimit(UPLOAD_HISTORY_PAGE_SIZE);

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

  const activeItemsCount = useMemo(() => {
    if (activeTab === "comments") {
      return userComments.length;
    }

    if (activeTab === "log") {
      return inspectionLogs.length;
    }

    return uploadedFiles.length;
  }, [activeTab, userComments.length, inspectionLogs.length, uploadedFiles.length]);

  const pageCount = getUploadHistoryPageCount(activeItemsCount, limit);
  const safePage = Math.min(Math.max(page, 1), pageCount);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const pagedComments = paginateUploadHistoryItems(
    userComments,
    safePage - 1,
    limit
  );
  const pagedLogs = paginateUploadHistoryItems(
    inspectionLogs,
    safePage - 1,
    limit
  );
  const pagedFiles = paginateUploadHistoryItems(
    uploadedFiles,
    safePage - 1,
    limit
  );

  const handleTabChange = (
    _event: React.SyntheticEvent,
    nextTab: HistoryTab
  ) => {
    setActiveTab(nextTab);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const renderPagination = () => (
    <Box sx={styles.paginationWrap}>
      <PaginationSection
        listData={{
          totalItems: activeItemsCount,
          currentPage: safePage,
        }}
        handleChangePage={handlePageChange}
        handleChangeLimit={handleLimitChange}
        currentLimit={limit}
        limitOptions={[...UPLOAD_HISTORY_LIMIT_OPTIONS]}
        externalStyles={styles.paginationExternal}
      />
    </Box>
  );

  const renderComments = () => {
    if (userComments.length === 0) {
      return (
        <>
          <Box component="p" sx={styles.emptyState}>
            No user comments available.
          </Box>
          {renderPagination()}
        </>
      );
    }

    return (
      <>
        <Box sx={styles.tableShell}>
          <Table sx={styles.table}>
            <colgroup>
              {styles.commentsColumnWidths.map((width, colIndex) => (
                <col key={colIndex} style={{ width }} />
              ))}
            </colgroup>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                <TableCell align="center" sx={styles.headerCell}>
                  Date
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Author
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Comment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedComments.map((comment, index) => (
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
                  <TableCell
                    align="center"
                    sx={styles.dataCell}
                    title={comment.content}
                  >
                    <Box component="span" sx={styles.descriptionText}>
                      {comment.content}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {renderPagination()}
      </>
    );
  };

  const renderLogs = () => {
    if (inspectionLogs.length === 0) {
      return (
        <>
          <Box component="p" sx={styles.emptyState}>
            No activity log available.
          </Box>
          {renderPagination()}
        </>
      );
    }

    return (
      <>
        <Box sx={styles.tableShell}>
          <Table sx={styles.table}>
            <colgroup>
              {styles.logsColumnWidths.map((width, colIndex) => (
                <col key={colIndex} style={{ width }} />
              ))}
            </colgroup>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                <TableCell align="center" sx={styles.headerCell}>
                  Date
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Description
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Actor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedLogs.map((log, index) => (
                <TableRow
                  key={`${log.entryDate}-${log.actor}-${index}`}
                  sx={styles.dataRow}
                >
                  <TableCell align="center" sx={styles.dataCell}>
                    {formatDate(log.entryDate)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={styles.dataCell}
                    title={log.description}
                  >
                    <Box component="span" sx={styles.descriptionText}>
                      {log.description}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={styles.dataCell}>
                    {log.actor}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {renderPagination()}
      </>
    );
  };

  const renderUploadedFiles = () => {
    if (uploadedFiles.length === 0) {
      return (
        <>
          <Box component="p" sx={styles.emptyState}>
            No uploaded files available.
          </Box>
          {renderPagination()}
        </>
      );
    }

    return (
      <>
        <Box sx={styles.tableShell}>
          <Table sx={styles.table}>
            <colgroup>
              {styles.uploadedFilesColumnWidths.map((width, colIndex) => (
                <col key={colIndex} style={{ width }} />
              ))}
            </colgroup>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                <TableCell align="center" sx={styles.headerCell}>
                  File Name
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Email
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Mobile
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Uploaded By
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Uploaded On
                </TableCell>
                <TableCell align="center" sx={styles.headerCell}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedFiles.map((item, index) => {
                const uniqueId = item.uniqueId?.trim() ?? "";
                const isDeleted = isDeletedUploadFile(item);
                const isOld = item.currentCycle === false && !isDeleted;
                const isPreviewing = previewingUniqueId === uniqueId;
                const isDownloading = downloadingUniqueId === uniqueId;
                const isDeleting = deletingUniqueId === uniqueId;
                const canAccessFile = Boolean(uniqueId);
                const canPreviewOrDownload = canAccessFile;
                const canDeleteByStatus = applicationStatus === "P";
                const canDelete =
                  canAccessFile && !isDeleted && canDeleteByStatus;
                const absoluteIndex = (safePage - 1) * limit + index;

                return (
                  <TableRow
                    key={getUploadHistoryRowKey(
                      item.uniqueId,
                      item.fileName,
                      item.entryDate,
                      absoluteIndex
                    )}
                    sx={isDeleted ? styles.deletedDataRow : styles.dataRow}
                  >
                    <TableCell align="center" sx={styles.dataCell}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          flexWrap: "wrap" as const,
                        }}
                      >
                        <Box component="span">{item.fileName}</Box>
                        {isOld ? (
                          <Box component="span" sx={styles.oldChip}>
                            Old
                          </Box>
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={styles.dataCell}>
                      {item.emailId}
                    </TableCell>
                    <TableCell align="center" sx={styles.dataCell}>
                      {item.mobileNo}
                    </TableCell>
                    <TableCell align="center" sx={styles.dataCell}>
                      {item.entryBy}
                    </TableCell>
                    <TableCell align="center" sx={styles.dataCell}>
                      {formatDate(item.entryDate)}
                    </TableCell>
                    <TableCell align="center" sx={styles.dataCell}>
                      <Box sx={styles.actionButtonsWrap}>
                        <Box sx={styles.actionIconSlot}>
                          {canPreviewOrDownload ? (
                            <Box
                              component="button"
                              type="button"
                              title="Download PDF"
                              aria-label="Download PDF"
                              disabled={Boolean(downloadingUniqueId)}
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
                                ...styles.actionIconButton,
                                ...(Boolean(downloadingUniqueId) && {
                                  opacity: 0.4,
                                  pointerEvents: "none",
                                }),
                              }}
                            >
                              {isDownloading ? (
                                <CircularProgress size={14} color="inherit" />
                              ) : (
                                <IMAGES.PictureAsPdfIcon
                                  sx={applicationDetailsStyles.actionIcon}
                                />
                              )}
                            </Box>
                          ) : null}
                        </Box>

                        <Box sx={styles.actionIconSlot}>
                          {canPreviewOrDownload ? (
                            <Box
                              component="button"
                              type="button"
                              title="Print Preview"
                              aria-label="Print Preview"
                              disabled={Boolean(previewingUniqueId)}
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
                                ...styles.actionIconButton,
                                ...(Boolean(previewingUniqueId) && {
                                  opacity: 0.4,
                                  pointerEvents: "none",
                                }),
                              }}
                            >
                              {isPreviewing ? (
                                <CircularProgress size={14} color="inherit" />
                              ) : (
                                <IMAGES.PrintIcon
                                  sx={applicationDetailsStyles.actionIcon}
                                />
                              )}
                            </Box>
                          ) : null}
                        </Box>

                        <Box sx={styles.actionDeleteSlot}>
                          {isDeleted ? (
                            <Box component="span" sx={styles.deletedChip}>
                              Deleted
                            </Box>
                          ) : (
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
                                if (!canDelete || deletingUniqueId) {
                                  return;
                                }
                                setPendingDeleteUniqueId(uniqueId);
                              }}
                              sx={{
                                ...applicationDetailsStyles.orangeIcon,
                                ...styles.actionIconButton,
                                ...((!canDelete ||
                                  Boolean(deletingUniqueId)) && {
                                  opacity: 0.4,
                                  pointerEvents: "none",
                                }),
                              }}
                            >
                              {isDeleting ? (
                                <CircularProgress size={14} color="inherit" />
                              ) : (
                                <DeleteIcon
                                  sx={applicationDetailsStyles.actionIcon}
                                />
                              )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {renderPagination()}
      </>
    );
  };

  return (
    <Box sx={styles.pageShell}>
      <ReferenceNoBanner diaryNo={diaryNo} diaryYr={diaryYr} />

      {isLoading ? (
        <Box sx={styles.loadingWrap}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={styles.tabs}
          >
            {TAB_OPTIONS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Box sx={styles.sectionPanel}>
            {activeTab === "comments" && renderComments()}
            {activeTab === "log" && renderLogs()}
            {activeTab === "files" && renderUploadedFiles()}
          </Box>
        </>
      )}

      <Box sx={styles.footerActions}>
        <Button
          type="button"
          variant={VARIANTS.CONTAINED}
          onClick={onClose}
          sx={styles.closeButton}
        >
          Close
        </Button>
      </Box>

      <Popup
        open={Boolean(pendingDeleteUniqueId)}
        onClose={
          deletingUniqueId
            ? () => undefined
            : () => setPendingDeleteUniqueId(null)
        }
        maxWidth="xs"
        hideHeader
      >
        <ConfirmPopUp
          message="Are you sure you want to delete this file?"
          handleNo={() => setPendingDeleteUniqueId(null)}
          handleYes={() => {
            if (!pendingDeleteUniqueId || deletingUniqueId) {
              return;
            }

            const uniqueId = pendingDeleteUniqueId;
            setPendingDeleteUniqueId(null);

            void handleDeleteInspectionFile(
              uniqueId,
              diaryNo,
              diaryYr,
              deletingUniqueId,
              setDeletingUniqueId,
              setUploadedFiles
            )();
          }}
          disabled={Boolean(deletingUniqueId)}
        />
      </Popup>
    </Box>
  );
};

export default UploadHistory;
