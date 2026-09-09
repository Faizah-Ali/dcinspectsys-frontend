import { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import Search from "../../components/search";
import { showErrorToast } from "../../components/toast/helper";
import {
  filterOfficersBySearch,
  handleOfficerSearchChange,
  handleRemarksChange,
} from "../select-staff/helper";

import { handleSubmit } from "./helper";
import { getInspectionApprovers } from "./services/inspection-approvers.action";
import type { InspectionApprover } from "./services/inspection-approvers.type";
import { styles } from "./style";
import type { SelectApproverProps } from "./type";

const SelectApprover = ({
  diaryNo,
  diaryYr,
  onSubmit,
  onCancel,
}: SelectApproverProps) => {
  const [approverId, setApproverId] = useState("");
  const [approverName, setApproverName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [approvers, setApprovers] = useState<InspectionApprover[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [officerSearch, setOfficerSearch] = useState("");

  const filteredApprovers = useMemo(
    () => filterOfficersBySearch(approvers, officerSearch),
    [approvers, officerSearch]
  );

  useEffect(() => {
    setApproverId("");
    setApproverName("");
    setRemarks("");
    setOfficerSearch("");
    setIsSubmitting(false);
  }, [diaryNo, diaryYr]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    getInspectionApprovers(controller.signal)
      .then((data) => {
        setApprovers(data);
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setApprovers([]);
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to fetch inspection approvers"
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

  // Same single-select + re-click-to-clear behavior as prior radio controls.
  const selectApprover = (approver: InspectionApprover) => {
    if (approverId === approver.id) {
      setApproverId("");
      setApproverName("");
      return;
    }

    setApproverId(approver.id);
    setApproverName(approver.fullname);
  };

  return (
    <Box sx={styles.pageShell}>
      <Box
        component="form"
        onSubmit={handleSubmit(
          approverId,
          approverName,
          remarks,
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
            Select Approver
          </Box>

          {!isLoading && approvers.length > 0 ? (
            <Search
              value={officerSearch}
              onChange={handleOfficerSearchChange(setOfficerSearch)}
              placeholder="Search approver by name or ID"
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
            <Box sx={styles.emptyText}>No approvers match your search.</Box>
          ) : (
            <Box sx={styles.staffListScroll}>
              <Box
                role="radiogroup"
                aria-label="Select approver"
                sx={styles.staffList}
              >
                {filteredApprovers.map((approver) => {
                  const isSelected = approverId === approver.id;

                  return (
                    <Box
                      key={approver.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => selectApprover(approver)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectApprover(approver);
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
            htmlFor="approver-remarks"
            sx={styles.remarksSectionLabel}
          >
            Remarks
          </Box>

          <TextField
            id="approver-remarks"
            multiline
            minRows={3}
            maxRows={3}
            placeholder="Enter remarks (optional)"
            value={remarks}
            onChange={handleRemarksChange(setRemarks)}
            sx={styles.staffRemarksField}
            disabled={isLoading || isSubmitting}
          />
        </Box>

        <Box sx={styles.actionsWrap}>
          <Button
            type="button"
            variant={VARIANTS.OUTLINED}
            onClick={onCancel}
            disabled={isSubmitting}
            sx={styles.cancelButton}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting || isLoading || !approverId}
            sx={styles.staffSubmitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectApprover;
