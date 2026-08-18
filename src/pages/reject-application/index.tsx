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
}: RejectApplicationProps) => {
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const remarksRequired = isRemarksRequired(reason);

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
            onChange={handleReasonChange(setReason)}
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
          onChange={handleRemarksChange(setRemarks)}
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
