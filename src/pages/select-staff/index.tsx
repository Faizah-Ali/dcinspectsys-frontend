import { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import Search from "../../components/search";
import { showErrorToast } from "../../components/toast/helper";
import type { AppDispatch, RootState } from "../../redux/store";

import {
  filterOfficersBySearch,
  findApproverForApplication,
  getInitialStaffId,
  getSelectStaffFormDefaults,
  handleOfficerSearchChange,
  handleRemarksChange,
  handleSubmit,
  hasSelectStaffFormChanges,
} from "./helper";
import { getApproversList } from "./services/select-staff.action";
import type { Approver } from "./services/select-staff.type";
import { styles } from "./style";
import type { SelectStaffProps } from "./type";

const SelectStaff = ({
  diaryNo,
  diaryYr,
  initialAssignedName = null,
  initialAssignedId = null,
  onSubmit,
}: SelectStaffProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { approvers, loading: isLoading } = useSelector(
    (state: RootState) => state.selectStaff
  );

  const applicationDefaults = getSelectStaffFormDefaults(initialAssignedName);

  const [staffId, setStaffId] = useState("");
  const [remarks, setRemarks] = useState(applicationDefaults.remarks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [officerSearch, setOfficerSearch] = useState("");

  const initialStaffId = useMemo(
    () =>
      isLoading
        ? ""
        : getInitialStaffId(
            approvers,
            initialAssignedName,
            initialAssignedId
          ),
    [approvers, initialAssignedId, initialAssignedName, isLoading]
  );

  const filteredApprovers = useMemo(
    () => filterOfficersBySearch(approvers, officerSearch),
    [approvers, officerSearch]
  );

  // Dealing remarks always start as "" (never seeded from application.remarks).
  const initialRemarksValue = applicationDefaults.remarks;

  const hasChanges = hasSelectStaffFormChanges({
    staffId,
    remarks,
    initialStaffId,
    initialRemarks: initialRemarksValue,
  });

  useEffect(() => {
    const defaults = getSelectStaffFormDefaults(initialAssignedName);

    setRemarks(defaults.remarks);
    setStaffId("");
    setOfficerSearch("");
    setIsSubmitting(false);
  }, [diaryNo, diaryYr, initialAssignedName, initialAssignedId]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const defaults = getSelectStaffFormDefaults(initialAssignedName);

    if (!defaults.assignedName) {
      setStaffId("");
      return;
    }

    const matchedApprover = findApproverForApplication(
      approvers,
      initialAssignedName,
      initialAssignedId
    );

    setStaffId(matchedApprover?.id ?? "");
  }, [
    approvers,
    initialAssignedName,
    initialAssignedId,
    isLoading,
    diaryNo,
    diaryYr,
  ]);

  useEffect(() => {
    const promise = dispatch(getApproversList());

    promise
      .unwrap()
      .catch((message) => {
        if (message !== "aborted") {
          showErrorToast(message || "Failed to fetch approvers list");
        }
      });

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  // Same single-select + re-click-to-clear behavior as prior radio controls.
  const selectStaff = (approver: Approver) => {
    if (staffId === approver.id) {
      setStaffId("");
      return;
    }

    setStaffId(approver.id);
  };

  return (
    <Box sx={styles.pageShell}>
      <Box
        component="form"
        onSubmit={handleSubmit(
          staffId,
          remarks,
          approvers,
          setIsSubmitting,
          onSubmit
        )}
        sx={styles.staffForm}
      >
        <ReferenceNoBanner
          diaryNo={diaryNo}
          diaryYr={diaryYr}
          sx={{ flexShrink: 0 }}
        />

        <Box sx={styles.section}>
          <Box component="p" sx={styles.sectionTitle}>
            Select Officer
          </Box>

          {!isLoading && approvers.length > 0 ? (
            <Search
              value={officerSearch}
              onChange={handleOfficerSearchChange(setOfficerSearch)}
              placeholder="Search officer by name or ID"
              containerSx={styles.popupSearch}
            />
          ) : null}

          {isLoading ? (
            <Box sx={styles.loadingWrap}>
              <CircularProgress size={24} />
            </Box>
          ) : approvers.length === 0 ? (
            <Box sx={styles.emptyText}>No approvers found.</Box>
          ) : filteredApprovers.length === 0 ? (
            <Box sx={styles.emptyText}>No officers found.</Box>
          ) : (
            <Box sx={styles.staffListScroll}>
              <Box
                role="radiogroup"
                aria-label="Select officer"
                sx={styles.staffList}
              >
                {filteredApprovers.map((approver) => {
                  const isSelected = staffId === approver.id;

                  return (
                    <Box
                      key={approver.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => selectStaff(approver)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectStaff(approver);
                        }
                      }}
                      sx={{
                        ...styles.staffRow,
                        ...(isSelected ? styles.staffRowSelected : {}),
                      }}
                    >
                      <Box
                        component="span"
                        aria-hidden
                        sx={{
                          ...styles.selectionMarker,
                          ...(isSelected
                            ? styles.selectionMarkerSelected
                            : {}),
                        }}
                      />

                      <Box
                        component="span"
                        sx={{
                          ...styles.staffRowName,
                          ...(isSelected ? styles.staffRowNameSelected : {}),
                        }}
                      >
                        {approver.fullname}
                      </Box>

                      {isSelected ? (
                        <Box component="span" sx={styles.selectedBadge}>
                          Selected
                        </Box>
                      ) : null}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={styles.remarksSection}>
          <Box
            component="label"
            htmlFor="staff-remarks"
            sx={styles.remarksSectionLabel}
          >
            Remarks
          </Box>

          <TextField
            id="staff-remarks"
            multiline
            minRows={3}
            maxRows={3}
            placeholder="Enter remarks (optional)"
            value={remarks}
            onChange={handleRemarksChange(setRemarks)}
            sx={styles.staffRemarksField}
          />
        </Box>

        <Box sx={styles.staffActions}>
          <Button
            type="submit"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting || isLoading || !hasChanges}
            sx={styles.staffSubmitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectStaff;
