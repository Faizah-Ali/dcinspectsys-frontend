import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import { VARIANTS } from "../../common/constants";
import ReferenceNoBanner from "../../components/reference-no-banner";
import SearchableSelect from "../../components/searchable-select";
import { showErrorToast } from "../../components/toast/helper";

import {
  handleAction,
  handleForwardChange,
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

  const forwardOptions = forwardUsers.map((user) => ({
    value: user.id,
    label: user.name,
  }));

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

  const blurForwardSelect = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement;

      if (active instanceof HTMLElement) {
        active.blur();
      }
    });
  };

  return (
    <Box sx={styles.form}>
      <ReferenceNoBanner
        diaryNo={diaryNo}
        diaryYr={diaryYr}
        sx={{ marginBottom: "16px" }}
      />

      <Box sx={styles.remarksSection}>
        <Box component="label" htmlFor="approver-remarks" sx={styles.fieldLabel}>
          Remarks
        </Box>

        <TextField
          id="approver-remarks"
          multiline
          minRows={3}
          value={remarks}
          onChange={handleRemarksChange(setRemarks)}
          sx={styles.remarksField}
        />
      </Box>

      <Box sx={styles.fieldSection}>
        <Box
          component="label"
          htmlFor="approver-forward-to"
          sx={styles.fieldLabel}
        >
          Forward To
        </Box>

        <SearchableSelect
          id="approver-forward-to"
          value={forwardTo}
          options={forwardOptions}
          onChange={handleForwardChange(setForwardTo)}
          onClose={blurForwardSelect}
          placeholder="Select Approver"
          disabled={isLoadingApprovers || isSubmitting}
          loading={isLoadingApprovers}
          noOptionsText="No approvers found."
          sx={styles.forwardToSelect}
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
          CANCEL
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
            {isSubmitting ? "Submitting..." : "APPROVE"}
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
            REJECT
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
            FORWARD
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ApproverProcess;
