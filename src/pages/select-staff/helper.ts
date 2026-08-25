import { selectStaffSchema } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import type { Approver } from "./services/select-staff.type";
import type { SelectStaffValues } from "./type";

/**
 * Assign/Re-assign dealing remarks always start empty (legacy AdministratorInbox /
 * ReInbox textarea value=""). Never seed from application.remarks.
 */
export const getSelectStaffFormDefaults = (
  assignedName?: string | null
) => ({
  assignedName: assignedName?.trim() ?? "",
  remarks: "",
});

export const findApproverByName = (
  approvers: Approver[],
  assignedName?: string | null
) => {
  const normalizedAssignedName = assignedName?.trim().toLowerCase();

  if (!normalizedAssignedName) {
    return null;
  }

  return (
    approvers.find(
      (approver) =>
        approver.fullname?.trim().toLowerCase() === normalizedAssignedName
    ) ?? null
  );
};

export const findApproverForApplication = (
  approvers: Approver[],
  assignedName?: string | null,
  assignedId?: string | null
) => {
  const normalizedAssignedId = assignedId?.trim();

  if (normalizedAssignedId) {
    const approverById = approvers.find(
      (approver) => approver.id === normalizedAssignedId
    );

    if (approverById) {
      return approverById;
    }
  }

  return findApproverByName(approvers, assignedName);
};

export const getInitialStaffId = (
  approvers: Approver[],
  assignedName?: string | null,
  assignedId?: string | null
) => {
  const defaults = getSelectStaffFormDefaults(assignedName);

  if (!defaults.assignedName) {
    return "";
  }

  return (
    findApproverForApplication(approvers, assignedName, assignedId)?.id ?? ""
  );
};

export const hasSelectStaffFormChanges = ({
  staffId,
  remarks,
  initialStaffId,
  initialRemarks,
}: {
  staffId: string;
  remarks: string;
  initialStaffId: string;
  initialRemarks: string;
}) =>
  staffId !== initialStaffId ||
  remarks !== initialRemarks;

export const handleStaffIdChange =
  (setStaffId: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffId(event.target.value);
  };

// Clicking the already selected radio clears the selection
// (onChange does not fire in that case, so this runs on click).
export const handleStaffIdToggle =
  (
    staffId: string,
    optionId: string,
    setStaffId: React.Dispatch<React.SetStateAction<string>>
  ) =>
  () => {
    if (staffId === optionId) {
      setStaffId("");
    }
  };

export const handleRemarksChange =
  (setRemarks: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarks(event.target.value);
  };

export const handleSubmit =
  (
    staffId: string,
    remarks: string,
    approvers: Approver[],
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (values: SelectStaffValues) => void | Promise<void>
  ) =>
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await selectStaffSchema.validate({ staffId }, { abortEarly: false });

      const selectedApprover = approvers.find(
        (approver) => approver.id === staffId
      );

      if (!selectedApprover) {
        showErrorToast("Please select a staff member");
        setIsSubmitting(false);
        return;
      }

      await onSubmit({
        staffId,
        staffName: selectedApprover.fullname,
        remarks,
      });
    } catch (error: any) {
      if (error?.name === "ValidationError") {
        showErrorToast(error?.message || "Please select a staff member");
      }

      setIsSubmitting(false);
    }
  };
