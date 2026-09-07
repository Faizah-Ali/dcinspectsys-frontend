import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import { showErrorToast } from "../../components/toast/helper";
import type { AppDispatch, RootState } from "../../redux/store";

import {
  findApproverForApplication,
  getInitialStaffId,
  getSelectStaffFormDefaults,
  handleRemarksChange,
  handleStaffIdChange,
  handleStaffIdToggle,
  handleSubmit,
  hasSelectStaffFormChanges,
} from "./helper";
import { getApproversList } from "./services/select-staff.action";
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
        <ReferenceNoBanner diaryNo={diaryNo} diaryYr={diaryYr} />

        <Box sx={styles.section}>
          <Box component="p" sx={styles.sectionTitle}>
            Select an officer
          </Box>

          {isLoading ? (
            <Box sx={styles.loadingWrap}>
              <CircularProgress size={28} />
            </Box>
          ) : approvers.length === 0 ? (
            <Box sx={styles.emptyText}>No approvers found.</Box>
          ) : (
            <RadioGroup
              value={staffId}
              onChange={handleStaffIdChange(setStaffId)}
              sx={styles.staffList}
            >
              {approvers.map((approver) => {
                const isSelected = staffId === approver.id;

                return (
                  <FormControlLabel
                    key={approver.id}
                    value={approver.id}
                    control={
                      <Radio
                        onClick={handleStaffIdToggle(
                          staffId,
                          approver.id,
                          setStaffId
                        )}
                      />
                    }
                    label={
                      <Box sx={styles.staffCardLabel}>
                        <Box
                          component="span"
                          sx={{
                            ...styles.staffCardName,
                            ...(isSelected
                              ? styles.staffCardNameSelected
                              : {}),
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
                    }
                    sx={{
                      ...styles.staffCard,
                      ...(isSelected ? styles.staffCardSelected : {}),
                    }}
                  />
                );
              })}
            </RadioGroup>
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
