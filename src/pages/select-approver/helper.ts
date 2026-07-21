import { showErrorToast } from "../../components/toast/helper";

import type { InspectionApprover } from "./services/inspection-approvers.type";
import type { SelectApproverValues } from "./type";

export const handleApproverIdChange =
  (
    setApproverId: React.Dispatch<React.SetStateAction<string>>,
    setApproverName: React.Dispatch<React.SetStateAction<string>>,
    approvers: InspectionApprover[]
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextId = event.target.value;
    const selected = approvers.find((approver) => approver.id === nextId);

    setApproverId(nextId);
    setApproverName(selected?.fullname ?? "");
  };

// Clicking the already selected radio clears the selection
// (onChange does not fire in that case, so this runs on click).
export const handleApproverIdToggle =
  (
    approverId: string,
    optionId: string,
    setApproverId: React.Dispatch<React.SetStateAction<string>>,
    setApproverName: React.Dispatch<React.SetStateAction<string>>
  ) =>
  () => {
    if (approverId === optionId) {
      setApproverId("");
      setApproverName("");
    }
  };

export const handleSubmit =
  (
    approverId: string,
    approverName: string,
    remarks: string,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (values: SelectApproverValues) => void | Promise<void>
  ) =>
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!approverId) {
      showErrorToast("Please select an approver");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        approverId,
        approverName,
        remarks: remarks.trim(),
      });
    } catch {
      setIsSubmitting(false);
    }
  };
