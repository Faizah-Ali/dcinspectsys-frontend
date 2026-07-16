import type { SelectChangeEvent } from "@mui/material";

import type { ApproverProcessValues, ForwardUser } from "./type";

export const FORWARD_USERS: ForwardUser[] = [
  { id: "1", name: "Rahul Sharma" },
  { id: "2", name: "Amit Kumar" },
  { id: "3", name: "Neha Gupta" },
  { id: "4", name: "Vivek Singh" },
];

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

export const handleAction =
  (
    action: ApproverProcessValues["action"],
    remarks: string,
    forwardTo: string,
    onSubmit: (values: ApproverProcessValues) => void
  ) =>
  () => {
    if (action === "FORWARD" && !isForwardEnabled(forwardTo)) {
      return;
    }

    onSubmit({
      remarks: remarks.trim(),
      forwardTo,
      action,
    });
  };
