import type { SelectChangeEvent } from "@mui/material";

import type { RejectApplicationValues, RejectionReasonOption } from "./type";

export const OTHER_REJECTION_REASON = "Other";

export const REJECTION_REASONS: RejectionReasonOption[] = [
  { value: "Vakalatnama Missing", label: "Vakalatnama Missing" },
  { value: "Court Fee Not Valid", label: "Court Fee Not Valid" },
  { value: "Third Party Request", label: "Third Party Request" },
  { value: "Documents Incomplete", label: "Documents Incomplete" },
  { value: "Case Not Eligible", label: "Case Not Eligible" },
  { value: OTHER_REJECTION_REASON, label: OTHER_REJECTION_REASON },
];

export const isRemarksRequired = (reason: string) =>
  reason === OTHER_REJECTION_REASON;

export const isRejectEnabled = (reason: string, remarks: string) => {
  if (!reason) {
    return false;
  }

  if (isRemarksRequired(reason)) {
    return remarks.trim().length > 0;
  }

  return true;
};

export const handleReasonChange =
  (setReason: React.Dispatch<React.SetStateAction<string>>) =>
  (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

export const handleRemarksChange =
  (setRemarks: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarks(event.target.value);
  };

export const handleSubmit =
  (
    reason: string,
    remarks: string,
    onSubmit: (values: RejectApplicationValues) => void
  ) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isRejectEnabled(reason, remarks)) {
      return;
    }

    onSubmit({
      reason,
      remarks: remarks.trim(),
    });
  };
