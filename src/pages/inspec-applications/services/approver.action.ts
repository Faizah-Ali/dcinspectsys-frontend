import { authFetch } from "../../../utils/api";

interface ApproverActionResponse {
  message: string;
}

export const approveApplication = async (
  diaryNo: number,
  diaryYr: number,
  remarks: string
): Promise<string> => {
  // Preserve raw dealing remarks (legacy ApproverProcess ACCEPT — no trim).
  const response = await authFetch("/api/approve-application", {
    method: "PATCH",
    body: JSON.stringify({
      diaryNo,
      diaryYr,
      remarks,
    }),
  });

  const data: ApproverActionResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to approve application");
  }

  if (!message) {
    throw new Error("Failed to approve application");
  }

  return message;
};

export const rejectApplication = async (
  diaryNo: number,
  diaryYr: number,
  remarks: string
): Promise<string> => {
  // Do not trim remarks here: Officer Reject must preserve whitespace-only
  // and leading/trailing spaces (legacy userlist.jsp). Approver Reject still
  // trims in approver-process/helper before calling this action.
  const response = await authFetch("/api/reject-application", {
    method: "PATCH",
    body: JSON.stringify({
      diaryNo,
      diaryYr,
      remarks,
    }),
  });

  const data: ApproverActionResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to reject application");
  }

  if (!message) {
    throw new Error("Failed to reject application");
  }

  return message;
};

export const forwardApplication = async (
  diaryNo: number,
  diaryYr: number,
  approverId: string,
  approverName: string,
  remarks: string
): Promise<string> => {
  // Preserve raw dealing remarks (legacy ApproverProcess FORWARD — no trim).
  const response = await authFetch("/api/forward-application", {
    method: "PATCH",
    body: JSON.stringify({
      diaryNo,
      diaryYr,
      approverId,
      approverName,
      remarks,
    }),
  });

  const data: ApproverActionResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to forward application");
  }

  if (!message) {
    throw new Error("Failed to forward application");
  }

  return message;
};
