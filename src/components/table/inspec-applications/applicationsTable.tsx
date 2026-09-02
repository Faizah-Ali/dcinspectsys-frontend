import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";

import Search from "../../search";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import type { RootState } from "../../../redux/store";

import { styles } from "../../../pages/inspec-applications/style";

import {
  formatDate,
  isApplicationAssigned,
} from "./helper";

import { IMAGES } from "../../../common/constants/images";

import {
  getApplications,
} from "../../../pages/inspec-applications/services/applications.action";

import type { ApplicationResponse } from "../../../pages/inspec-applications/services/applications.type";

import { generateApplicationPDF, printApplication } from "../../../common/constants/pdfHelper";

import PaginationSection from "../../pagination";

import StatusChip from "../../status-chip";

import StatusFilter from "../../status-filter";
import { getRole } from "../../../utils/authSession.utils";

import { VARIANTS } from "../../../common/constants";

import type { AppDispatch } from "../../../redux/store";

import { useDebounce } from "../../../hooks/useDebounce";
import { useApplicationPopups } from "../../../hooks/useApplicationPopups";
import {
  ApproverProcessPopup,
  AssignPopup,
  CompletePopup,
  NoteSheetPopup,
  RejectApplicationPopup,
  SelectApproverPopup,
  UploadFilePopup,
  UploadHistoryPopup,
} from "../../popup/application";

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 10;

const SEARCH_DEBOUNCE_MS = 500;

export type ApplicationsTableProps = {
  title?: string;
  /** When set, always sent as applicationStatus and the Application Status filter is hidden. */
  fixedApplicationStatus?: string;
  /** Applications API owner filter. Defaults to "A". */
  owner?: string;
  showAssignAction?: boolean;
  showApproverActions?: boolean;
};

