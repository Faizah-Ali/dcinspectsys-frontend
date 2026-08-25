import type { SelectChangeEvent } from "@mui/material";

import { rejectApplicationSchema } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import type { RejectApplicationValues, RejectionReasonOption } from "./type";

/** Legacy REASONCOMBO Other option value from userlist.jsp (`value="0"`). */
export const OTHER_REJECTION_REASON_VALUE = "0";

/** Display label for Other (legacy option text). */
export const OTHER_REJECTION_REASON = "Other";

/**
 * Preset reasons use the exact option `value` strings from legacy userlist.jsp.
 * Those values (not labels) are what old JS posted as remarks.
 */
export const REJECTION_REASONS: RejectionReasonOption[] = [
  {
    value: "Vakalatnama/memo of appearance not  on record",
    label: "Vakalatnama/memo of appearance not on record",
  },
  {
    value: "E-data not available",
    label: "E-data not available.",
  },
  {
    value: "Advocates's name and enrolment no. not mentioned on the vakalatnama",
    label: "Advocates's name and enrolment no. not mentioned on the vakalatnama",
  },
  {
    value:
      "Inspection of pending case not allowed to third partyInspection of pending case not allowed to third party",
    label: "Inspection of pending case not allowed to third party.",
  },
  {
    value: "C.M. for impleadment is not allowed by The Hon'ble Court",
    label: "C.M. for impleadment is not allowed by The Hon'ble Court.",
  },
  {
    value: "You are not party in this matter",
    label: "You are not party in this matter.",
  },
  {
    value: "Company application no. is not mentioned",
    label: "Company application no. is not mentioned.",
  },
  {
    value: "Sufficient Court Fee NOT Paid",
    label: "Sufficient Court Fee NOT Paid.",
  },
  {
    value: "Error in court fee",
    label: "Error in court fee.",
  },
  {
    value: "Vakalatnama not found",
    label: "Vakalatnama not found",
  },
  {
    value:
      "C.M. Application of impleadment still pending in Hon'ble court",
    label: "C.M. Application of impleadment still pending in Hon'ble court",
  },
  {
    value: "Please mention company application no",
    label: "Please mention company application no",
  },
  {
    value: "Scan data not updated vakalatnama/POA not found",
    label: "Scan data not updated vakalatnama/POA not found",
  },
  {
    value: OTHER_REJECTION_REASON_VALUE,
    label: OTHER_REJECTION_REASON,
  },
];

export const isRemarksRequired = (reason: string) =>
  reason === OTHER_REJECTION_REASON_VALUE;

/**
 * Legacy Officer Reject remarks resolution (userlist.jsp reject()).
 * - Preset: remarks = selected option value (no "Reason:" prefix, no trim)
 * - Other (value "0"): remarks = raw Other text; block only when exactly ""
 * Does not use .trim() — whitespace-only Other is allowed and preserved.
 */
export const buildOfficerRejectRemarks = (
  reason: string,
  otherText: string
): { ok: true; remarks: string } | { ok: false; message: string } => {
  if (!reason) {
    return { ok: false, message: "Please select a reason" };
  }

  if (reason === OTHER_REJECTION_REASON_VALUE) {
    if (otherText === "") {
      return { ok: false, message: "please enter reason of rejection" };
    }

    return { ok: true, remarks: otherText };
  }

  return { ok: true, remarks: reason };
};

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

      const resolved = buildOfficerRejectRemarks(reason, remarks);

      if (!resolved.ok) {
        showErrorToast(resolved.message);
        return;
      }

      // remarks is the final API remarks string (raw; never trimmed).
      onSubmit({
        reason,
        remarks: resolved.remarks,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.name === "ValidationError"
          ? error.message
          : "Please select a reason";

      showErrorToast(message);
    }
  };
