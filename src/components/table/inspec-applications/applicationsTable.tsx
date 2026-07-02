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
  formatDate
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

import { VARIANTS } from "../../../common/constants";

import type { AppDispatch } from "../../../redux/store";

import { useDebounce } from "../../../hooks/useDebounce";

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 10;

const SEARCH_DEBOUNCE_MS = 500;

const parsePositiveInt = (value: string | null, fallback: number) => {

  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const ApplicationsTable = () => {

  const dispatch = useDispatch<AppDispatch>();

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

  const applicationStatus = searchParams.get("applicationStatus") ?? "";

  const [applications, setApplications] = useState<ApplicationResponse[]>([]);

  const [totalRecords, setTotalRecords] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput.trim(), SEARCH_DEBOUNCE_MS);

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
      })
      .catch(() => {
        // Aborted or failed; the slice already resets `loading` in rejected.
      });

    return () => {
      isActive = false;
      promise.abort();
    };
  }, [dispatch, page, limit, search, caseStatus, applicationStatus]);

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
        E-Inspection Applications
      </Box>

      <Box sx={styles.toolbar}>
        <Search
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by username, case no, diary no, case title..."
          containerSx={{ marginBottom: 0, justifyContent: "flex-start" }}
        />

        <Box sx={styles.filters}>
          <StatusFilter
            label="Case Status"
            value={caseStatus}
            onChange={handleCaseStatusChange}
            sx={styles.statusFilter}
          />
          <StatusFilter
            label="Application Status"
            value={applicationStatus}
            onChange={handleApplicationStatusChange}
            sx={styles.statusFilter}
          />
        </Box>
      </Box>

      <Box sx={styles.tableSection}>

        <TableContainer component={Paper} sx={styles.tableWrapper}>

          <Table sx={styles.table}>

            <TableHead>

              <TableRow sx={styles.headerRow}>

                <TableCell sx={styles.headerCell}>
                  SRL No.
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  PWD Cat.
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Party-In-Person ID
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Reference No.
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Case No.
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Case Status
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Remarks
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Application Date 
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Application Status
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Court Fee ID
                </TableCell>

                <TableCell sx={styles.headerCell}>
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {loading && applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} sx={styles.placeholderCell}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              )}

              {!loading && applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} sx={styles.placeholderCell}>
                    No records found.
                  </TableCell>
                </TableRow>
              )}

              {applications.map((row, index) => (

                <TableRow
                  key={`${row.diaryNo}-${index}`}
                  sx={styles.dataRow}
                >

                  <TableCell sx={styles.dataCell}>
                    {(page - 1) * limit + index + 1}
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    N/A
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    {row.username}
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    {row.diaryNo}/{row.diaryYr}
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    <Box>
                      <strong>
                        {row.casetype}-{row.regNo}/{row.regYr}
                      </strong>
                      <br />
                      {row.caseTitle}
                    </Box>
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    <StatusChip
                      statusCode={row.caseStatus}
                      variant={VARIANTS.FILLED}
                    />
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    {row.remarks ? (
                      <Box
                        component="span"
                        sx={styles.remarksLink}
                      >
                      </Box>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    {formatDate(row.appliedDate)}
                  </TableCell>

                  <TableCell sx={styles.dataCell}>
                    <StatusChip
                      statusCode={row.status}
                      variant={VARIANTS.OUTLINED}
                    />
                  </TableCell>

                  <TableCell sx={styles.dataCell}>

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

                  <TableCell sx={styles.dataCell}>

                    <Box sx={styles.actionButtons}>

                      <Box
                        component="button"
                        type="button"
                        sx={styles.assignButton}
                        title="Download"
                        onClick={(event) => {
                          event.currentTarget.blur();
                          generateApplicationPDF(row);
                        }}
                      >
                        <IMAGES.DownloadIcon
                          sx={styles.actionIcon}
                        />
                      </Box>

                      <Box
                        component="button"
                        type="button"
                        sx={styles.printButton}
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

                      <Box
                        component="button"
                        type="button"
                        sx={styles.assignButton}
                        title="Assign"
                        onClick={(event) => event.currentTarget.blur()}
                      >
                        <IMAGES.AssignmentIcon
                          sx={styles.actionIcon}
                        />
                      </Box>

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

    </Box>
  );
};

export default ApplicationsTable;