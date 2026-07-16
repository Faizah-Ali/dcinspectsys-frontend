import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";
import { handleRemarksChange } from "../select-staff/helper";

import { handleApproverIdChange, handleSubmit } from "./helper";
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

  useEffect(() => {
    setApproverId("");
    setApproverName("");
    setRemarks("");
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(
        approverId,
        approverName,
        remarks,
        setIsSubmitting,
        onSubmit
      )}
      sx={styles.form}
    >
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      {isLoading ? (
        <Box sx={styles.loadingWrap}>
          <CircularProgress size={28} />
        </Box>
      ) : approvers.length === 0 ? (
        <Box sx={styles.emptyText}>No approvers found.</Box>
      ) : (
        <RadioGroup
          value={approverId}
          onChange={handleApproverIdChange(
            setApproverId,
            setApproverName,
            approvers
          )}
          sx={styles.staffGroup}
        >
          {approvers.map((approver) => (
            <FormControlLabel
              key={approver.id}
              value={approver.id}
              control={<Radio />}
              label={approver.fullname}
            />
          ))}
        </RadioGroup>
      )}

      <Box sx={styles.remarksRow}>
        <Box
          component="label"
          htmlFor="approver-remarks"
          sx={styles.remarksLabel}
        >
          Remarks:
        </Box>

        <TextField
          id="approver-remarks"
          multiline
          rows={4}
          value={remarks}
          onChange={handleRemarksChange(setRemarks)}
          sx={styles.remarksField}
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
          sx={styles.submitButton}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectApprover;
