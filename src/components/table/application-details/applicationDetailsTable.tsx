import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Paths } from "../../../common/constants";
import { styles } from "../../../pages/application-details/style";
import {
  fetchApplicationDetails,
  getDiarySearchParams,
} from "../../../pages/application-details/helper";
import type { ApplicationResponse } from "../../../pages/inspec-applications/services/applications.type";
import { generateApplicationPDF, printApplication } from "../../../common/constants/pdfHelper";
import { IMAGES, VARIANTS } from "../../../common/constants";

import Popup from "../../popup";
import SelectStaff from "../../../pages/select-staff";
import type { SelectStaffValues } from "../../../pages/select-staff/type";
import { handleAssignApplicationSubmit } from "../../../pages/select-staff/services/assign-application.helper";
import StatusChip from "../../status-chip";
import { showErrorToast } from "../../toast/helper";
import {
  formatDate,
  isApplicationAssigned,
} from "../inspec-applications/helper";

const TABLE_COLUMN_COUNT = 11;

const ApplicationDetailsTable = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { diaryNo, diaryYear } = getDiarySearchParams(searchParams);

  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationResponse | null>(null);

  useEffect(() => {
    if (!diaryNo || !diaryYear) {
      setApplications([]);
      setEmptyMessage("");
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    const loadApplicationDetails = async () => {
      setLoading(true);

      try {
        const { applications: data, message } = await fetchApplicationDetails(
          diaryNo,
          diaryYear,
          controller.signal
        );

        if (isActive) {
          setApplications(data);
          setEmptyMessage(message ?? "");
        }
      } catch (error) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        setApplications([]);
        setEmptyMessage("");
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to fetch application details"
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadApplicationDetails();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [diaryNo, diaryYear]);

  const handleOpenAssignPopup = (application: ApplicationResponse) => {
    setSelectedApplication(application);
  };

  const handleCloseAssignPopup = () => {
    setSelectedApplication(null);
  };

  const handleBackToReassign = () => {
    const params = new URLSearchParams();

    if (diaryNo) {
      params.set("diaryNo", diaryNo);
    }

    if (diaryYear) {
      params.set("diaryYear", diaryYear);
    }

    const query = params.toString();

    navigate(
      `${Paths.REASSIGN_APPLICATIONS}${query ? `?${query}` : ""}`
    );
  };

  const handleAssignSubmit = async (values: SelectStaffValues) => {
    try {
      await handleAssignApplicationSubmit({
        application: selectedApplication,
        values,
        onClose: handleCloseAssignPopup,
        onSuccess: (updatedFields) => {
          if (!selectedApplication) {
            return;
          }

          setApplications((prevApplications) =>
            prevApplications.map((application) =>
              application.diaryNo === selectedApplication.diaryNo &&
              application.diaryYr === selectedApplication.diaryYr
                ? { ...application, ...updatedFields }
                : application
            )
          );
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to assign application"
      );
      throw error;
    }
  };

  return (
    <Box sx={styles.tableContainer}>
      <Box sx={styles.headingRow}>
        <IconButton
          aria-label="Back to Re-Assign Applications"
          title="Back to Re-Assign Applications"
          onClick={handleBackToReassign}
          sx={styles.backButton}
        >
          <IMAGES.ArrowBackIcon />
        </IconButton>

        <Box component="h2" sx={styles.tableHeading}>
          Application Details
        </Box>
      </Box>

      <Box sx={styles.tableSection}>
        <TableContainer component={Paper} sx={styles.tableWrapper}>
          <Table size="small" sx={styles.table}>
            <colgroup>
              {styles.columnWidths.map((width, colIndex) => (
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
                <TableCell align="center" sx={{ ...styles.headerCell, ...styles.assignedStaffCell }}>
                  Assigned Staff
                </TableCell>
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
              {!diaryNo || !diaryYear ? (
                <TableRow>
                  <TableCell colSpan={TABLE_COLUMN_COUNT} sx={styles.placeholderCell}>
                    Please provide diary number and diary year.
                  </TableCell>
                </TableRow>
              ) : loading && applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={TABLE_COLUMN_COUNT} sx={styles.placeholderCell}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : !loading && applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={TABLE_COLUMN_COUNT} sx={styles.placeholderCell}>
                    {emptyMessage || "No records found."}
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((row, index) => (
                  <TableRow key={`${row.diaryNo}-${index}`} sx={styles.dataRow}>
                    <TableCell align="center" sx={{ ...styles.dataCell, ...styles.srlNoCell }}>
                      {index + 1}
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
                        variant={VARIANTS.FILLED}
                      />
                    </TableCell>

                    <TableCell align="center" sx={{ ...styles.dataCell, ...styles.assignedStaffCell }}>
                      {row.assignedname || "-"}
                    </TableCell>

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
                        <strong>{row.ecourtFeeId || "Not Entered"}</strong>
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
                        {row.courtFeeReason && <>Reason: {row.courtFeeReason}</>}
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
                          <IMAGES.PictureAsPdfIcon sx={styles.actionIcon} />
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
                          <IMAGES.PrintIcon sx={styles.actionIcon} />
                        </Box>

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
                            <IMAGES.AssignmentTurnedInIcon sx={styles.actionIcon} />
                          ) : (
                            <IMAGES.AssignmentAddIcon sx={styles.actionIcon} />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {loading && applications.length > 0 && (
          <Box sx={styles.loadingOverlay}>
            <CircularProgress size={28} />
          </Box>
        )}
      </Box>

      <Popup
        open={Boolean(selectedApplication)}
        title="Select Staff"
        onClose={handleCloseAssignPopup}
        maxWidth="md"
      >
        {selectedApplication && (
          <SelectStaff
            key={`${selectedApplication.diaryNo}-${selectedApplication.diaryYr}-${selectedApplication.assigned ?? ""}-${selectedApplication.assignedname ?? ""}-${selectedApplication.remarks ?? ""}`}
            diaryNo={selectedApplication.diaryNo}
            diaryYr={selectedApplication.diaryYr}
            initialAssignedName={selectedApplication.assignedname}
            initialAssignedId={selectedApplication.assigned}
            initialRemarks={selectedApplication.remarks}
            onSubmit={handleAssignSubmit}
          />
        )}
      </Popup>
    </Box>
  );
};

export default ApplicationDetailsTable;
