import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";

import {
  handleReasonChange,
  handleReasonToggle,
  handleRemarksChange,
  handleSubmit,
  isRemarksRequired,
  REJECTION_REASONS,
} from "./helper";
import { styles } from "./style";
import type { RejectApplicationProps } from "./type";

const RejectApplication = ({
  diaryNo,
  diaryYr,
  onSubmit,
  onCancel,
  onRejectIdChange,
}: RejectApplicationProps) => {
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const remarksRequired = isRemarksRequired(reason);

  // Legacy takeaction(): any reason selection clears REJECTID to "".
  const applyReasonChange = (
    event: Parameters<ReturnType<typeof handleReasonChange>>[0]
  ) => {
    handleReasonChange(setReason)(event);
    onRejectIdChange?.("");
  };

  const applyRemarksChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleRemarksChange(setRemarks)(event);

    // Only Other edits update REJECTID (preset path kept the field disabled in legacy).
    if (isRemarksRequired(reason)) {
      onRejectIdChange?.(event.target.value);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(reason, remarks, onSubmit)}
      sx={styles.form}
    >
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      <Box sx={styles.fieldSection}>
        <Box component="label" htmlFor="reject-reason" sx={styles.fieldLabel}>
          Reason
        </Box>

        <FormControl fullWidth>
          <Select
            id="reject-reason"
            value={reason}
            onChange={applyReasonChange}
            displayEmpty
            sx={styles.documentTypeSelect}
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Box component="span" sx={styles.placeholderText}>
                    Select Reason
                  </Box>
                );
              }

              return selectedValue;
            }}
          >
            {REJECTION_REASONS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={handleReasonToggle(
                  reason,
                  option.value,
                  setReason
                )}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={styles.remarksSection}>
        <Box component="label" htmlFor="reject-remarks" sx={styles.fieldLabel}>
          Remarks
        </Box>

        <TextField
          id="reject-remarks"
          multiline
          rows={4}
          value={remarks}
          onChange={applyRemarksChange}
          helperText={remarksRequired ? "Please enter remarks." : undefined}
          sx={styles.remarksField}
        />
      </Box>

      <Box sx={styles.actionsWrap}>
        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={onCancel}
          sx={styles.cancelButton}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant={VARIANTS.CONTAINED}
          sx={styles.rejectButton}
        >
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default RejectApplication;
