import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";

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
  /** Presentation-only: lock menu width to the Reason field. */
  const [reasonMenuWidth, setReasonMenuWidth] = useState<number | undefined>();
  const reasonFieldRef = useRef<HTMLDivElement | null>(null);

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

  const syncReasonMenuWidth = () => {
    const width = reasonFieldRef.current?.offsetWidth;
    if (width && width > 0) {
      setReasonMenuWidth(width);
    }
  };

  /** Drop focus after the menu closes so the orange outline does not linger. */
  const blurReasonSelect = () => {
    window.setTimeout(() => {
      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        reasonFieldRef.current?.contains(active)
      ) {
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

        <FormControl fullWidth ref={reasonFieldRef}>
          <Select
            id="reject-reason"
            value={reason}
            onChange={applyReasonChange}
            onOpen={syncReasonMenuWidth}
            onClose={blurReasonSelect}
            displayEmpty
            autoWidth={false}
            sx={styles.documentTypeSelect}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              marginThreshold: 12,
              PaperProps: {
                sx: {
                  ...styles.documentTypeMenu,
                  ...(reasonMenuWidth
                    ? {
                        width: reasonMenuWidth,
                        maxWidth: reasonMenuWidth,
                        minWidth: `${reasonMenuWidth}px !important`,
                      }
                    : {}),
                },
              },
              MenuListProps: {
                dense: true,
              },
            }}
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
                onClick={handleReasonToggle(reason, option.value, setReason)}
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
