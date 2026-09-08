import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import SearchableSelect from "../../components/searchable-select";

import {
  handleReasonChange,
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
  const applyReasonChange = (value: string) => {
    handleReasonChange(setReason)(value);
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

  /** Drop focus after the menu closes so the orange outline does not linger. */
  const blurReasonSelect = () => {
    window.setTimeout(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement) {
        active.blur();
      }
    }, 0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(reason, remarks, onSubmit)}
      sx={styles.form}
    >
      <ReferenceNoBanner
        diaryNo={diaryNo}
        diaryYr={diaryYr}
        sx={{ marginBottom: "16px" }}
      />

      <Box sx={styles.fieldSection}>
        <Box component="label" htmlFor="reject-reason" sx={styles.fieldLabel}>
          Reason
        </Box>

        <SearchableSelect
          id="reject-reason"
          value={reason}
          options={REJECTION_REASONS}
          onChange={applyReasonChange}
          onClose={blurReasonSelect}
          placeholder="Select Reason"
          sx={styles.documentTypeSelect}
        />
      </Box>

      <Box sx={styles.remarksSection}>
        <Box component="label" htmlFor="reject-remarks" sx={styles.fieldLabel}>
          Remarks
        </Box>

        <TextField
          id="reject-remarks"
          multiline
          minRows={3}
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
          sx={styles.rejectPopupCancelButton}
        >
          CANCEL
        </Button>

        <Button
          type="submit"
          variant={VARIANTS.CONTAINED}
          sx={styles.rejectPopupRejectButton}
        >
          REJECT
        </Button>
      </Box>
    </Box>
  );
};

export default RejectApplication;
