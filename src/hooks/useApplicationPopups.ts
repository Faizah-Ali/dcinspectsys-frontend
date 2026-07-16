import { useState } from "react";

import type { ApplicationResponse } from "../pages/inspec-applications/services/applications.type";
import type { ApproverProcessValues } from "../pages/approver-process/type";
import type { RejectApplicationValues } from "../pages/reject-application/type";
import { handleSendForApprovalSubmit } from "../pages/select-approver/services/send-for-approval.helper";
import type { SelectApproverValues } from "../pages/select-approver/type";
import { handleAssignApplicationSubmit } from "../pages/select-staff/services/assign-application.helper";
import type { SelectStaffValues } from "../pages/select-staff/type";
import type { UploadFileValues } from "../pages/upload-file/type";
import { showErrorToast, showSuccessToast } from "../components/toast/helper";

interface UseApplicationPopupsOptions {
  setDisplayApplications: React.Dispatch<React.SetStateAction<ApplicationResponse[]>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export const useApplicationPopups = ({
  setRefreshKey,
}: UseApplicationPopupsOptions) => {
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedApproverApplication, setSelectedApproverApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedUploadApplication, setSelectedUploadApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedHistoryApplication, setSelectedHistoryApplication] =
    useState<ApplicationResponse | null>(null);
  const [completeAction, setCompleteAction] =
    useState<ApplicationResponse | null>(null);
  const [selectedRejectApplication, setSelectedRejectApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedApproverProcessApplication, setSelectedApproverProcessApplication] =
    useState<ApplicationResponse | null>(null);

  const handleOpenAssignPopup = (application: ApplicationResponse) => {
    setSelectedApplication(application);
  };

  const handleCloseAssignPopup = () => {
    setSelectedApplication(null);
  };

  const handleAssignSubmit = async (values: SelectStaffValues) => {
    try {
      await handleAssignApplicationSubmit({
        application: selectedApplication,
        values,
        onClose: handleCloseAssignPopup,
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to assign application"
      );
      throw error;
    }
  };

  const handleOpenSelectApprover = (application: ApplicationResponse) => {
    setSelectedApproverApplication(application);
  };

  const handleCloseSelectApprover = () => {
    setSelectedApproverApplication(null);
  };

  const handleSendToApprover = async (values: SelectApproverValues) => {
    try {
      await handleSendForApprovalSubmit({
        application: selectedApproverApplication,
        values,
        onClose: handleCloseSelectApprover,
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to send application for approval"
      );
      throw error;
    }
  };

  const handleOpenUploadPopup = (application: ApplicationResponse) => {
    setSelectedUploadApplication(application);
  };

  const handleCloseUploadPopup = () => {
    setSelectedUploadApplication(null);
  };

  const handleUploadSubmit = (values: UploadFileValues) => {
    console.log("Upload Application", selectedUploadApplication);
    console.log(values);
    handleCloseUploadPopup();
    showSuccessToast("Document uploaded successfully (UI Demo)");
  };

  const handleOpenHistoryPopup = (application: ApplicationResponse) => {
    setSelectedHistoryApplication(application);
  };

  const handleCloseHistoryPopup = () => {
    setSelectedHistoryApplication(null);
  };

  const handleComplete = (application: ApplicationResponse) => {
    setCompleteAction(application);
  };

  const handleCloseComplete = () => {
    setCompleteAction(null);
  };

  const handleConfirmComplete = () => {
    if (!completeAction) {
      return;
    }

    console.log("Complete Application", completeAction);
    handleCloseComplete();
    showSuccessToast("Application completed (UI Demo)");
  };

  const handleOpenRejectPopup = (application: ApplicationResponse) => {
    setSelectedRejectApplication(application);
  };

  const handleCloseRejectPopup = () => {
    setSelectedRejectApplication(null);
  };

  const handleRejectSubmit = (values: RejectApplicationValues) => {
    console.log("Reject Application");
    console.log(selectedRejectApplication);
    console.log(values);
    handleCloseRejectPopup();
    showSuccessToast("Application rejected (UI Demo)");
  };

  const handleOpenApproverProcess = (application: ApplicationResponse) => {
    setSelectedApproverProcessApplication(application);
  };

  const handleCloseApproverProcess = () => {
    setSelectedApproverProcessApplication(null);
  };

  const handleApproverProcessSubmit = (values: ApproverProcessValues) => {
    console.log("Approver Process");
    console.log(selectedApproverProcessApplication);
    console.log(values);
    handleCloseApproverProcess();

    const toastMessage =
      values.action === "APPROVE"
        ? "Application approved (UI Demo)"
        : values.action === "REJECT"
          ? "Application rejected by approver (UI Demo)"
          : "Application forwarded (UI Demo)";

    showSuccessToast(toastMessage);
  };

  return {
    selectedApplication,
    selectedApproverApplication,
    selectedUploadApplication,
    selectedHistoryApplication,
    completeAction,
    selectedRejectApplication,
    selectedApproverProcessApplication,
    handleOpenAssignPopup,
    handleCloseAssignPopup,
    handleAssignSubmit,
    handleOpenSelectApprover,
    handleCloseSelectApprover,
    handleSendToApprover,
    handleOpenUploadPopup,
    handleCloseUploadPopup,
    handleUploadSubmit,
    handleOpenHistoryPopup,
    handleCloseHistoryPopup,
    handleComplete,
    handleCloseComplete,
    handleConfirmComplete,
    handleOpenRejectPopup,
    handleCloseRejectPopup,
    handleRejectSubmit,
    handleOpenApproverProcess,
    handleCloseApproverProcess,
    handleApproverProcessSubmit,
  };
};
