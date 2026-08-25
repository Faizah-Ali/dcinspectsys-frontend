import { ENDPOINTS } from "../../../common/constants/endpoint";
import { showSuccessToast } from "../../../components/toast/helper";
import { authFetch } from "../../../utils/api";

import type { ApplicationResponse } from "../../inspec-applications/services/applications.type";
import type { SelectApproverValues } from "../type";

import type {
  SendForApprovalRequest,
  SendForApprovalResponse,
} from "./send-for-approval.type";

export const sendForApproval = async (
  payload: SendForApprovalRequest
): Promise<string> => {
  const response = await authFetch(ENDPOINTS.SEND_FOR_APPROVAL, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data: SendForApprovalResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to send application for approval");
  }

  if (!message) {
    throw new Error("Failed to send application for approval");
  }

  return message;
};

export const handleSendForApprovalSubmit = async ({
  application,
  values,
  onSuccess,
  onClose,
}: {
  application: ApplicationResponse | null;
  values: SelectApproverValues;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  if (!application) {
    throw new Error("Please select an application");
  }

  if (!application.diaryNo || !application.diaryYr) {
    throw new Error("Application diary details are missing");
  }

  if (!values.approverId) {
    throw new Error("Please select an approver");
  }

  // Preserve raw dealing remarks (legacy Approve_Inspection_Appl — no trim).
  const message = await sendForApproval({
    diaryNo: application.diaryNo,
    diaryYr: application.diaryYr,
    approverId: values.approverId,
    approverName: values.approverName,
    remarks: values.remarks,
  });

  showSuccessToast(message);
  onClose();
  onSuccess();
};
