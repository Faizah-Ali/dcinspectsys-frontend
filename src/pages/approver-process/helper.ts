import type { SelectChangeEvent } from "@mui/material";

import type { ApproverProcessValues } from "./type";

export const isForwardEnabled = (forwardTo: string) => Boolean(forwardTo);

export const handleRemarksChange =
  (setRemarks: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarks(event.target.value);
  };

export const handleForwardChange =
  (setForwardTo: React.Dispatch<React.SetStateAction<string>>) =>
  (event: SelectChangeEvent<string>) => {
    setForwardTo(event.target.value);
  };

// MUI Select does not fire onChange when the selected item is clicked
// again, so clearing is handled via MenuItem onClick.
export const handleForwardToggle =
  (
    forwardTo: string,
    optionId: string,
    setForwardTo: React.Dispatch<React.SetStateAction<string>>
  ) =>
  () => {
    if (forwardTo === optionId) {
      setForwardTo("");
    }
  };

export const handleAction =
  (
    action: ApproverProcessValues["action"],
    remarks: string,
    forwardTo: string,
    forwardToName: string,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (values: ApproverProcessValues) => void | Promise<void>
  ) =>
  async () => {
    if (action === "FORWARD" && !isForwardEnabled(forwardTo)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Preserve raw dealing remarks (legacy ApproverProcess — no trim).
      await onSubmit({
        remarks,
        forwardTo,
        forwardToName,
        action,
      });
    } catch {
      setIsSubmitting(false);
    }
  };
