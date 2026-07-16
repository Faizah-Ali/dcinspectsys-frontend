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
  FORWARD_USERS,
  handleAction,
  handleForwardChange,
  handleRemarksChange,
  isForwardEnabled,
} from "./helper";
import { styles } from "./style";
import type { ApproverProcessProps } from "./type";

const ApproverProcess = ({
  diaryNo,
  diaryYr,
  onSubmit,
  onCancel,
}: ApproverProcessProps) => {
  const [remarks, setRemarks] = useState("");
  const [forwardTo, setForwardTo] = useState("");

  const canForward = isForwardEnabled(forwardTo);

  return (
    <Box sx={styles.form}>
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      <Box sx={styles.remarksSection}>
        <Box component="label" htmlFor="approver-remarks" sx={styles.fieldLabel}>
          Remarks
        </Box>

        <TextField
          id="approver-remarks"
          multiline
          rows={4}
          value={remarks}
          onChange={handleRemarksChange(setRemarks)}
          sx={styles.remarksField}
        />
      </Box>

      <Box sx={styles.fieldSection}>
        <Box component="label" htmlFor="approver-forward-to" sx={styles.fieldLabel}>
          Forward To
        </Box>

        <FormControl fullWidth>
          <Select
            id="approver-forward-to"
            value={forwardTo}
            onChange={handleForwardChange(setForwardTo)}
            displayEmpty
            sx={styles.documentTypeSelect}
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Box component="span" sx={styles.placeholderText}>
                    Select Approver
                  </Box>
                );
              }

              const selectedUser = FORWARD_USERS.find(
                (user) => user.id === selectedValue
              );

              return selectedUser?.name ?? selectedValue;
            }}
          >
            {FORWARD_USERS.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

        <Box sx={styles.actionButtonsGroup}>
          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            onClick={handleAction("APPROVE", remarks, forwardTo, onSubmit)}
            sx={styles.approveButton}
          >
            Approve
          </Button>

          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            onClick={handleAction("REJECT", remarks, forwardTo, onSubmit)}
            sx={styles.rejectButton}
          >
            Reject
          </Button>

          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            disabled={!canForward}
            onClick={handleAction("FORWARD", remarks, forwardTo, onSubmit)}
            sx={styles.forwardButton}
          >
            Forward
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ApproverProcess;
