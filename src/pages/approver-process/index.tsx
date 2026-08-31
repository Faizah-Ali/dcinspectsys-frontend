import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import {
  handleAction,
  handleForwardChange,
  handleForwardToggle,
  handleRemarksChange,
  isForwardEnabled,
} from "./helper";
import { getForwardApprovers } from "./services/forward-approvers.action";
import { styles } from "./style";
import type { ApproverProcessProps, ForwardUser } from "./type";

const ApproverProcess = ({
  diaryNo,
  diaryYr,
  onSubmit,
  onCancel,
}: ApproverProcessProps) => {
  const [remarks, setRemarks] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardUsers, setForwardUsers] = useState<ForwardUser[]>([]);
  const [isLoadingApprovers, setIsLoadingApprovers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canForward = isForwardEnabled(forwardTo);
  const forwardToName =
    forwardUsers.find((user) => user.id === forwardTo)?.name ?? "";

  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingApprovers(true);

    getForwardApprovers(controller.signal)
      .then(setForwardUsers)
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setForwardUsers([]);
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to fetch approvers list"
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingApprovers(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [diaryNo, diaryYr]);

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
            onClose={() => {
              requestAnimationFrame(() => {
                const active = document.activeElement;

                if (active instanceof HTMLElement) {
                  active.blur();
                }
              });
            }}
            disabled={isLoadingApprovers || isSubmitting}
            displayEmpty
            sx={styles.forwardToSelect}
            MenuProps={{
              PaperProps: {
                sx: styles.forwardToMenu,
              },
            }}
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Box component="span" sx={styles.placeholderText}>
                    Select Approver
                  </Box>
                );
              }

              const selectedUser = forwardUsers.find(
                (user) => user.id === selectedValue
              );

              return selectedUser?.name ?? selectedValue;
            }}
          >
            {isLoadingApprovers ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : forwardUsers.length === 0 ? (
              <MenuItem disabled>No approvers found.</MenuItem>
            ) : forwardUsers.map((user) => (
              <MenuItem
                key={user.id}
                value={user.id}
                onClick={handleForwardToggle(
                  forwardTo,
                  user.id,
                  setForwardTo
                )}
              >
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
          disabled={isSubmitting}
          sx={styles.cancelButton}
        >
          Cancel
        </Button>

        <Box sx={styles.actionButtonsGroup}>
          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting}
            onClick={handleAction(
              "APPROVE",
              remarks,
              forwardTo,
              forwardToName,
              setIsSubmitting,
              onSubmit
            )}
            sx={styles.approveButton}
          >
            {isSubmitting ? "Submitting..." : "Approve"}
          </Button>

          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting}
            onClick={handleAction(
              "REJECT",
              remarks,
              forwardTo,
              forwardToName,
              setIsSubmitting,
              onSubmit
            )}
            sx={styles.rejectButton}
          >
            Reject
          </Button>

          <Button
            type="button"
            variant={VARIANTS.CONTAINED}
            disabled={isSubmitting || isLoadingApprovers || !canForward}
            onClick={handleAction(
              "FORWARD",
              remarks,
              forwardTo,
              forwardToName,
              setIsSubmitting,
              onSubmit
            )}
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
