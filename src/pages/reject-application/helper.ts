import type { SelectChangeEvent } from "@mui/material";

import { rejectApplicationSchema } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

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

export const handleReasonChange =
  (setReason: React.Dispatch<React.SetStateAction<string>>) =>
  (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

// MUI Select does not fire onChange when the selected item is clicked
// again, so clearing is handled via MenuItem onClick.
export const handleReasonToggle =
  (
    reason: string,
    optionValue: string,
    setReason: React.Dispatch<React.SetStateAction<string>>
  ) =>
  () => {
    if (reason === optionValue) {
      setReason("");
    }
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
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await rejectApplicationSchema.validate({ reason }, { abortEarly: false });

      onSubmit({
        reason,
        remarks: remarks.trim(),
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.name === "ValidationError"
          ? error.message
          : "Please select a reason";

      showErrorToast(message);
    }
  };
