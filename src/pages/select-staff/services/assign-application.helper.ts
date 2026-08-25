import { ENDPOINTS } from "../../../common/constants/endpoint";
import { showSuccessToast } from "../../../components/toast/helper";
import { authFetch } from "../../../utils/api";

import type { ApplicationResponse } from "../../inspec-applications/services/applications.type";
import type { SelectStaffValues } from "../type";

import type {
  AssignApplicationRequest,
  AssignApplicationResponse,
} from "./assign-application.type";

export const assignApplication = async (
  payload: AssignApplicationRequest
): Promise<string> => {
  const response = await authFetch(ENDPOINTS.ASSIGN_APPLICATION, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data: AssignApplicationResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to assign application");
  }

  if (!message) {
    throw new Error("Failed to assign application");
  }

  return message;
};

export const handleAssignApplicationSubmit = async ({
  application,
  values,
  onSuccess,
  onClose,
}: {
  application: ApplicationResponse | null;
  values: SelectStaffValues;
  onSuccess: (
    updatedFields: Pick<
      ApplicationResponse,
      "assigned" | "assignedname" | "remarks"
    >
  ) => void;
  onClose: () => void;
}) => {
  if (!application) {
    throw new Error("Please select an application");
  }

  if (!application.diaryNo || !application.diaryYr) {
    throw new Error("Application diary details are missing");
  }

  // Preserve raw dealing remarks (legacy AssignAppl — no trim).
  const remarks = values.remarks;

  const message = await assignApplication({
    diaryNo: application.diaryNo,
    diaryYr: application.diaryYr,
    assigned: values.staffId,
    assignedname: values.staffName,
    remarks,
  });

  showSuccessToast(message);
  onClose();
  // Assign does not update application REMARKS on the backend — keep local value.
  onSuccess({
    assigned: values.staffId,
    assignedname: values.staffName,
    remarks: application.remarks,
  });
};