const parsePositiveInt = (value: string | null, fallback: number) => {

  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const ApplicationsTable = ({
  title = "E-Inspection Applications",
  fixedApplicationStatus,
  owner = "A",
  showAssignAction = true,
  showApproverActions = true,
}: ApplicationsTableProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const role = getRole();

  const [searchParams, setSearchParams] = useSearchParams();

  const loading = useSelector(
    (state: RootState) => state.applications.loading
  );

  const page = parsePositiveInt(
    searchParams.get("page"),
    DEFAULT_PAGE
  );

  const limit = parsePositiveInt(
    searchParams.get("limit"),
    DEFAULT_LIMIT
  );

  const search = searchParams.get("search") ?? "";

  const caseStatus = searchParams.get("caseStatus") ?? "";

  const applicationStatusFromUrl = searchParams.get("applicationStatus") ?? "";

  const applicationStatus = fixedApplicationStatus ?? applicationStatusFromUrl;

  const [applications, setApplications] = useState<ApplicationResponse[]>([]);

  const [totalRecords, setTotalRecords] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [searchInput, setSearchInput] = useState(search);

  const [refreshKey, setRefreshKey] = useState(0);

  // Avoid flashing "No records found" before the first fetch settles.
  const [hasFetched, setHasFetched] = useState(false);

  const {
    selectedApplication,
    selectedApproverApplication,
    selectedUploadApplication,
    selectedHistoryApplication,
    completeAction,
    selectedRejectApplication,
    selectedApproverProcessApplication,
    selectedRemarksApplication,
    handleOpenAssignPopup,
    handleCloseAssignPopup,
    handleAssignSubmit,
    handleOpenSelectApprover,
    handleCloseSelectApprover,
    handleSendToApprover,
    handleOpenUploadPopup,
    handleCloseUploadPopup,
    handleUploadSubmit,
    handleOpenHistoryPopup,
    handleCloseHistoryPopup,
    handleComplete,
    handleCloseComplete,
    handleConfirmComplete,
    handleOpenRejectPopup,
    handleCloseRejectPopup,
    handleRejectSubmit,
    handleRejectIdChange,
    handleOpenApproverProcess,
    handleCloseApproverProcess,
    handleApproverProcessSubmit,
    handleOpenRemarksPopup,
    handleCloseRemarksPopup,
  } = useApplicationPopups({
    setRefreshKey,
  });

  const debouncedSearch = useDebounce(searchInput.trim(), SEARCH_DEBOUNCE_MS);

  const showRemarksColumn =
    role === "INSPECTIONADMIN" || role === "INSPECTIONAPPROVER";
  const remarksColumnLabel =
    role === "INSPECTIONAPPROVER" ? "Dealing remarks" : "Remarks";
  const columnWidths = showRemarksColumn
    ? styles.columnWidths
    : styles.columnWidthsWithoutRemarks;
  const tableColumnCount = showRemarksColumn ? 11 : 10;

  // Keep local input in sync if URL param changes externally (e.g. back/forward).
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // When the debounced value differs from the URL `search`, push it into the URL
  // and reset to page 1. This is the *only* place a search change triggers a fetch
  // (the fetch effect below reacts to URL changes), which prevents duplicate calls.
  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(DEFAULT_PAGE));
        params.set("limit", String(limit));

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        } else {
          params.delete("search");
        }

        return params;
      },
      { replace: true }
    );
  }, [debouncedSearch, search, limit, setSearchParams]);

  // Single source of truth for fetching: react to URL params only.
  // The returned promise from a Redux Toolkit thunk exposes `abort()`, which we
  // call on cleanup so a stale in-flight request can never overwrite fresh data.
  useEffect(() => {
    const promise = dispatch(
      getApplications({
        page,
        size: limit,
        search,
        caseStatus,
        applicationStatus,
        owner,
      })
    );

    let isActive = true;

    promise
      .unwrap()
      .then((data) => {
        if (!isActive) return;
        setApplications(data.content);
        setTotalRecords(data.totalRecords);
        setTotalPages(data.totalPages);
        setHasFetched(true);
      })
      .catch(() => {
        // Aborted or failed; the slice already resets `loading` in rejected.
        // Only mark fetched for an active (non-aborted) request so the initial
        // spinner stays up until a real response arrives.
        if (!isActive) return;
        setHasFetched(true);
      });

    return () => {
      isActive = false;
      promise.abort();
    };
  }, [dispatch, page, limit, search, caseStatus, applicationStatus, owner, refreshKey]);

  const updateSearchParams = useCallback(
    (nextPage: number, nextLimit: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set("page", String(nextPage));
          params.set("limit", String(nextLimit));
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handlePageChange = (value: number) => {
    updateSearchParams(value, limit);
  };

  const handleLimitChange = (
    event: SelectChangeEvent<string>
  ) => {

    const value = Number(event.target.value);

    updateSearchParams(DEFAULT_PAGE, value);
  };

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const updateStatusFilter = useCallback(
    (param: "caseStatus" | "applicationStatus", value: string) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set("page", String(DEFAULT_PAGE));

          if (value) {
            params.set(param, value);
          } else {
            params.delete(param);
          }

          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleCaseStatusChange = (event: SelectChangeEvent<string>) => {
    updateStatusFilter("caseStatus", event.target.value);
  };

  const handleApplicationStatusChange = (
    event: SelectChangeEvent<string>
  ) => {
    updateStatusFilter("applicationStatus", event.target.value);
  };

  return (
    <Box sx={styles.tableContainer}>

      <Box component="h2" sx={styles.tableHeading}>
        {title}
      </Box>

      <Box sx={styles.toolbar}>
        <Search
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by Diary no, Case no, Case title, Remarks, Party-In-Person ID..."
          containerSx={styles.searchToolbar}
        />

        <Box sx={styles.filters}>
          <StatusFilter
            label="Case Status"
            kind="case"
            value={caseStatus}
            onChange={handleCaseStatusChange}
            sx={styles.statusFilter}
          />
          {!fixedApplicationStatus && (
            <StatusFilter
              label="Application Status"
              kind="application"
              value={applicationStatusFromUrl}
              onChange={handleApplicationStatusChange}
              sx={styles.statusFilter}
            />
          )}
        </Box>
      </Box>

      <Box sx={styles.tableSection}>

        <TableContainer component={Paper} sx={styles.tableWrapper}>

          <Table size="small" sx={styles.table}>
            <colgroup>
              {columnWidths.map((width, colIndex) => (
                <col key={colIndex} style={{ width }} />
              ))}
            </colgroup>

            <TableHead>

              <TableRow sx={styles.headerRow}>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.srlNoCell }}>
                  SRL No.
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.pwdCatCell }}>
                  PWD Cat.
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.partyIdCell }}>
                  Party-In-Person ID
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.referenceNoCell }}>
                  Reference No.
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.caseNoCell }}>
                  Case No.
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.caseStatusCell }}>
                  Case Status
                </TableCell>

                {showRemarksColumn && (
                  <TableCell align="center" sx={{ ...styles.headerCell, ...styles.remarksCell }}>
                    {remarksColumnLabel}
                  </TableCell>
                )}

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.applicationDateCell }}>
                  Application Date 
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.applicationStatusCell }}>
                  Application Status
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.courtFeeCell }}>
                  Court Fee ID
                </TableCell>

                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.actionsCell }}>
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {(!hasFetched || loading) && applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tableColumnCount} sx={styles.placeholderCell}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              )}

              {hasFetched && !loading && applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tableColumnCount} sx={styles.placeholderCell}>
                    No records found.
                  </TableCell>
                </TableRow>
              )}

              {applications.map((row, index) => (

                <TableRow
                  key={`${row.diaryNo}-${index}`}
                  sx={styles.dataRow}
                >

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.srlNoCell }}>
                    {(page - 1) * limit + index + 1}
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.pwdCatCell }}>
                    N/A
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.partyIdCell }}>
                    {row.username}
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.referenceNoCell }}>
                    {row.diaryNo}/{row.diaryYr}
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.caseNoCell }}>
                    <Box>
                      <strong>
                        {row.casetype}-{row.regNo}/{row.regYr}
                      </strong>
                      <br />
                      {row.caseTitle}
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.caseStatusCell }}>
                    <StatusChip
                      statusCode={row.caseStatus}
                      kind="case"
                      variant={VARIANTS.OUTLINED}
                    />
                  </TableCell>

                  {showRemarksColumn && (
                    <TableCell align="center" sx={{ ...styles.dataCell, ...styles.remarksCell }}>
                      <Box sx={styles.actionButtons}>
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title="Dealing remarks"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenRemarksPopup(row);
                          }}
                        >
                          <IMAGES.TextSnippetIcon sx={styles.actionIcon} />
                        </Box>
                      </Box>
                    </TableCell>
                  )}

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.applicationDateCell }}>
                    {formatDate(row.appliedDate)}
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.applicationStatusCell }}>
                    <StatusChip
                      statusCode={row.status}
                      kind="application"
                      variant={VARIANTS.OUTLINED}
                    />
                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.courtFeeCell }}>

                    <Box>

                      <strong>
                        {row.ecourtFeeId || "Not Entered"}
                      </strong>

                      <br />

                      {row.courtFeeAmount && (
                        <>
                          (Value = {row.courtFeeAmount})
                          <br />
                        </>
                      )}

                      {row.ecourtMessage && (
                        <>
                          Status : {row.ecourtMessage}
                          <br />
                        </>
                      )}

                      {row.courtFeeReason && (
                        <>
                          Reason: {row.courtFeeReason}
                        </>
                      )}

                    </Box>

                  </TableCell>

                  <TableCell align="center" sx={{ ...styles.dataCell, ...styles.actionsCell }}>

                    <Box sx={styles.actionButtons}>

                      <Box
                        component="button"
                        type="button"
                        sx={styles.orangeIcon}
                        title="Download PDF"
                        onClick={(event) => {
                          event.currentTarget.blur();
                          generateApplicationPDF(row);
                        }}
                      >
                        <IMAGES.PictureAsPdfIcon
                          sx={styles.actionIcon}
                        />
                      </Box>

                      <Box
                        component="button"
                        type="button"
                        sx={styles.blueIcon}
                        title="Print"
                        onClick={(event) => {
                          event.currentTarget.blur();
                          printApplication(row);
                        }}
                      >
                        <IMAGES.PrintIcon
                          sx={styles.actionIcon}
                        />
                      </Box>

                      {showAssignAction && role === "INSPECTIONADMIN" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title={
                            isApplicationAssigned(row)
                              ? "Re-assign"
                              : "Assign"
                          }
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenAssignPopup(row);
                          }}
                        >
                          {isApplicationAssigned(row) ? (
                            <IMAGES.AssignmentTurnedInIcon
                              sx={styles.actionIcon}
                            />
                          ) : (
                            <IMAGES.AssignmentAddIcon
                              sx={styles.actionIcon}
                            />
                          )}
                        </Box>
                      )}

                      {role === "ONLINEINSPECTION" && row.status === "N" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title="Send to Approver"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenSelectApprover(row);
                          }}
                        >
                          <IMAGES.AssignmentIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                      {role === "ONLINEINSPECTION" && row.status === "P" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title="Upload File"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenUploadPopup(row);
                          }}
                        >
                          <IMAGES.UploadFileSharpIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                      {role === "ONLINEINSPECTION" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.blueIcon}
                          title="Upload History"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenHistoryPopup(row);
                          }}
                        >
                          <IMAGES.WorkHistorySharpIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                      {role === "ONLINEINSPECTION" && row.status === "P" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title="Complete Application"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleComplete(row);
                          }}
                        >
                          <IMAGES.ApproveIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                      {role === "ONLINEINSPECTION" &&
                        (row.status === "P" || row.status === "K") && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.blueIcon}
                          title="Reject Application"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenRejectPopup(row);
                          }}
                        >
                          <IMAGES.RejectIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                      {showApproverActions &&
                        role === "INSPECTIONAPPROVER" &&
                        row.status === "T" && (
                        <Box
                          component="button"
                          type="button"
                          sx={styles.orangeIcon}
                          title="Process Application"
                          onClick={(event) => {
                            event.currentTarget.blur();
                            handleOpenApproverProcess(row);
                          }}
                        >
                          {/* TODO: Replace with dedicated process icon when available */}
                          <IMAGES.AssignmentIcon sx={styles.actionIcon} />
                        </Box>
                      )}

                    </Box>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

        {loading && applications.length > 0 && (
          <Box sx={styles.loadingOverlay}>
            <CircularProgress size={28} />
          </Box>
        )}

      </Box>

      <PaginationSection
        listData={{
          totalItems: totalRecords,
          currentPage: page,
        }}
        handleChangePage={handlePageChange}
        handleChangeLimit={handleLimitChange}
        currentLimit={limit}
      />

      <Box sx={styles.recordsSummary}>
        Total Records: {totalRecords}
        {" | "}
        Total Pages: {totalPages}
      </Box>

      <AssignPopup
        application={selectedApplication}
        onClose={handleCloseAssignPopup}
        onSubmit={handleAssignSubmit}
      />

      <SelectApproverPopup
        application={selectedApproverApplication}
        onClose={handleCloseSelectApprover}
        onSubmit={handleSendToApprover}
      />

      <UploadFilePopup
        application={selectedUploadApplication}
        onClose={handleCloseUploadPopup}
        onSubmit={handleUploadSubmit}
      />

      <UploadHistoryPopup
        application={selectedHistoryApplication}
        onClose={handleCloseHistoryPopup}
      />

      <CompletePopup
        application={completeAction}
        onClose={handleCloseComplete}
        onConfirm={handleConfirmComplete}
      />

      <RejectApplicationPopup
        application={selectedRejectApplication}
        onClose={handleCloseRejectPopup}
        onSubmit={handleRejectSubmit}
        onRejectIdChange={handleRejectIdChange}
      />

      <ApproverProcessPopup
        application={selectedApproverProcessApplication}
        onClose={handleCloseApproverProcess}
        onSubmit={handleApproverProcessSubmit}
      />

      <NoteSheetPopup
        application={selectedRemarksApplication}
        onClose={handleCloseRemarksPopup}
      />

    </Box>
  );
};

export default ApplicationsTable;
